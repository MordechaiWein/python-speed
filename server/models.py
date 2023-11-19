from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Language(db.Model, SerializerMixin):
    __tablename__ = 'languages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    rating = db.Column(db.Integer)

    def __repr__(self):
        return f"Language| id: {self.id}, name: {self.name}, rating: {self.rating}"





