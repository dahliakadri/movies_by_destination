"""Models and database functions for Movies by Destination project."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
	#users from moviesbydestination

	__tablename__ = "users"

	user_id = db.Column(db.Integer,
						autoincrement=True,
						primary_key=True,
						nullable=False)
	email = db.Column(db.String(100),
						nullable=False)
	password = db.Column(db.String(100),
						nullable=False)
	fname = db.Column(db.String(100),
						nullable=False)
	lname = db.Column(db.String(100),
						nullable=False)
	time_created = db.Column(db.Integer,
						nullable=False)
	time_updated = db.Column(db.Integer,
						nullable=True)
	country_code = db.Column(db.String(2),
						db.ForeignKey('countries.country_code'),
						nullable=False,)

	#relationships
	country = db.relationship('Country')
	ratings = db.relationship('MBDRating')
	watch_list = db.relationship('SavedMovie')

	def __repr__(self):
		return f"""<User user_id={self.user_id}
                   email={self.email}
                   password={self.password}
                   firstname={self.fname}
                   lastname={self.lname}
                   timestamp created={self.time_created}
                   timestamp updated={self.time_updated}
                   country origin={self.country_code}>"""


class Movie(db.Model):
	#country id, title, rating, votes, and origin from imdb datasets

	__tablename__ = "movies"
	movie_id = db.Column(db.String(100),
						primary_key=True,
						nullable=False)
	title = db.Column(db.String(500),
						nullable=False)
	year_made = db.Column(db.String(100),
						nullable=True)
	imdb_rating = db.Column(db.Float(),
						nullable=True)
	num_votes = db.Column(db.Integer,
						nullable=True)
	country_code = db.Column(db.String(2),
						db.ForeignKey('countries.country_code'),
						nullable=False)
	#relationships
	country = db.relationship('Country')
	mbd_ratings = db.relationship('MBDRating')
	on_watched_lists = db.relationship('SavedMovie')
	poster = db.relationship('Poster')


	def __repr__(self):
		return f"""<Movie movie id={self.movie_id}
                   title={self.title}
                   year made={self.year_made}
                   imdb rating={self.imdb_rating}
                   num votes={self.num_votes}
                   country code={self.country_code}>"""


class Poster(db.Model):
	#movie posters for each particular movie from imdb
	
	tablename_ = "posters"
	poster_id = db.Column(db.Integer,
							autoincrement=True,
							primary_key=True,
							nullable=False)
	poster_url = db.Column(db.String(5000),
							nullable=False)
	movie_id = db.Column(db.String(100),
						db.ForeignKey('movies.movie_id'),
						nullable=False)

	movie = db.relationship('Movie')

	def __repr__(self):
		return f"""<Poster poster id ={self.poster_id}
                   poster url={self.poster_url}
                   movie id={self.movie_id}>"""


class Country(db.Model):
	#country and country codes by a country code dataset
	__tablename__ = "countries"

	country_code = db.Column(db.String(2),
						primary_key=True,
						nullable=False)
	name = db.Column(db.String(300),
						nullable=False)

	#relationships
	facts = db.relationship('CountryFact')
	users = db.relationship('User')
	movies = db.relationship('Movie')

	def __repr__(self):
		return f"""<Country code={self.country_code}
                   name={self.name}>"""


class CountryFact(db.Model):
	#country facts pulled from country facts API
	__tablename__ = "country_facts"

	fact_id = db.Column(db.Integer,
							primary_key=True,
							nullable=False)
	country_fact = db.Column(db.String(2000),
							nullable=False)
	country_code = db.Column(db.String(2),
							db.ForeignKey('countries.country_code'),
							nullable=False)

	#relationships
	country = db.relationship('Country')

	def __repr__(self):
		return f"""<Fact fact id={self.fact_id}
                   country fact={self.country_fact}
                   country code={self.country_code}>"""


class MBDRating(db.Model):
	#raiting that provides a rating of movies from current users of the site by user input

	__tablename__ = "mbd_ratings"

	rating_id = db.Column(db.Integer,
						autoincrement=True,
						primary_key=True,
						nullable=False)
	score = db.Column(db.Integer,
    				nullable=False)
	movie_id = db.Column(db.String(50),
						db.ForeignKey('movies.movie_id'),
						nullable=False)
	user_id = db.Column(db.Integer,
						db.ForeignKey('users.user_id'),
						nullable=False)
	
	#relationships
	movie = db.relationship('Movie')
	user = db.relationship('User')

	def __repr__(self):
		return f"""<MBD Rating rating id={self.rating_id}
                   score={self.score}
                   movie id={self.movie_id}
                   user id={self.user_id}>"""


class SavedMovie(db.Model):
#saved movie by user
	__tablename__ = "saved_movies"

	saved_id = db.Column(db.Integer,
						autoincrement=True,
						primary_key=True,
						nullable=False)
	movie_id = db.Column(db.String(50),
						db.ForeignKey('movies.movie_id'),
						nullable=False)
	user_id = db.Column(db.Integer,
						db.ForeignKey('users.user_id'),
						nullable=False)

	#relationships
	movie = db.relationship('Movie')
	user = db.relationship('User')

	def __repr__(self):
		return f"""<SavedMovie saved id={self.saved_id}
                   movie id={self.movie_id}
                   user id={self.user_id}>"""


def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configuration to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///moviesbydestination'
    app.config["SQLALCHEMY_ECHO"] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    # Can run this module interactively,to work with the database directly.
    from server import app
    connect_to_db(app)
    db.create_all()
    print("Connected to DB.")
