from app import app, db, Note, User

# Use app.app_context() to create the database and tables within the application context
with app.app_context():
    # Create the database and tables
    db.create_all()