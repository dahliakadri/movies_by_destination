"""Movies By Destination."""

from jinja2 import StrictUndefined
from flask import Flask, flash, render_template, redirect, request, session, jsonify, json
from model import User, Movie, Country, CountryFact, MoodyRating, SavedMovie, Poster, connect_to_db, db
app = Flask(__name__)
app.secret_key = "test"
app.jinja_env.undefined = StrictUndefined


@app.route('/react')
def react():
	return render_template("index.html")

@app.route("/countries.json")
def get_countries_json():
    """Return a JSON response with all countries in DB."""
    countries = Country.query.all()
    countries_list = []
    for c in countries:
    	if len(c.movies) == 0:
    		continue
    	else:
    		countries_list.append({"country_code": c.country_code,
    							"country_name": c.country_name})

    return jsonify({"countries": countries_list})


@app.route('/movies', methods=['GET'])
def show_movies_by_country_test():
	"""Show movies for a particular country user requested"""
	country_name = request.args["country"]
	country = Country.query.filter(Country.country_name == country_name).one()
	#from country can find all of the movies associated with it from country.movies
	movies_by_country_list = []
	movies=country.movies_by_num_rating
	for m in movies:
		if len(movies_by_country_list) < 100:
			movies_by_country_list.append({"movie_id": m.movie_id,
										"movie_title": m.title,
										"imdb_rating": m.imdb_rating,
										"votes": m.num_votes,
										"country_code": m.country_code})
	# if 'current_user' in session:
	# 	user_first_name = session['current_user']
	# 	flash(f'Logged in as {user_first_name}.')
	return jsonify({"movies": movies_by_country_list})

# @app.route('/reactmoviesbycountry/<country_name>.json')
# def show_movies_by_country_react(country_name):
# 	"""Show movies for a particular country user requested"""
# 	country = Country.query.filter(Country.country_name == country_name).one()
# 	#from country can find all of the movies associated with it from country.movies
# 	movies_by_country_list = []
# 	movies=country.movies
# 	for m in movies:
# 		movies_by_country_list.append({"movie_id": m.movie_id, "movie_title": m.title, "imdb_rating": m.imdb_rating, "votes": m.num_votes, "country_code": m.country_code})
# 	# if 'current_user' in session:
# 	# 	user_first_name = session['current_user']
# 	# 	flash(f'Logged in as {user_first_name}.')
# 	return jsonify({"movies": movies_by_country_list})


@app.route("/watchlistreact", methods=['POST'])
def add_movies_to_watch_list_react():
	"""Adds movies selected by the user to a watch list"""

	data = request.json
	print(data)
	#if user in session it commits the watchlist to the SavedMovies table
	#and then quiers the data base for the users up to date SavedMovies
	#would then like to render the watch list instead of the dropdown menue
	user_id_l = 1
	for movie_id_l in data['movieIds']:
		movie = SavedMovie.query.filter(SavedMovie.user_id == 1 , SavedMovie.movie_id == movie_id_l).first()
		print(movie)
		if movie == None:
			saved_movie_object = SavedMovie(movie_id = movie_id_l,
										user_id = user_id_l,)
			db.session.add(saved_movie_object)
			db.session.commit()
			print(movie_id_l, "added")
		else: 
			print(movie_id_l, "not added")
			continue
	return ("Tadaaa")



@app.route('/watchlist/user', methods=['GET'])
def show_movies_watch_list_by_user():
	user_id = request.args["userId"]
	user = User.query.filter(User.user_id == user_id).one()
	saved_movies = user.watch_list
	print(saved_movies)
	user_saved_full_movie_data_list = []
	for movie in saved_movies:
		user_saved_full_movie_data_list.append(Movie.query.filter(Movie.movie_id == movie.movie_id).one())
	user_movie_list = []
	for m in user_saved_full_movie_data_list:
		country_object = m.country 
		user_movie_list.append({"movie_id": m.movie_id,
								"movie_title": m.title,
								"imdb_rating": m.imdb_rating,
								"votes": m.num_votes,
								"country_code": m.country_code,
								"country_name": country_object.country_name})
	print(user_movie_list)
	return jsonify({"movies": user_movie_list})

