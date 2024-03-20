import json
from geopy.distance import geodesic

# Coordinates of Rabat
rabat_coordinates = (34.020882, -6.841650)

# Load GeoJSON data
with open('data.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define a function to filter features by proximity to Rabat
def filter_by_proximity(features, reference_coordinates, radius_km):
    rabat_pharmacies = []
    for feature in features:
        pharmacy_coordinates = (
            feature['geometry']['coordinates'][1],  # Latitude
            feature['geometry']['coordinates'][0]   # Longitude
        )
        distance = geodesic(reference_coordinates, pharmacy_coordinates).kilometers
        if distance <= radius_km:
            rabat_pharmacies.append(feature)
    return rabat_pharmacies

# Filter pharmacies in Rabat within a radius of 10 kilometers (adjust as needed)
radius_km = 10
rabat_pharmacies = filter_by_proximity(data['features'], rabat_coordinates, radius_km)

# Create a new GeoJSON object with only Rabat pharmacies
rabat_geojson = {
    "type": "FeatureCollection",
    "features": rabat_pharmacies
}

# Save filtered GeoJSON to a new file
with open('rabat_pharmacies.geojson', 'w', encoding='utf-8') as f:
    json.dump(rabat_geojson, f, ensure_ascii=False)
