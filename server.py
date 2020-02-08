"""Movies By Destination."""

from jinja2 import StrictUndefined
from flask import Flask, flash, render_template, redirect, request, session, jsonify
from model import User, Movie, Country, CountryFact, MoodyRating, SavedMovie, Poster, connect_to_db, db
app = Flask(__name__)
app.secret_key = "test"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
	"""Homepage"""

	countries_list = Country.query.all()
	flash('Message Flash from index')
	return render_template("homepage.html", countries=countries_list)


@app.route('/moviesbycountry', methods=['POST'])
def show_movies_by_country():
	"""Show movies for a particular country user requested"""
	country_name = request.form.get('country_name_data')
	country = Country.query.filter(Country.country_name == country_name).one()
	#pulls all movies for that country based on relationship set up in db model
	# country_movies = country.movies
	#need to also keep this information so I can keep track of the id for later
	#to add to watch list
	return render_template("moviesbycountry.html", movies=country.movies, country=country)


@app.route("/movie/<movie_id>")
def show_movie_details(movie_id):
	"""Shows movie details of a particular movie the user requested"""
	movie = Movie.query.filter(Movie.movie_id == movie_id).one()
	#need to do an api call for a poster of a movie
	return render_template("movie_details.html", display_movie=movie)


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
		flash(f'Welcome back {user.fname}, logged in with email {user.email}')
		return redirect("/")
	else:
		flash('Wrong password!')
		return redirect('/')


@app.route("/signupform")
def render_signup_form():
	"""Renders a template for the user to sign up"""
	countries_list = Country.query.all()
	return render_template("signupform.html", countries=countries_list)


@app.route("/signup", methods=['Post'])
def handle_signup():
	"""handles the sign up for a user"""
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
		flash(f'Thanks for signing up {user.fname}. You signed up at {user.time_created}, you can begin using Moody!')
		session['current_user'] = user.fname
		session['user_id'] = user.user_id
		return redirect('/')


@app.route("/watchlist", methods=['POST'])
def add_movies_to_watch_list():
	"""Adds movies selected by the user to a watch list"""
	value = session.get('user_id',"x")
	print(value)
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


# @app.route("/watchlist/<user_id>")
# #view watchlist of a particular user
# 	return render_template(watchlist.html, movies=movies)

# @app.route("/profile/<user_id>")
# #view profile of a user
# 	return render_template(user_profile.html, user_id=user_id)

# @app.route("/profile/<user_id>", methods=['Post'])
# #updates a user profile
# 	return redirect ('/profile/<user_id>')

# @app.route("/logout")
# #views a logout aleart
# 	return render_template(logout_form)

# @app.route("/logout", methods=['Post'])
# #logs a user out/ends session
# 	return redirect('/')

# @app.route("/test1")
# def testing_function():
# 	return jsonify({"name": "testing"})
# @app.route("/watch_list/<user_id>")
# def view_watch_list_of_user(user_id)
# 	return render_template(watch_list.html, movie_id=movie_id)



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(port=5000, host='0.0.0.0')