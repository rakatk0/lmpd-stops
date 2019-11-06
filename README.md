# lmpd-stops

<!-- 
* A web map displaying:
    * areal (polygon) features colored thematically (either qualitative or quantitative) using colors extracted from _cartocolors.json_.
    * an overlay of point features utilizing the Leaflet.markercluster plugin
    * an appropriate title, legend, meta data (link to source, etc.)
    * **challenge:** experiments within coordinated visualization between the mapped features and the legend or another infographic (such as a bar chart) -->

### workflow to a webmap
#### fetch data & unzip

*Points* - [Louisville Metro Police Department Stops 2009-present](https://data.louisvilleky.gov/dataset/lmpd-stops-data)
[direct link to csv](https://data.louisvilleky.gov/sites/default/files/LMPD_STOPS_DATA_12.csv)

*Polygons* - [Louisville Metro Council Districts](https://data.louisvilleky.gov/dataset/metro-council-districts)
[direct link to csv](https://data.louisvilleky.gov/sites/default/files/Council_Districts.zip)


```bash
$ curl -LOk https://data.louisvilleky.gov/sites/default/files/LMPD_STOPS_DATA_12.csv
$ curl -LOk https://data.louisvilleky.gov/sites/default/files/Council_Districts.zip
$ unzip Council_Districts.zip
```

### inspect the data

Point data is available in csv format, while polygon data comes as a zipped shapefile. 

```bash
$ ogrinfo council_districts.shp council_districts -so
```
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

We've got 26 districts, and quite a bit of data we can scrub out of this dataset.  First let's convert to geojson 

```bash
mapshaper cb_2016_us_county_20m.shp -filter-fields COUNTYFP,NAME,STATEFP -simplify dp 15% -o precision=.0001 format=geojson ../data/us-counties.json
```

##  csv workflow

#### data analysis and manipulation

##### reprojection

###### jupyter notebook?
<!-- switching to Windows Anaconda Powershell...  -->

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
