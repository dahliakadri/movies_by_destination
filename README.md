# Moody - Movies by Destination
Moody is a full stack web application that enables users to search and save top rated movies by country.
Access the live webapp: [Moody Movies](http://moodymovies.sadraii.com)
- ![Moody Movies](https://i.imgur.com/22oOUEL.gif)
+ <img src="/art/sample.gif?raw=true" width="200px">

## Contents

 - [Technologies](#technologies)
 - [Installation](#installation)
 - [Features](#features)
 - [Features for V2.0](#FeaturesforV2.0)
 - [About the Developer](#AbouttheDeveloper)
```
```

### Technologies

| Backend | Frontend   |
| ------------- |:-------------:|
| Python 3.x    | Javascript 6 |
| PostgreSQL 10.1  | React 16.2    |  
| Flask 1.1.1 | HTML5  |  
| Flask-SQLAlchemy 2.4.1| CSS3 | 
| Jinja2 2.10.3 | Twitter Bootsrap|
| Soup Sieve 2.0| AJAX |
| Beautiful Soup 4 | jQuery 3.4.1 |
| SQLAlchemy 1.3.10  | Babel 6.26  |
| |  |

|APIs| |
|--|--|
| IMDB Datasets | 
Google Maps Javascript |

### Installation
#### Prerequisites
You must have the following installed to run Moody Movies
 - PostgreSQL
 - Python 3.x
 - API key for Google Maps JavaScript
 #### Run Moody Movies on your local computer
Download IMDB Movie Data Sets:
> This application utilizes data from IMDB data sets of over 10 million
> lines of data. The data was parsed with a python algorithm to seed
> 180,000 movies into a PostgreSQL database.
- [Explanation of Data Sets](https://www.imdb.com/interfaces/)
- [**title.akas.tsv.gz**](https://datasets.imdbws.com/title.akas.tsv.gz%5C)
- [**title.basics.tsv.gz**](https://datasets.imdbws.com/title.basics.tsv.gz)
- [**title.ratings.tsv.gz**](https://datasets.imdbws.com/title.ratings.tsv.gz)

 Clone or fork repository:

    $ git clone https://github.com/dahliakadri/movies_by_destination.git
    
Create and activate a virtual environment inside your Moody Movies directory:
```
$ virtualenv env
$ source env/bin/activate
```

Install dependencies:
```
$ pip install -r requirements.txt
```

Set your Google API restriction to your local IP address only and then add your Google Map API key into the moodMap.jsx file

    GoogleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YourAPIKey&libraries=places`

Create database 'moody':
   ```
$ createdb moody
```

Run seed.py in the terminal which will run model.py, create the database tables and see the database with IMDB datasets:
   ```
$ python3 movie_data_seed.py
```

Run the app from the command line.

```
$ python server.py
```


### Features
Access the live webapp: [Moody Movies](http://moodymovies.sadraii.com)

### Features for V2.0
Future iterations of this project will include:
 - Movies about particular countries, built by a text analysis tool, specifically Google’s Natural Language Machine Learning API to pattern match through movie summaries
 - Ratings by users
 - Sharing movie recommendations
 - Where to watch particular movies

### About the Developer
Moody Movies creator Dahlia Kadri is a Technical Program Manager and Executive Assistant in security engineering at Box turned software engineer. This is her first fullstack project. She can be found on [LinkedIn](https://www.linkedin.com/in/dahliakadri/) and on [Github](https://github.com/dahliakadri).