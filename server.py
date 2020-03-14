"""Movies By Destination."""
import random
from jinja2 import StrictUndefined
from flask import Flask, flash, render_template, redirect, request, session, jsonify, json
from model import User, Movie, Country, CountryFact, MoodyRating, SavedMovie, Poster, connect_to_db, db
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
app.secret_key = "test"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def react():
	return render_template("index.html")

@app.route("/countries_with_movies")
def get_countries_with_movies_json():
    """Return a JSON response with all countries in DB with movies."""
    countries_list = []
    for movie in Movie.query.distinct(Movie.country_code):
    	c = Country.query.filter(Country.country_code == movie.country_code).one()
    	countries_list.append({"country_code": c.country_code,
    								"country_name": c.country_name,
    								"country_lat": c.country_lat,
    								"country_lon": c.country_long})

    return jsonify({"countries": countries_list})

@app.route('/movies', methods=['GET'])
def show_movies_by_country_test():
	"""Show movies for a particular country the user requested"""
	country_name = request.args["country"]
	country = Country.query.filter(Country.country_name == country_name).one()
	#from country can find all of the movies associated with it from country.movies
	movies_by_country_list = []
	movies=country.movies_by_num_rating

	for m in movies:
		if len(movies_by_country_list) < 7:
			poster = Poster.query.filter(Poster.movie_id== m.movie_id).first()
			if poster == None:
				scrape_result = requests.get(f"https://www.imdb.com/title/{m.movie_id}/")
				src = scrape_result.content
				soup = BeautifulSoup(src, "html.parser")
				img_div = soup.find(class_="poster")
				if img_div == None:
					poster_url = "/static/img/default_poster.jpg"
					poster_object = Poster(poster_url=poster_url,
											movie_id=m.movie_id)
					db.session.add(poster_object)
					db.session.commit()
					poster = Poster.query.filter(Poster.movie_id== m.movie_id).first()
				else:
					poster_img = img_div.img.extract()
					poster_url = poster_img['src']
					poster_object = Poster(poster_url=poster_url,
											movie_id=m.movie_id)
					db.session.add(poster_object)
					db.session.commit()
					poster = Poster.query.filter(Poster.movie_id== m.movie_id).first()
			elif poster.poster_url == "https://cdn2.vectorstock.com/i/1000x1000/53/36/vintage-cinema-poster-vector-20815336.jpg":
				poster.poster_url = "/static/img/default_poster.jpg"
			movies_by_country_list.append({"movie_id": m.movie_id,
											"movie_title": m.title,
											"imdb_rating": m.imdb_rating,
											"votes": m.num_votes,
											"country_code": m.country_code,
											"movie_poster": str(poster.poster_url)})
	return jsonify({"movies": movies_by_country_list})


@app.route('/moviescarousel', methods=['GET'])
def show_movies_by_country_carousel():
	"""Show random top 6 movies from countries to display on carousel """
	movies_full = Movie.query.order_by(Movie.num_votes.desc()).limit(50).all()
	top_movies_all_countries_list = []
	movies = movies_full
	for m in movies:
			poster = Poster.query.filter(Poster.movie_id== m.movie_id).first()
			if poster == None:
				scrape_result = requests.get(f"https://www.imdb.com/title/{m.movie_id}/")
				src = scrape_result.content
				soup = BeautifulSoup(src, "html.parser")
				img_div = soup.find(class_="poster")
				poster_img = img_div.img.extract()
				poster_url = poster_img['src']
				poster_object = Poster(poster_url=poster_url,
										movie_id=m.movie_id)
				db.session.add(poster_object)
				db.session.commit()
				poster = Poster.query.filter(Poster.movie_id== m.movie_id).first()
			top_movies_all_countries_list.append({"movie_id": m.movie_id,
										"movie_title": m.title,
										"imdb_rating": m.imdb_rating,
										"votes": m.num_votes,
										"country_code": m.country_code,
										"movie_poster": str(poster.poster_url)})
	return jsonify({"movies": top_movies_all_countries_list})

#ToDo: after movies added render the watch list instead of the dropdown menu and
#return list of movies added and not added 
@app.route("/watchlistreact", methods=['POST'])
def add_movies_to_watch_list_react():
	"""Adds movies selected by the user to the saved movie table"""
	data = request.json
	if 'current_user' in session:
		user_id_session = session['user_id']
		for movie_id_l in data['movieIds']:
			movie = SavedMovie.query.filter(SavedMovie.user_id == user_id_session , SavedMovie.movie_id == movie_id_l).first()
			print(movie)
			if movie == None:
				saved_movie_object = SavedMovie(movie_id = movie_id_l,
											user_id = user_id_session,)
				db.session.add(saved_movie_object)
				db.session.commit()
				print(movie_id_l, user_id_session, "added")
			else: 
				print(movie_id_l, user_id_session, "not added")
				continue
	return ({"movie_status": "Movies added!"})

