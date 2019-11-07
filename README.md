# Louisville Demolitions

<!-- 
* A web map displaying:
    * areal (polygon) features colored thematically (either qualitative or quantitative) using colors extracted from _cartocolors.json_.
    * an overlay of point features utilizing the Leaflet.markercluster plugin
    * an appropriate title, legend, meta data (link to source, etc.)
    * **challenge:** experiments within coordinated visualization between the mapped features and the legend or another infographic (such as a bar chart) -->

### workflow to a webmap
#### fetch data & unzip

*Points* - [Louisville Pedestrian Collisions](https://data.louisvilleky.gov/dataset/traffic-collisions/resource/715cac80-6258-4160-86cd-0d53437edc0a#{})
[direct link to csv](https://data.louisvilleky.gov/sites/default/files/KSIPedestrians2009-2018_0.csv)

*Polygons* - [Louisville Metro Council Districts](https://data.louisvilleky.gov/dataset/metro-council-districts)
[direct link to csv](https://data.louisvilleky.gov/sites/default/files/Council_Districts.zip)


```bash
$ curl -LOk https://data.louisvilleky.gov/sites/default/files/KSIPedestrians2009-2018_0.csv
$ curl -LOk https://data.louisvilleky.gov/sites/default/files/Council_Districts.zip
$ unzip Council_Districts.zip
```

### inspect the data

Point data is available in csv format, while polygon data comes as a zipped shapefile. 

```powershell
ogrinfo council_districts.shp council_districts -so
INFO: Open of `council_districts.shp'
      using driver `ESRI Shapefile' successful.

Layer name: council_districts
Geometry: Polygon
Feature Count: 26
Extent: (-85.947122, 37.996911) - (-85.404846, 38.380231)
ERROR 4: Unable to open EPSG support file gcs.csv.  Try setting the GDAL_DATA environment variable to point to the directory containing EPSG csv files.
Layer SRS WKT:
GEOGCS["GCS_WGS_1984",
    DATUM["WGS_1984",
        SPHEROID["WGS_84",6378137,298.257223563]],
    PRIMEM["Greenwich",0],
    UNIT["Degree",0.017453292519943295]]
intersect_: Integer64 (18.0)
objectid: Integer64 (18.0)
coundist: Integer64 (18.0)
coun_yr_el: Integer64 (18.0)
coun_term: Integer64 (18.0)
coun_web: String (80.0)
coun_phone: String (80.0)
coun_party: String (80.0)
coun_name: String (80.0)
coun_loc: String (80.0)
coun_fax: String (80.0)
coun_email: String (80.0)
coun_add: String (80.0)
comments: String (80.0)
shape_len: Real (24.15)
shape_area: Real (24.15)
```
From this output we can see the shapefile is projected in WGS84, which won't require conversion.  Also, we can now scope which attribute fields we may ditch.  

```bash
λ mapshaper council_districts.shp -info
[info]
=========================
Layer 1 *
-------------------------
Name:     council_districts
Type:     polygon
Records:  26
Bounds:   -85.94712226907401,37.99691132677149,-85.40484602074001,38.38023090703736
CRS:      +proj=longlat +datum=WGS84

Attribute data
------------+-------------------------------------------------------------------
 Field      | First value
------------+-------------------------------------------------------------------
 comments   | ''
 coun_add   | '601 WEST JEFFERSON ST'
 coun_email | 'jessica.green@louisvilleky.gov'
 coun_fax   | ''
 coun_loc   | 'LOUISVILLE, KY 40202'
 coun_name  | 'JESSICA GREEN'
 coun_party | 'D'
 coun_phone | '502-574-1101'
 coun_term  |         4
 coun_web   | 'http://www.louisvilleky.gov/government/metro-council-district-1'
 coun_yr_el |      2014
 coundist   |         1
 intersect_ |        17
 objectid   |         1
 shape_area | 408970892.328846
 shape_len  |    139704.361826246
------------+-------------------------------------------------------------------
```

We've got 26 polygons in this shapefile.  Let's filter fields for only the one's we want, simplify the geometry, convert to geojson, and write to the data folder.  

```bash
λ mapshaper ../project-files/council_districts/council_districts.shp -filter-fields objectid,coundist,coun_party -simplify dp 85% -o precision=.0001 format=geojson ../data/council-districts.json
[o] Wrote ..\data\council-districts.json
```

Next let's check the output json using [geojson.io](geojson.io) to quickly check a geojson. This can be sufficient for smaller data, but can be easily overloaded.  
![checking the geojson](images/geojson.io-check.png)

For the polygon data, we're done for now.  

##  csv workflow

Next we'll jump into a jupyter notebook to analyze and wrangle the csv dataset.

the csv doesn't have any fields that can be used to easily join with the polygon layer, so we'll have to add a field to the polygon layer's attribute table to capture this data.  

#### data analysis and manipulation

##### reprojection


#### conversion to geojson 


#### map design & implementation



#### technical specs

all work completed on windows 10 using [ConEmu linux emulator](), which worked solidly.  Jupyter notebooks were accessed through [an Anaconda Powershell](), requiring command line syntax.     


```bash
$ npm install -g live-server
```
```bash
$ npm install -g mapshaper
```

###### command line resources
gdal/ogr
mapshaper
npm
node

###### inline-html
d3
leaflet


<!-- 
* extract the "Vivid" color scheme from the _cartocolors.json_ file and save this as a _vividcolors.json_ file in the _data/_ directory
* convert the _austin-traffic-signals.csv_ file to a GeoJSON file named _austin-traffic-signals.json_ in the _data/_ directory, removing any unneeded data attribute fields
* use the _austin-traffic-signals.csv_ and _austin-council-districts.json_ files to create a new property within the _austin-council-districts.json_ file of the total count of traffic signals within each district and save this to a file named _district-counts.json_

We also want to simplify the _district-counts.json_ using Mapshaper to remove unnecessary node vertices and reduce the coordinate precision. -->
