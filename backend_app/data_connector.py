from elasticsearch import Elasticsearch
import itertools
from util import flatten_list

SPORTS_KEYS = ["yoga", "crossfit", "tanzen", "klettern", "schwimmen", "kampfsport"]
SPORTS_VALUES = ["yoga pilates", "crossfit", "tanzschule", "klettern bouldern", "hallenbad freibad freibadschwimmhalle",
                 "kampfsport"]
SPORTS = {k: v for k, v in zip(SPORTS_KEYS, SPORTS_VALUES)}
FOOD_KEYS = ["vegetarisch", "vegan", "paleo", "alles"]
FOOD_VALUES = ["vegetarian vegetarisches vegetarische vegan", "vegan", "paleo", "restaurant"]
FOOD = {k: v for k, v in zip(FOOD_KEYS, FOOD_VALUES)}  # TODO: change paleo
MEDICINE_KEYS = ["skin", "orthopedy", "homeopathy"]
MEDICINE_VALUES = ["hautarzt hautärztin hautexperten hautarztpraxis geschlechtskrankheiten",
                   "orthopädie orthopädisch",
                   "heilpraktikerin heilpraktiker homöopathie homöopathisch homöopathin Homöopath heilpraxis"]
MEDICINE = {k: v for k, v in zip(MEDICINE_KEYS, MEDICINE_VALUES)}

POI_INDEX = "hacklikeagirl_places"
GEOINDEX_INDEX = "hacklikeagirl_geoindex_1km"  # TODO: make sure this is correct
PREFERENCES_INDEX = "hacklikeagirl_preference"  # TODO: make sure this is correct
es = Elasticsearch(timeout=200)


def import_data(data, index, dtype, step=1000):
    data_to_import = zip([{"create": {"_index": index, "_type": dtype, "_id": i}} for i in range(len(data))], data)
    data_to_import = list(flatten_list(map(list, data_to_import)))
    count = 0
    while count < len(data_to_import):
        es.bulk(body=data_to_import[count:count + step], refresh=True)
        count += step
    print('Loaded {} records to elasticsearch'.format(len(data)))


def build_filtered_query(lat, lon, radius, values, keys=("name", "keyword", "types"), size=1000,
                         minimum_should_match=1):
    query = {
        "size": size,
        "query": {
            "multi_match": {
                "query": values,
                "fields": list(keys),
                "minimum_should_match": minimum_should_match
            }
        },
        "filter": {
            "bool": {
                "must": [
                    {"geo_distance": {
                        "distance": radius,
                        "geometry.location": {
                            "lat": lat,
                            "lon": lon
                        }
                    }
                    }
                ]
            }
        }
    }
    return query


def fetch_count_of_pois(query, index=POI_INDEX):
    response = es.search(index=index, body=query)
    return response["hits"]["total"]


# index computations

def compute_overall_index(lat, lon, radius="750m"):
    q = {
        "size": 10000,
        "query": {
            "match_all": {}},
        "filter": {
            "geo_distance": {
                "distance": radius,
                "geometry.location": {
                    "lat": lat,
                    "lon": lon
                }
            }
        }
    }
    return fetch_count_of_pois(q)


def compute_health_index(lat, lon, radius="750m"):
    q = {
        "size": 1000,
        "query": {
            "constant_score": {
                "filter": {
                    "terms": {
                        "types": ["doctor", "pharmacy"]
                    }
                }
            }
        },
        "filter": {
            "geo_distance": {
                "distance": radius,
                "geometry.location": {
                    "lat": lat,
                    "lon": lon
                }

            }
        }
    }
    return fetch_count_of_pois(q)


def compute_fitness_index(lat, lon, radius="750m"):
    q = build_filtered_query(lat, lon, radius, "gym")
    return fetch_count_of_pois(q)


def compute_outdoor_index(lat, lon, radius="750m"):
    q = build_filtered_query(lat, lon, radius, "park", ("keyword",))
    return fetch_count_of_pois(q)


def compute_specific_sports_index(lat, lon, radius="750m"):
    sports_map = {}
    for s, v in SPORTS.items():
        q = build_filtered_query(lat, lon, radius, v, ("name", "keyword"))
        sports_map[s] = fetch_count_of_pois(q)
    return sports_map