@app.route('/watchlist/user', methods=['GET'])
def show_movies_watch_list_by_user():
	"""returns a json of list of movies with details that the user has saved"""
	if 'current_user' in session:
		user_id_session = session["user_id"]
		user = User.query.filter(User.user_id == user_id_session).one()
		saved_movies = user.watch_list
		print(saved_movies)
		user_saved_full_movie_data_list = []
		for movie in saved_movies:
			user_saved_full_movie_data_list.append(Movie.query.filter(Movie.movie_id == movie.movie_id).one())
		user_movie_list = []
		for m in user_saved_full_movie_data_list:
			country_object = m.country
			poster = Poster.query.filter(Poster.movie_id== m.movie_id).first()
			user_movie_list.append({"movie_id": m.movie_id,
									"movie_title": m.title,
									"imdb_rating": m.imdb_rating,
									"votes": m.num_votes,
									"country_code": m.country_code,
									"country_name": country_object.country_name,
									"movie_poster": str(poster.poster_url)})
		print(user_movie_list)
		return jsonify({"movies": user_movie_list})
	else:
		print("no user in session")
		return jsonify({"movies": []})

@app.route("/watchlist/update", methods=['POST'])
def update_movies_to_watch_list_react():
	"""Removes movies selected by the user to be removed from their watch list
	by deleting it from the saved movie database"""
	data = request.json
	print(data)
	if 'current_user' in session:
		user_id = session["user_id"]
		for movie_id in data:
			saved_movie  = SavedMovie.query.filter(SavedMovie.user_id == user_id , SavedMovie.movie_id == movie_id).one()
			db.session.delete(saved_movie)
			db.session.commit()
			print("deleted")
		return ({"remove_status": False})
	else:
		print("no user")

@app.route("/countries")
def get_countries_json():
    """Return a JSON response with all countries in DB for users to choose their location"""
    countries = Country.query.all()
    countries_list = []
    for c in countries:
    	countries_list.append({"country_code": c.country_code,
    								"country_name": c.country_name,
    								"country_lat": c.country_lat,
    								"country_lon": c.country_long})

    return jsonify({"countries": countries_list})

@app.route("/reactsignup", methods=['POST'])
def handle_react_signup():
	"""Handles the sign up for a user"""
	data=request.json
	email = data['email']

	if User.query.filter(User.email == email).count() > 0:
		flash(f'Account with {email} already exits, use a new email')
		print("user not added")
		return jsonify({"loginstatus": False})
	else:
		password = data['password']
		fname = data['first_name']
		lname = data['last_name']
		country_name = data['country']
		country = Country.query.filter(Country.country_name == country_name).one()
		country_code = country.country_code

		user_object = User(email=email,
						password=password,
						fname=fname,
						lname=lname,
						country_code=country_code)
		db.session.add(user_object)
		db.session.commit()
		print("user added")
		user = User.query.filter(User.email == email).one()
		print(user)
		session['current_user'] = user.fname
		session['user_id'] = user.user_id
		session['user_email'] = user.email
		user_info = []
		user_info.append({"current_user": user.fname,
							"user_id": user.user_id, 
							"user_email":user.email})
	return jsonify({"sessioninfo": user_info, "loginstatus": True})

@app.route('/reactlogin', methods=['POST'])
def react_login():
	"""Handles the login of a user"""
	data = request.json
	print("this data is,", data)
	email = data['email']
	password = data['password']
	if User.query.filter(User.email == email).count() < 1:
		return jsonify({"loginstatus": False, "emailstatus": False})
	else:
		user = User.query.filter(User.email == email).one()
		if password == user.password:
			session['current_user'] = user.fname
			session['user_id'] = user.user_id
			session['user_email'] = user.email
			user_info = []
			user_info.append({"current_user": user.fname,
							"user_id": user.user_id, 
							"user_email":user.email})
			return jsonify({"sessioninfo": user_info, "loginstatus": True})
		else:
			return jsonify({"loginstatus": False, "emailstatus": True})

@app.route("/reactlogout")
def react_logout():
	"""Logs a user out"""
	if 'current_user' in session:
		username = session['current_user']
		email = session['user_email']
		session.pop('current_user',None)
		session.pop('user_id',None)
		session.pop('user_email', None)
		return ({"loginstatus": False})




#Below here are the jinja template routes#
# @app.route('/')
# def index():
# 	"""Homepage renders a list of countries for users to choose"""
# 	countries_list = Country.query.all()
# 	if 'user_id' in session:
# 		user_id = session['user_id']
# 		user_first_name = session['current_user']
# 		flash(f'Logged in as {user_first_name}.')
# 	else:
# 		user_id = None
# 	return render_template("homepage.html", countries=countries_list, user_id=user_id)

# @app.route("/signupform")
# def render_signup_form():
# 	"""Renders a template for the user to sign up"""
# 	if 'current_user' in session:
# 		user_fname = session['current_user']
# 		flash(f'You are already logged in as {user_fname}. Start searching!')
# 		return redirect('/')
# 	countries_list = Country.query.all()
# 	return render_template("signupform.html", countries=countries_list)

