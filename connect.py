from flask import Flask, request, render_template
import requests

app = Flask(__name__)

T_Token = "7214212711:AAGHQK5ooVa6O-7toPt1XBg4m3MLYZflpHM"
T_Chat_ID = 1489787744

def smvt(first_name,last_name, email, message):
    text = f"Portfolio Contact form : \n\n First name: {first_name} \n Last name : {last_name} \n Email: {email} \n\n Message: {message}"
    url = f"https://api.telegram.org/bot{T_Token}/sendMessage"
    payload = {
        'chat_id': T_Chat_ID,
        'text': text
    }
    requests.post(url, data=payload)

@app.route('/', methods=['GET'])
def form():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    email = request.form['email']
    message = request.form['message']

    try:
        smvt(first_name, last_name, email, message)
        return 'Registration successful!'

    except ImportError as e:
        return f'Error: {e}'

if __name__ == '__main__':
    app.run(debug=False)
