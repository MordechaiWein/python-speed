#!/usr/bin/env python3

# Standard library imports

# Remote library imports


from flask import request, make_response, session, jsonify, abort, render_template
from flask_restful import Resource
from werkzeug.exceptions import NotFound
import ipdb

# Local imports
from config import app, db, api, bcrypt
from models import Language

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

class Speech(Resource):
    
    def get(self):
        languages = [lang.to_dict() for lang in Language.query.all()]
        return languages, 200

api.add_resource(Speech, '/speech', endpoint='speech')


if __name__ == "__main__":
    app.run(port=8000, debug=True)
