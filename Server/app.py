from crypt import methods
from flask import Flask, request,jsonify, make_response, abort, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, text
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt_identity
from functools import wraps
from PIL import Image
from datetime import timedelta
import pickle

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../Client/build',
    template_folder='../Client/build'
    )
model = pickle.load(open('model.pkl', 'rb'))

app.config['CORS_HEADERS'] = 'Content-Type'
#storing databse in this folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ToProGamer@localhost:5432/master'
jwt = JWTManager(app)
db = SQLAlchemy(app)


#Vitamins
class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key = True)
    vitamin = db.Column(db.String(100))
    data = db.Column(db.String(1000))
    description = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone = True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(150), unique = True)
    name = db.Column(db.String(150))
    password = db.Column(db.String(150))
    refreshToken = db.Column(db.ARRAY(db.String), nullable=True)
    notes = db.relationship('Note', backref='user', cascade='all, delete-orphan', lazy='dynamic')

def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    # Other headers can be added here if needed
    return response

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/dashboard", methods = ['GET'])
@jwt_required()
def dashboard():
    current_user_id = get_jwt_identity()
    print(current_user_id)
    return jsonify({'message': 'POST request received successfully'})

@app.route("/api/eval", methods = ['POST', 'GET'])
def eval():

    #the different types of vitamins
    heart_description = "The heart is the hardest working muscle of the body. It continually contracts and relaxes (beating over 100,000 times every day), delivering life-giving blood to every organ, gland, cell, and structure of the body. ReGenerZyme Heart supports and restores the heart as well as other muscles of the body. It is excellent nutrition for athletes and others who want to optimize heart and muscle function."
    immune_description = "Immune-Rmor (immune armor) is immune system support and restoration formula that nourishes the spleen, lymph, pituitary, and thymus glands. A healthy immune system is able to distinguish between a healthy cell and tissue and unwanted invaders. It is our body’s armor against unwanted bacteria, viruses, parasites, fungi, etc."
    gastro_description = "Gastro-Digest II is a two-stage formula designed to support digestion. The first stage assists the stomach where acid is used to break down proteins. The second stage of the formula is enteric coated, which protects the ingredients from the stomach acid. They remain intact to be utilized by the gallbladder, liver, pancreas and intestine where the major part of digestion and nutrient assimilation occurs."
    kalmz_description = "Kalmz provides nutritional support for the body that needs to release physical pain and emotional stress. It also calms the toxic chaos that may overwhelm the body by denaturing (neutralizing) toxins from food, emotions, and/or the environment."
    adrenal_description = "When stress is high and hormones are low the adrenals come to the rescue. ReGenerZyme Adrenal provides nutritional resources so the adrenals can rest, restore and function optimally. The 7-Keto DHEA in the formula supports both the thyroid and adrenals."
    thyroid_description = "The thyroid is involved in producing hormones necessary for a stable emotional state, optimal metabolism, and normal body function. ReGenerZyme Thyroid was formulated to support the body with nutrients used to hydrate, balance, and restore the energy of the thyroid so it can function optimally."

    response =  jsonify({'message': 'POST request received successfully'})

    refreshToken = request.cookies.get('jwt').strip() if 'jwt' in request.cookies else None
    if not refreshToken:
        return jsonify({'message': 'No JWT cookie found'}), 204 
    
    user = User.query.filter(User.refreshToken.any(refreshToken)).first()

    if not user:
        return jsonify({'message': 'User not found'}), 204
    if request.method == 'POST':

        #for evaluating again
        notes = user.notes.all()
        # Delete all fetched vitamins
        for note in notes:
            db.session.delete(note)
        # Commit the transaction
        db.session.commit()

        data = request.get_json()
        print(data)
        prediction = model.predict(data)
        print(prediction)

        #Heart
        if prediction[0][0] == 3:
            new_vitamin = Note(vitamin = "ReGenerZyme Heart", data = "you need 3 capsules before bed and 3 in the morning", description = heart_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()
        elif prediction[0][0] == 2:
            new_vitamin = Note(vitamin = "ReGenerZyme Heart", data = "you need 3 capsules before bed and 1 in the morning", description = heart_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()
        elif prediction[0][0] == 1:
            new_vitamin = Note(vitamin = "ReGenerZyme Heart", data = "you need 2 capsules before bed", description = heart_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        #Immune
        if prediction[0][1] == 3:
            new_vitamin = Note(vitamin = "Immune-Rmor", data = "you need 3 capsule before bed and 3 in the morning",description = immune_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][1] == 2:
            new_vitamin = Note(vitamin = "Immune-Rmor", data = "you need 2 capsule before bed and 2 in the morning",description = immune_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][1] == 1:
            new_vitamin = Note(vitamin = "Immune-Rmor", data = "you need 1 capsule before bed and 1 in the morning",description = immune_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        #Gastro
        if prediction[0][2] == 3:
            new_vitamin = Note(vitamin = "Gastro-Digest II", data = "you need 3 capsule before bed and 3 in the morning",description = gastro_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][2] == 2:
            new_vitamin = Note(vitamin = "Gastro-Digest II", data = "you need 2 capsule before bed and 2 in the morning",description = gastro_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][2] == 1:
            new_vitamin = Note(vitamin = "Gastro-Digest II", data = "you need 1 capsule before bed and 1 in the morning",description = gastro_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        #Kalmz
        if prediction[0][3] == 3:
            new_vitamin = Note(vitamin = "Kalmz", data = "you need 3 capsule before bed and 2 in the morning",description = kalmz_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][3] == 2:
            new_vitamin = Note(vitamin = "Kalmz", data = "you need 3 capsule before bed",description = kalmz_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][3] == 1:
            new_vitamin = Note(vitamin = "Kalmz", data = "you need 2 capsule before bed",description = kalmz_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()
        
        #Thryroid
        if prediction[0][4] == 3:
            new_vitamin = Note(vitamin = "ReGenerZyme Thyroid", data = "you need 3 capsule before bed",description = thyroid_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][4] == 2:
            new_vitamin = Note(vitamin = "ReGenerZyme Thyroid", data = "you need 2 capsule before bed",description = thyroid_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

        elif prediction[0][4] == 1:
            new_vitamin = Note(vitamin = "ReGenerZyme Thyroid", data = "you need 1 capsule before bed",description = thyroid_description, user_id = user.id)
            db.session.add(new_vitamin)
            db.session.commit()

    return response

@app.route("/api/results")
def results():

    refreshToken = request.cookies.get('jwt').strip() if 'jwt' in request.cookies else None
    if not refreshToken:
        return jsonify({'message': 'No JWT cookie found'}), 204 
    
    user = User.query.filter(User.refreshToken.any(refreshToken)).first()
    if not user:
        return jsonify({'message': 'User not found'}), 204
    
    new_vitamin = Note.query.filter_by(user_id = user.id).all()
    serialized_data = [{'id': note.id, 'vitamin': note.vitamin, 'data':note.data, 'description':note.description} for note in new_vitamin]
    
    return jsonify({'vitamins': serialized_data})

#creating our login page
@app.route("/login", methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        userName = data['user']
        password = data['pwd']

        #getting emails from database by query to see if any match users input
            #if any do match store in user object
        user = User.query.filter_by(email=userName).first() #gets the first email it matches

        if user:
            if password == user.password:
                #creating JWT token
                accessToken = create_access_token(identity=user.id, expires_delta=timedelta(seconds=10))

                newRefreshToken = create_refresh_token(identity=user.id, expires_delta=timedelta(hours=24))
                if user.refreshToken is None:
                    user.refreshToken = []
                sql_query = text(
                    """
                    UPDATE "user"
                    SET "refreshToken" = array_append("refreshToken", :token)
                    WHERE id = :user_id
                    """
                )

                db.session.execute(sql_query, {"token": newRefreshToken, "user_id": user.id})
                db.session.commit()

                response = make_response(jsonify({'accessToken':accessToken}))

                    # Setting a cookie
                response.set_cookie('jwt', newRefreshToken, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60)
                return response
            #if hashed passwords don't match then
            else:
                abort(409, description="Incorrect password")
        #if there is no email to the one the user inputted then
        else: 
            abort(409, description="Username does not exist")

    return jsonify({'message': 'POST request received successfully'})


@app.after_request
def after_request_func(response):

    origin = request.headers.get('Origin')
    
    if request.method == 'OPTIONS':
        response = make_response()
        #response.headers.add("Access-Control-Allow-Origin", "*")
        
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, x-csrf-token, Authorization, Origin, Accept')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')

    if origin:
        response.headers['Access-Control-Allow-Origin'] = origin

    return response

#creating register page
@app.route("/api/register", methods = ['GET', 'POST', "OPTIONS"])
def register():
    
    data = request.get_json()
    response =  jsonify({'message': 'POST request received successfully'})
    
    
    
    if request.method == 'POST':
        #getting the forms
        userName = data['user']
        name = "Joe"
        password1 = data['pwd']

        #checking to see if email already exist by comparing it to all emails in database
        user = User.query.filter_by(email=userName).first()

        #if inputted an already exisisting email in database
        if user:
            abort(409, description="Username already exists")
        else:
            #if user definately not exist then put them in database
                #if an account email doesn't have the same email then make database
            if db.session.query(User).filter_by(email=userName).count() < 1:
                
                new_user = User(email=userName, name=name, password=password1)
                db.session.add(new_user)
                db.session.commit()

    
    return response


@app.route('/refresh', methods=['GET'])
def refresh():
    #getting the newRefreshToken
    refreshToken = request.cookies.get('jwt').strip() if 'jwt' in request.cookies else None
    
    user = User.query.filter(User.refreshToken.any(refreshToken)).first()
    
    if user:

        accessToken = create_access_token(identity=user.id, expires_delta=timedelta(seconds=10))

        newRefreshToken = create_refresh_token(identity=user.id, expires_delta=timedelta(hours=24))
        if user.refreshToken is None:
            user.refreshToken = []

        sql_query = text(
            """
            UPDATE "user"
            SET "refreshToken" = array_append("refreshToken", :token)
            WHERE id = :user_id
            """
        )

        db.session.execute(sql_query, {"token": newRefreshToken, "user_id": user.id})
        
        db.session.commit()
        response = make_response(jsonify({'accessToken':accessToken}))

            # Setting a cookie
        response.set_cookie('jwt', newRefreshToken, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60)
        return response
    else:
        return jsonify({'error': 'error'})
    
@app.route("/logout", methods=["GET"])
#can only access logout if logged in

def logout():
    refreshToken = request.cookies.get('jwt').strip() if 'jwt' in request.cookies else None
    if not refreshToken:
        return jsonify({'message': 'No JWT cookie found'}), 204 
    
    user = User.query.filter(User.refreshToken.any(refreshToken)).first()
    if not user:
        return jsonify({'message': 'User not found'}), 204
    
    user.refreshToken = []
    db.session.commit()

    response = jsonify({'message': 'Logged out successfully'})
    response.delete_cookie('jwt', secure=True, httponly=True, samesite='None')
    return response, 204
        

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.config['SECRET_KEY'] = 'super_secret_key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'  # or another supported method
    app.config['SECURITY_PASSWORD_SALT'] = 'abc'
    app.run(debug=True, port = 9000)