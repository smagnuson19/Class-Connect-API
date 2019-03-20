[![Build Status](https://travis-ci.com/dartmouth-cs52-18S/classconnect-api.svg?token=oPyFmwLvTzTq5eE3F4cy&branch=master)](https://travis-ci.com/dartmouth-cs52-18S/classconnect-api)
# Class Connect

TA webapp for linking friends when selecting classes for an upcoming term. Users can search classes to see friends thinking about taking certain classes. The webapp displays information about each course and a description so it becomes easier to plan out ones schedule. A user can also see how many other people are planning on taking a course to predict their likelyhood of getting into a certain class.

Live Demo: https://classconnect-cs52.surge.sh/

![Alt Text](https://thumbs.gfycat.com/WeeklyVacantDungbeetle-size_restricted.gif)

## Getting Started

Running our API is easy!
1. Fork our repo
2. Clone your fork
3. Run `yarn` to install dependencies
4. Run `yarn dev` to start the dev server
5. The dev server is at `localhost:9090`
6. Access mongoDB [here](https://docs.mongodb.com/manual/installation/).
7. In new terminal shell, run `mongod`, and in another shell: `mongo classconnect`
8. You're up and running!

## Setup Webscraper
The webscrapper uses python 2.7, BeautifulSoup, Pandas, and Numpy. All of these can easily be installed through pip or Anaconda. I reccomened setting up an enviorment in anaconda with python 2.7. Install all of the packages and then run `python course.py`. This will give you a list of all the fall classes, but the term variable in courses.py can be easily changed to another term. 

## Info

* node with babel
* expressjs
* airbnb eslint rules
* Mongoose
* dot env
* Morgan
* Passport-jwt

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)


## Authors

Cole Corrente
Scott Magnuson
Jakob Stern
Bobby Crawford
Peter Warren
