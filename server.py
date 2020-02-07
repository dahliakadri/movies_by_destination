"""Movies By Destination."""

from jinja2 import StrictUndefined

from flask import Flask, flash, render_template, redirect, request, session, jsonify
# from flask_debugtoolbar import DebugToolbarExtension

from model import User, Movie, Country, CountryFact, MoodyRating, SavedMovie, Poster, connect_to_db, db


app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = "test"

# Normally, if you use an undefined variable in Jinja2, it fails
#silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
	"""Homepage"""

	countries_list = Country.query.all()
	flash('Message Flash from index')
	return render_template("homepage.html", countries=countries_list)

@app.route('/moviesbycountry', methods=['POST'])
def show_movies_by_country():

	country_name = request.form.get('country_name_data')
	print(country_name)

	country = Country.query.filter(Country.country_name == country_name).one()

	#pulls all of the movies for that country based on relationship set up in
	#db model
	country_movies = country.movies

	#print to my server
	for movie_log in country_movies:
		print(movie_log.movie_id)
		print(movie_log.title)

	return render_template("moviesbycountry.html", movies=country_movies, country=country)


@app.route("/movie/<movie_id>")
def show_movie_details(movie_id):

	movie = Movie.query.filter(Movie.movie_id == movie_id).one()
	print(movie)
	#view movie details of a particular movie
	#need to do an api call for a poster of a movie
	return render_template("movie_details.html", display_movie=movie)


@app.route("/watchlist", methods=['POST'])
def add_movies_to_watch_list():
	
	form_movie_keys = request.form.getlist("movie_keys")
	print(form_movie_keys)
	#checks user_id from session

	#for form_movie_key in form_movie_keys:
		#gets movie id from movie_key
		#gets user_id from username
		#adds to the database table saved movies
		#commits it to the database
	
	#once all added flashes message, movie added and redirects to main page
	return f'dfdfdf'
	

# @app.route("/test1")
# def testing_function():
# 	return jsonify({"name": "testing"})
# @app.route("/watch_list/<user_id>")
# def view_watch_list_of_user(user_id)
# 	return render_template(watch_list.html, movie_id=movie_id)

# @app.route("/profile/<user_id>")
# #view profile of a user
# 	return render_template(user_profile.html, user_id=user_id)

# @app.route("/profile/<user_id>", methods=['Post'])
# #updates a user profile
# 	return redirect ('/profile/<user_id>')

# @app.route("/signin")
# #view sign in form
# 	return render_template(signin_form.html)

@app.route("/login", methods=['POST'])
def handle_login():
	username = request.form['username']
	password = request.form['password']
	#query for user in database basedon the username entered
	if password == "456":
		session['current_user'] = username
		flash(f'Logged in as {username}')
		return redirect("/")
	else:
		flash('Wrong password!')
		return redirect('/')

#sign a user into a session
# 	return render_template(signin_form.html)

# @app.route("/signup")
# #views a signup form
# 	return render_template(signup_form.html)

# @app.route("/signup", methods=['Post'])
# #adds a user into the database and logs them in
# 	return redirect ('/')

# @app.route("/logout")
# #views a logout aleart
# 	return render_template(logout_form)

# @app.route("/logout", methods=['Post'])
# #logs a user out/ends session
# 	return redirect('/')



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