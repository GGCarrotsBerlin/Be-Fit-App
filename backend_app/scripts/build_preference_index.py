from data_connector import *

all_preferences = compute_all_possible_preferences()
results = []
for p in all_preferences:
    results.extend(find_best_locations(p))
import_data(results, "hacklikeagirl_preference", "place")

