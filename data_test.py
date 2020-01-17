def make_movie_by_title_dict(files):

    movie_data_file = open(files)

    movie_by_title= {}

    for line in movie_data_file:
        line = line.rstrip()
        items = line.split("\t")
        title_id = items[0]
        title = items[2]
        country_code = items[3]
        value = []
        value.append(title)
        value.append(country_code)

        if movie_by_title.get(title_id) == None:
            movie_by_title[title_id] = value
    return movie_by_title

make_movie_by_title_dict("title.akas.tsv")



