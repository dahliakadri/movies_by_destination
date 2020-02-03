"""Movies By Destination."""

from jinja2 import StrictUndefined

from flask import Flask, render_template, redirect, request, flash, session
# from flask_debugtoolbar import DebugToolbarExtension

from model import User, Movie, Country, CountryFact, MBDRating, SavedMovie, Poster, connect_to_db, db


app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
# app.secret_key = "test"

# Normally, if you use an undefined variable in Jinja2, it fails
#silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
	"""Homepage"""

	countries_list = Country.query.all()
	return render_template("homepage.html", countries=countries_list)

@app.route('/country', methods=['GET'])
def show_movies_by_country():
	country = request.args['country']
	#based on the country, i make a specific route for that country
	#look it up in my database and return movies from that country to my 
	#movies html page
	# movies = Movie.query.filter_by(country_id=country)
	# render_template(movies_from_country_list.html, movies=movies)
	return f'Country is {country}'

# @app.route("/country/<country_id>", methods=['Post'])
# #add movies to user's watch list
# 	return redirect ('/')

# @app.route("/movie_id")
# #view movie details of a particular movie
# #need to do an api call for a poster of a movie
# 	return render_template(movie_detail.html, movie_id=movie_id, poster_id=poster_id)

# @app.route("/watch_list/<user_id>")
# #view watch list of a user
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

# @app.route("/signin", methods=['Post'])
# #sign a user into a session
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