@app.route("/watchlist/update", methods=['POST'])
def update_movies_to_watch_list_react():
	"""Adds movies selected by the user to a watch list"""

	data = request.json
	print("that data is", data)
	#if user in session it commits the watchlist to the SavedMovies table
	#and then quiers the data base for the users up to date SavedMovies
	#would then like to render the watch list instead of the dropdown menue
	user_id = 1
	for movie_id in data:
		saved_movie  = SavedMovie.query.filter(SavedMovie.user_id == 1 , SavedMovie.movie_id == movie_id).first()
		db.session.delete(saved_movie)
		db.session.commit()
		print("deleted")
	return ("Tadaaa")


		#once all added flashes message, movie added and redirects to main page
	# return 	# in react you return json and jsx decides what to do 
	# else:
	# 	form_movie_keys = request.form.getlist("movie_keys")
	# 	print(form_movie_keys)
	# 	user_id = session['user_id']
	# 	user_fname = session['current_user']
	# 	for movie_id in form_movie_keys:
	# 		saved_movie_object = SavedMovie(movie_id = movie_id,
	# 									user_id = user_id,)
	# 		db.session.add(saved_movie_object)
	# 		db.session.commit()
	# 	flash(f'Thanks {user_fname}, your movies were added to your watchlist')
	# #once all added flashes message, movie added and redirects to main page


@app.route("/reactsignup", methods=['Post'])
def handle_react_signup():
	"""handles the sign up for a user"""
	if 'current_user' in session:
		user_fname = session['current_user']
		flash(f'You are already logged in as {user_fname}.')
		return redirect('/')
	email = request.form.get('email')
	if User.query.filter(User.email == email).count() > 0:
		flash(f'Account with {email} already exits, use a new email')
		return redirect("/signupform")
	else:
		password = request.form.get('password')
		fname = request.form.get('fname')
		lname = request.form.get('lname')
		country_name = request.form.get('country_name_data')
		country = Country.query.filter(Country.country_name == country_name).one()
		country_code = country.country_code

		user_object = User(email=email,
						password=password,
						fname=fname,
						lname=lname,
						country_code=country_code)
		db.session.add(user_object)
		db.session.commit()
		user = User.query.filter(User.email == email).one()
		flash(f"""Thanks for signing up {user.fname}.
			You signed up at {user.time_created}, you can begin using Moody!""")
		session['current_user'] = user.fname
		session['user_id'] = user.user_id
		session['user_email'] = user.email
		return redirect('/')

@app.route('/reactlogincheck.json')
def logincheck():
	"""Homepage"""
	# if 'user_id' in session:
	# 	user_id = session['user_id']
	# 	user_first_name = session['current_user']
	# 	flash(f'Logged in as {user_first_name}.')
	# else:
	user_id = False
	user_first_name = False

	return jsonify({"user_id" : user_id, "user_fname": user_first_name})






	
@app.route('/')
def index():
	"""Homepage"""
	countries_list = Country.query.all()
	if 'user_id' in session:
		user_id = session['user_id']
		user_first_name = session['current_user']
		flash(f'Logged in as {user_first_name}.')
	else:
		user_id = None
	return render_template("homepage.html", countries=countries_list, user_id=user_id)

@app.route("/login", methods=['POST'])
def handle_login():
	"""Handles the login for a user"""
	email = request.form.get('email')
	password = request.form.get('password')
	#query for user in database basedon the email entered
	user = User.query.filter(User.email == email).one()
	if password == user.password:
		session['current_user'] = user.fname
		session['user_id'] = user.user_id
		session['user_email'] = user.email
		flash(f'Logged in with email {user.email}.')
		return redirect("/")
	else:
		flash('Wrong username or password. Try again.')
		return redirect('/')

@app.route("/logout")
def logout():
	"""Logs a user out"""
	if 'current_user' in session:
		username = session['current_user']
		email = session['user_email']
		session.pop('current_user',None)
		session.pop('user_id',None)
		session.pop('user_email', None)
		flash(f'Thanks {username}, {email} is logged out')
	else:
		flash(f"You can't log out if not logged in.")
	return redirect("/")


