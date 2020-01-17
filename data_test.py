def make_movie_dict(file):
    """Creates a dictionary of data from an IMDb movie data file. The dictionary
    consists of movie_id as key and dict of values of title and year made"""

    movie_data_file = open(file)
    movie_dict = {}

    for line in movie_data_file:
        line = line.rstrip()
        items = line.split("\t")
        title_type = items[1]
        
        if title_type == 'movie':
            movie_id = items[0]
            original_title = items[3]
            year = items[5]
            movie_specs = {}
            movie_specs['title'] = original_title
            movie_specs['year_made'] = year
            movie_dict[movie_id] = movie_specs
            # print(str(movie_id) + "= " + str(movie_specs))
    return movie_dict

def add_country_value_to_movie_dict(file, base_movie_dict):
    """Based on the original movie title from the movie_by_year dictionary
    this function adds a country origin code to the dictionary""" 

    movie_data_file = open(file)
    movie_ids = base_movie_dict.keys()

    for line in movie_data_file:
        line = line.rstrip()
        items = line.split("\t")
        movie_id = items[0]
        title = items[2]
        country_code = items[3]

        if (movie_id in movie_ids and country_code != "\\N" and
            base_movie_dict[movie_id]['title'] == title and
            base_movie_dict.get(movie_id,{}).get('country_code') == None):
            base_movie_dict[movie_id]['country_code'] = country_code

    for movie_id in list(base_movie_dict):
            # print(str(movie_id) + "= " + str(base_movie_dict[movie_id]))
        if base_movie_dict.get(movie_id, {}).get('country_code') == None:
            del base_movie_dict[movie_id]




        # if base_movie_dict.get(movie_id, {}).get('country_code') == None:
        #     del base_movie_dict[movie_id]

    return base_movie_dict

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
            movie_dict[movie_id]['avg_rating'] = avg_rating
            movie_dict[movie_id]['num_votes'] = num_votes

    return movie_dict

# def load_movies():
    # for movie, value in in movie_by_year.items():

#         specs = value[movie_id]
#         movie_object = Movie(movie_id = movie, title=specs['title'],
#                         year_made=specs['year_made'],
#                         country_code=specs['country_code'],
#                         imdb_movie_rating=specs['movie_rating'],
#                         imdb_movie_votes=specs['movie_votes'])

# print(make_movie_by_rating_dict("title.ratings.tsv"))

base_movie_dict = make_movie_dict("title.basics.tsv")
movie_dict_with_countries = add_country_value_to_movie_dict("title.akas.tsv", base_movie_dict)
movie_dict_with_all = add_rating_to_movie_dict("title.ratings.tsv", movie_dict_with_countries)
for key, value in movie_dict_with_all.items():
    print(str(key) + " -> " + str(value))


