from sqlalchemy import func
# from model import User
from model import User, Movie, Poster, Country, CountryFact, MoodyRating, SavedMovie

from model import connect_to_db, db
from server import app

from datetime import datetime

def make_movie_dict(file):
    """Creates a dictionary of data from an IMDb movie data file. The dictionary
    consists of movie_id as key and dict of values of title and year made"""

    movie_data_file = open(file)
    movie_dict = {}

    for line in movie_data_file:
        line = line.rstrip()
        items = line.split("\t")
        title_type = items[1]
        year = items[5]
        
        if title_type == 'movie' and year != "\\N" :
            movie_id = items[0]
            original_title = items[3]
            year = items[5]
            movie_specs = {}
            movie_specs['title'] = original_title
            movie_specs['year_made'] = year
            movie_dict[movie_id] = movie_specs
            # print(str(movie_id) + "= " + str(movie_specs))
    return movie_dict

def add_rating_to_movie_dict(file, movie_dict):
    """Adds a rating and number of votes to the movie_dict dictionary"""
    movie_data_file = open(file)
    movie_ids = movie_dict.keys()

    for line in movie_data_file:
        line = line.rstrip()
        items = line.split("\t")
        movie_id = items[0]
        avg_rating = items[1]
        num_votes = items[2]

        if movie_id in movie_ids:
            movie_dict[movie_id]['avg_rating'] = float(avg_rating)
            movie_dict[movie_id]['num_votes'] = int(num_votes)
    
    #once all of the countries have been added to the dict, check to see if any
    #movies don't have countries, and remove them from the dictionary
    for movie_id in list(movie_dict):
        if movie_dict.get(movie_id, {}).get('avg_rating') == None:
            del movie_dict[movie_id]

    return movie_dict

def add_country_value_to_movie_dict(file, movie_dict):
    """Based on the original movie title from the movie_by_year dictionary
    this function adds a country origin code to the dictionary""" 

    movie_data_file = open(file)
    movie_ids = movie_dict.keys()

    for line in movie_data_file:
        line = line.rstrip()
        items = line.split("\t")
        movie_id = items[0]
        title = items[2]
        country_code = items[3]
        movie_type = items[5]
        #if movie id is in base movie dict keys, and country code exits,
        #and original movie_id title matches title in this file and there is
        #no country code added already, add the country code to base_movie_dict
        if (movie_id in movie_ids and
            country_code != "\\N" and
            len(country_code) == 2 and
            movie_dict[movie_id]['title'] == title and
            movie_type == "\\N" and
            movie_dict.get(movie_id,{}).get('country_code') == None):
            movie_dict[movie_id]['country_code'] = country_code
            if movie_dict[movie_id]['country_code'] == "AN":
                movie_dict[movie_id]['country_code'] = "AM"

    #once all of the countries have been added to the dict, check to see if any
    #movies don't have countries, and remove them from the dictionary
    for movie_id in list(movie_dict):
        if movie_dict.get(movie_id, {}).get('country_code') == None:
            del movie_dict[movie_id]

    return movie_dict


def load_countries():

    Country.query.delete()

    for row in open("country_data_geo.csv"):
        row = row.rstrip()
        items = row.split(",")
        country_code = items[0]
        country_code = country_code.replace('"','')
        country_name = items[1]
        country_name = country_name.replace('"', '')
        country_lat = float(items[2])
        country_long = float(items[3])

        country = Country(country_code=country_code,
                            country_name=country_name,
                            country_lat=country_lat,
                            country_long=country_long)

        db.session.add(country)
    db.session.commit()
    print("countries loaded")

def load_movies(movie_dict):
    
    Movie.query.delete()
    print(len(movie_dict))

    i = 0
    for key, value in movie_dict.items():
        movie_object = Movie(movie_id = key,
                                title=value['title'],
                                year_made=value['year_made'],
                                country_code=value['country_code'],
                                imdb_rating=value['avg_rating'],
                                num_votes=value['num_votes'])
        db.session.add(movie_object)
        if i % 5000 == 0:
            db.session.commit()
            print(f'{i} movies loaded')
        i += 1
    db.session.commit()
    print("All movies loaded")

# movie_dict = make_movie_dict("title.basics.tsv")
# movie_dict_countries = add_country_value_to_movie_dict("title.akas.tsv", movie_dict)
# movie_dict_countries_and_ratings= add_rating_to_movie_dict("title.ratings.tsv", movie_dict_countries)
# for key, value in movie_dict_countries_and_ratings.items():
#     print(str(key) + " -> " + str(value))

if __name__ == "__main__":
    
    connect_to_db(app)

    db.create_all()
    load_countries()
    base_movie_dict = make_movie_dict("title.basics.tsv")
    movie_dict_ratings = add_rating_to_movie_dict("title.ratings.tsv", base_movie_dict)
    movie_dict_ratings_countries = add_country_value_to_movie_dict("title.akas.tsv", movie_dict_ratings)
    load_movies(movie_dict_ratings_countries)