@app.route("/signupform")
def render_signup_form():
	"""Renders a template for the user to sign up"""
	if 'current_user' in session:
		user_fname = session['current_user']
		flash(f'You are already logged in as {user_fname}. Start searching!')
		return redirect('/')
	countries_list = Country.query.all()
	return render_template("signupform.html", countries=countries_list)


@app.route("/signup", methods=['Post'])
def handle_signup():
	"""handles the sign up for a user"""
	if 'current_user' in session:
		user_fname = session['current_user']
		flash(f'You are already logged in as {user_fname}.')
		return redirect('/')
	email = request.form.get('email')
	if User.query.filter(User.email == email).count() > 0:
		flash(f'Account with {email} already exits, use a new email')
		return redirect("/signupform")
	else:
		password = request.form.get('password')
		fname = request.form.get('fname')
		lname = request.form.get('lname')
		country_name = request.form.get('country_name_data')
		country = Country.query.filter(Country.country_name == country_name).one()
		country_code = country.country_code

		user_object = User(email=email,
						password=password,
						fname=fname,
						lname=lname,
						country_code=country_code)
		db.session.add(user_object)
		db.session.commit()
		user = User.query.filter(User.email == email).one()
		flash(f"""Thanks for signing up {user.fname}.
			You signed up at {user.time_created}, you can begin using Moody!""")
		session['current_user'] = user.fname
		session['user_id'] = user.user_id
		session['user_email'] = user.email
		return redirect('/')


@app.route('/moviesbycountry', methods=['POST'])
def show_movies_by_country():
	"""Show movies for a particular country user requested"""
	country_name = request.form.get('country_name_data')
	country = Country.query.filter(Country.country_name == country_name).one()
	#from country can find all of the movies associated with it from country.movies
	movies=country.movies
	if 'current_user' in session:
		user_first_name = session['current_user']
		flash(f'Logged in as {user_first_name}.')
	return render_template("moviesbycountry.html", movies=country.movies, country=country)


@app.route("/movie/<movie_id>")
def show_movie_details(movie_id):
	"""Shows movie details of a particular movie the user requested"""
	movie = Movie.query.filter(Movie.movie_id == movie_id).one()
	#need to do an api call for a poster of a movie
	if 'current_user' in session:
		user_first_name = session['current_user']
		flash(f'Logged in as {user_first_name}.')
	return render_template("moviedetails.html", display_movie=movie)


@app.route("/watchlist", methods=['POST'])
def add_movies_to_watch_list():
	"""Adds movies selected by the user to a watch list"""
	value = session.get('user_id',"x")
	if value == "x":
		flash(f'Please sign up to add movies to a watch list')
		#once all added flashes message, movie added and redirects to main page
		return redirect('/')
	else:
		form_movie_keys = request.form.getlist("movie_keys")
		print(form_movie_keys)
		user_id = session['user_id']
		user_fname = session['current_user']
		for movie_id in form_movie_keys:
			saved_movie_object = SavedMovie(movie_id = movie_id,
										user_id = user_id,)
			db.session.add(saved_movie_object)
			db.session.commit()
		flash(f'Thanks {user_fname}, your movies were added to your watchlist')
	#once all added flashes message, movie added and redirects to main page
	return redirect('/')


@app.route("/watchlist/<user_id>")
def view_user_watch_list(user_id):
	"""Views a users watchlist"""
	if 'current_user' in session:
		user_fname = session['current_user']
		user = User.query.filter(User.user_id == user_id).one()
		saved_movies = user.watch_list
		user_movie_list = []
		for movie in saved_movies:
			user_movie_list.append(Movie.query.filter(Movie.movie_id == movie.movie_id).one())
		return render_template("userwatchlist.html", movies=user_movie_list, user=user)
	else:
		flash(f'Log in or sign up to view a watch list.')
		redirect('/')


# @app.route("/profile/<user_id>")
# #view profile of a user
# 	return render_template(user_profile.html, user_id=user_id)

# @app.route("/profile/<user_id>", methods=['Post'])
# #updates a user profile
# 	return redirect ('/profile/<user_id>')

# @app.route("/test1")
# def testing_function():
# 	return jsonify({"name": "testing"})


if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(port=5001, host='0.0.0.0')