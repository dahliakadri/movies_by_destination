movie_data_file = open("title.akas.tsv")

duplicate_movie_title_ids= []

for line in movie_data_file:
    line = line.rstrip()
    data_pieces = line.split("\t")

    title_id = data_pieces[0]
    title = data_pieces[2]
    country_code = data_pieces [3]

    duplicate_movie_title_ids.append(title_id)
    
movie_title_ids = set(duplicate_movie_title_ids)
for movie_id in movie_title_ids:
    print(movie_id)