# @app.route("/signup", methods=['POST'])
# def handle_signup():
# 	"""handles the sign up for a user"""
# 	if 'current_user' in session:
# 		user_fname = session['current_user']
# 		flash(f'You are already logged in as {user_fname}.')
# 		return redirect('/')
# 	email = request.form.get('email')
# 	if User.query.filter(User.email == email).count() > 0:
# 		flash(f'Account with {email} already exits, use a new email')
# 		return redirect("/signupform")
# 	else:
# 		password = request.form.get('password')
# 		fname = request.form.get('fname')
# 		lname = request.form.get('lname')
# 		country_name = request.form.get('country_name_data')
# 		country = Country.query.filter(Country.country_name == country_name).one()
# 		country_code = country.country_code

# 		user_object = User(email=email,
# 						password=password,
# 						fname=fname,
# 						lname=lname,
# 						country_code=country_code)
# 		db.session.add(user_object)
# 		db.session.commit()
# 		user = User.query.filter(User.email == email).one()
# 		flash(f"""Thanks for signing up {user.fname}.
# 			You signed up at {user.time_created}, you can begin using Moody!""")
# 		session['current_user'] = user.fname
# 		session['user_id'] = user.user_id
# 		session['user_email'] = user.email
# 		return redirect('/')

# @app.route("/login", methods=['POST'])
# def handle_login():
# 	"""Handles the login for a user"""
# 	email = request.form.get('email')
# 	password = request.form.get('password')
# 	#query for user in database basedon the email entered
# 	user = User.query.filter(User.email == email).one()
# 	if password == user.password:
# 		session['current_user'] = user.fname
# 		session['user_id'] = user.user_id
# 		session['user_email'] = user.email
# 		flash(f'Logged in with email {user.email}.')
# 		return redirect("/")
# 	else:
# 		flash('Wrong username or password. Try again.')
# 		return redirect('/')

# @app.route("/logout")
# def logout():
# 	"""Logs a user out"""
# 	if 'current_user' in session:
# 		username = session['current_user']
# 		email = session['user_email']
# 		session.pop('current_user',None)
# 		session.pop('user_id',None)
# 		session.pop('user_email', None)
# 		flash(f'Thanks {username}, {email} is logged out')
# 	else:
# 		flash(f"You can't log out if not logged in.")
# 	return redirect("/")

# @app.route('/moviesbycountry', methods=['POST'])
# def show_movies_by_country():
# 	"""Show movies for a particular country user requested"""
# 	country_name = request.form.get('country_name_data')
# 	country = Country.query.filter(Country.country_name == country_name).one()
# 	#from country can find all of the movies associated with it from country.movies
# 	movies=country.movies
# 	if 'current_user' in session:
# 		user_first_name = session['current_user']
# 		flash(f'Logged in as {user_first_name}.')
# 	return render_template("moviesbycountry.html", movies=country.movies, country=country)

# @app.route("/movie/<movie_id>")
# def show_movie_details(movie_id):
# 	"""Shows movie details of a particular movie the user requested"""
# 	movie = Movie.query.filter(Movie.movie_id == movie_id).one()
# 	#need to do an api call for a poster of a movie
# 	if 'current_user' in session:
# 		user_first_name = session['current_user']
# 		flash(f'Logged in as {user_first_name}.')
# 	return render_template("moviedetails.html", display_movie=movie)

# @app.route("/watchlist", methods=['POST'])
# def add_movies_to_watch_list():
# 	"""Adds movies selected by the user to a watch list"""
# 	value = session.get('user_id',"x")
# 	if value == "x":
# 		flash(f'Please sign up to add movies to a watch list')
# 		#once all added flashes message, movie added and redirects to main page
# 		return redirect('/')
# 	else:
# 		form_movie_keys = request.form.getlist("movie_keys")
# 		print(form_movie_keys)
# 		user_id = session['user_id']
# 		user_fname = session['current_user']
# 		for movie_id in form_movie_keys:
# 			saved_movie_object = SavedMovie(movie_id = movie_id,
# 										user_id = user_id,)
# 			db.session.add(saved_movie_object)
# 			db.session.commit()
# 		flash(f'Thanks {user_fname}, your movies were added to your watchlist')
# 	#once all added flashes message, movie added and redirects to main page
# 	return redirect('/')

# @app.route("/watchlist/<user_id>")
# def view_user_watch_list(user_id):
# 	"""Views a users watchlist"""
# 	if 'current_user' in session:
# 		user_fname = session['current_user']
# 		user = User.query.filter(User.user_id == user_id).one()
# 		saved_movies = user.watch_list
# 		user_movie_list = []
# 		for movie in saved_movies:
# 			user_movie_list.append(Movie.query.filter(Movie.movie_id == movie.movie_id).one())
# 		return render_template("userwatchlist.html", movies=user_movie_list, user=user)
# 	else:
# 		flash(f'Log in or sign up to view a watch list.')
# 		redirect('/')

if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = False
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)
    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')