def compute_specific_food_index(lat, lon, radius="750m"):
    food_map = {}
    for f, v in FOOD.items():
        q = build_filtered_query(lat, lon, radius, v, ("name", "keyword"))
        food_map[f] = fetch_count_of_pois(q)
    return food_map


def compute_specific_health_index(lat, lon, radius="750m"):
    medicine_map = {}
    for m, v in MEDICINE.items():
        q = build_filtered_query(lat, lon, radius, v, ("name", "keyword"))
        medicine_map[m] = fetch_count_of_pois(q)
    return medicine_map


def parse_preferences(preferences, keys=True):
    if keys:
        return [int(preferences[0]), SPORTS_KEYS[int(preferences[1])], FOOD_KEYS[int(preferences[2])],
                MEDICINE_KEYS[int(preferences[3])]]
    else:
        return [int(preferences[0]), SPORTS_VALUES[int(preferences[1])], FOOD_VALUES[int(preferences[2])],
                MEDICINE_VALUES[int(preferences[3])]]


def find_best_locations(preferences, n_locations=3):
    pref_keys = {k: v for k, v in zip(["outdoor", "sports", "food", "medicine"], parse_preferences(preferences))}
    print(pref_keys)
    response = es.search(index=GEOINDEX_INDEX, size=15)
    response = response["hits"]["hits"]
    results = []
    for r in response:
        total_index = sum([r["_source"][pref_keys[k]] for k in ("sports", "food", "medicine")])
        print("total index", total_index)
        results.append(
            {"location": {"lat": r["_source"]["location"]["lat"], "lon": r["_source"]["location"]["lon"]},
             "score": total_index, "pref_id": build_preference_key(preferences)})
        results.sort(key=lambda x: x["score"], reverse=True)
    return results[:n_locations]


def build_preference_key(preferences):
    return "".join(preferences)


def compute_all_possible_preferences():
    l0 = ["0", "1", "2"]
    l1 = [str(i) for i in range(len(SPORTS_KEYS))]
    l2 = [str(i) for i in range(len(FOOD_KEYS))]
    l3 = [str(i) for i in range(len(MEDICINE_KEYS))]
    return list(itertools.product(l0, l1, l2, l3))


def fetch_recommended_locations(preferences, index=PREFERENCES_INDEX):
    pref_id = build_preference_key(preferences)
    loc_query = {
        "query": {
            "match": {
                "pref_id": str(pref_id)
            }
        }
    }
    response = es.search(index=index, body=loc_query, _source_include=["location"])
    response = response["hits"]["hits"]
    locations = [h["_source"]["location"] for h in response]
    parsed_preferences = parse_preferences(preferences, keys=False)
    results = []
    for l in locations:
        poi_query = build_filtered_query(l["lat"], l["lon"], "1500m", " ".join(parsed_preferences[1:]))
        response = es.search(index=POI_INDEX, body=poi_query, _source_include=["geometry", "name", "keyword", "rating"])
        results.extend(response["hits"]["hits"])
        if parsed_preferences[0] > 0:
            park_query = build_filtered_query(l["lat"], l["lon"], "1km", "park", size=parsed_preferences[0] * 2)
            park_response = es.search(index=POI_INDEX, body=park_query,
                                      _source_include=["geometry", "name", "keyword", "rating"])
            results.extend(park_response["hits"]["hits"])
    results = [r["_source"] for r in results]
    results = deduplicate(results)
    results.sort(key=lambda x: x.get("rating", 0), reverse=True)
    return {
        "type": "FeatureCollection",
        "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
        "features": [
            {"type": "Feature", "properties": {"NAME": r["name"], "LINE": r["keyword"], "SCORE": r.get("rating", 0)},
             "geometry": {"type": "Point",
                          "coordinates": [r["geometry"]["location"]["lon"], r["geometry"]["location"]["lat"]]}}
            for r in results]}


def deduplicate(d):
    d_out = []
    seen_name = set([])
    for r in d:
        if r['name'] in seen_name:
            continue
        d_out.append(r)
        seen_name.add(r['name'])
    return d_out


if __name__ == '__main__':
    #print(fetch_recommended_locations(["2", "3", "3", "0"]))
    print(fetch_recommended_locations(["2", "0", "0", "2"]))
