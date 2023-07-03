#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import db, app, bcrypt
from models import  User, Plant, Butterfly, Tag

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

User.query.delete()
Plant.query.delete()
Butterfly.query.delete()
Tag.query.delete()
        
users = []
butterflies = []
plants = []
tags = []

u1 = User(username=fake.name(), email=fake.email())
u1.password_hash = bcrypt.generate_password_hash('password1').decode('utf-8')

users.append(u1)

u2 = User(username=fake.name(), email=fake.email())
u2.password_hash = bcrypt.generate_password_hash('password1').decode('utf-8')

users.append(u2)

u3 = User(username=fake.name(), email=fake.email())
u3.password_hash = bcrypt.generate_password_hash('password1').decode('utf-8')

users.append(u3)

db.session.add_all(users)
db.session.commit()

t1 = Tag(name="beautiful")
tags.append(t1)

t2 = Tag(name="colorful")
tags.append(t2)

t3 = Tag(name="rare")
tags.append(t3)

t4 = Tag(name="exotic")
tags.append(t4)

db.session.add_all(tags)
db.session.commit()

b1 = Butterfly(name='Monarch', image='https://wallpaperaccess.com/full/527446.jpg', user_id=rc(users).id)
butterflies.append(b1)

b2 = Butterfly(name='Blue Morpho', image='https://cdn.pixabay.com/photo/2013/06/30/18/56/butterfly-142506_1280.jpg', user_id=rc(users).id)
butterflies.append(b2)

b3 = Butterfly(name='Glasswing', image='https://cdn.pixabay.com/photo/2021/04/28/17/53/glasswing-butterfly-6214689_1280.jpg', user_id=rc(users).id)
butterflies.append(b3)

b4 = Butterfly(name='Saint Francis satyr', image='https://alchetron.com/cdn/saint-francis-satyr-4d941ecc-4836-47b5-bab2-b2e60a03362-resize-750.jpeg', user_id=rc(users).id)
butterflies.append(b4)

b5 = Butterfly(name='New Guinea Birdwing', image='https://miro.medium.com/v2/resize:fit:768/1*gZ0XvVXzEWSGeMLuRyspEw.jpeg', user_id=rc(users).id)
butterflies.append(b5)

db.session.add_all(butterflies)
db.session.commit()