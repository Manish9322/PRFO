from flask import Flask, request, render_template
import mysql.connector
from mysql.connector import Error
from datetime import datetime

app = Flask(__name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Manish@123',
    'database': 'form'
}

@app.route('/', methods=['GET'])
def form():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    email = request.form['email']
    message = request.form['message']
    timestamp = datetime.now()

    try:
        conn = mysql.connector.connect(**db_config)

        if conn.is_connected():
            cursor = conn.cursor()

            sql = "INSERT INTO userdata (fname, lname, email, message, timestamp) VALUES (%s, %s, %s, %s, %s)"
            values = (first_name, last_name, email, message, timestamp)
            
            cursor.execute(sql, values)
            conn.commit()

            return 'Registration successful!'

    except Error as e:
        return f'Error: {e}'

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=False)
