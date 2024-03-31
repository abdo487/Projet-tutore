import os
import requests
import random
import json

# Function to fetch image links from DuckDuckGo
def get_imag_link():
    url = "https://random.imagecdn.app/150/150"
    req = requests.get(url)
    
    dir_name = 'assets/pharmacy_images/'
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
        
    # generate random name
    random_name = str(random.randint(0, 1000000))

    with open(dir_name + random_name + '.png', 'wb') as f:
        f.write(req.content)
    return dir_name + random_name + '.png'

# Function to update the image field of each marker with a random image link
def update_marker_images(geojson):
    for feature in geojson['features']:
        name = feature['properties']['name']
        
        feature['properties']['image'] = get_imag_link()

# Read GeoJSON data from file with explicit encoding specification
with open('rabat_pharmacies.geojson', 'r', encoding='utf-8') as f:
    geojson_data = json.load(f)

# Update marker images
update_marker_images(geojson_data)

# Write updated GeoJSON data back to file
with open('rabat_pharmacies_updated.geojson', 'w', encoding='utf-8') as f:
    json.dump(geojson_data, f, ensure_ascii=False)

print("GeoJSON file updated successfully.")
