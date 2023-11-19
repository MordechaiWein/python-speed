#!/usr/bin/env python3

from config import db, app, bcrypt
from models import Language

if __name__ == "__main__":
    
    with app.app_context():
        print ("seeding database...")

        db.session.add_all([
            
            Language(name = 'Ruby', rating = 10),
            Language(name = 'Python', rating = 6),
            Language(name = 'JavaScript', rating = 8),
            Language(name = 'Rails', rating = 9)   
        ])

        db.session.commit()

        print ("seeding complete...")
