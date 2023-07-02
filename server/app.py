#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify, abort
from flask_restful import Resource

# Local imports
from config import app, db, api, bcrypt
from models import User, Butterfly, Plant, Tag

class Butterflies(Resource):
    def get(self):
        butterfly_list = [b.to_dict() for b in Butterfly.query.all()]
        response = make_response(
            butterfly_list,
            200,
        )

        return response

    def post(self):
        form_json = request.get_json()
        try:
            new_butterfly = Butterfly(
                name=form_json['name'],
                image=form_json['image'],
                user_id=session['user_id']
            )
        except ValueError as e:
            abort(422,e.args[0])

        db.session.add(new_butterfly)
        db.session.commit()

        response_dict = new_butterfly.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response
api.add_resource(Butterflies, '/butterflies')

class ButterflyTag(Resource):
    def post(self, id):
        json = request.get_json()
        tag = Tag.query.filter_by(name=json['name']).first()
        if not tag:
            tag = Tag(
                name=json['name']
            )
        butterfly = Butterfly.query.filter_by(id=id).first()
        butterfly.tags.append(tag)
        db.session.commit()

        response = make_response(
            butterfly.to_dict(),
            201
        )
        return response

api.add_resource(ButterflyTag, '/butterflies/<int:id>/tag')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
