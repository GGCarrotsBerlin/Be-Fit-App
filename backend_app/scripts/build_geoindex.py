from data_connector import *
from util import create_grid_of_berlin

x, y = create_grid_of_berlin()
bulk = []
# r = "750m"
r = "1km"
for xx in x:
    print(xx)
    for yy in y:
        location_data = {'location': {'lat': xx, 'lon': yy}, 'overall': compute_overall_index(xx, yy, r),
                         'health': compute_health_index(xx, yy, r), 'fitness': compute_fitness_index(xx, yy, r),
                         'outdoor': compute_outdoor_index(xx, yy, r)}
        location_data.update(compute_specific_sports_index(xx, yy, r))
        location_data.update(compute_specific_food_index(xx, yy, r))
        location_data.update(compute_specific_health_index(xx, yy, r))
        bulk.append(location_data)
import_data(bulk, "hacklikeagirl_geoindex_" + r, "place")  # TODO: replace index name
