### Instructions for Setting Up and Running the Website

**Directory Structure:**
1. **Project Folder**
    - Create two folders: `static` and `templates`.
    - Inside `static`, create subfolders: `css`, `js`, `img`, `pdfs`.
    - Place each appropriate file in its respective folder.
    - Place the HTML file inside the `templates` folder (Flask checks the `templates` folder for HTML files).
    - The Python file (`connect.py`) should be directly inside the project folder (alongside `static` and `templates`).

**Code Implementation:**

1. **Create Normal HTML, CSS, and JavaScript Files**
    - Write your code in the respective files.

2. **Database Connectivity Using Python and Flask**
    - Use Flask to set up a localhost (port: 5000).

3. **Steps for Executing the Contact Form and Storing Data in the Database:**
    - Create a `.py` file.
    - Import all necessary packages.
    - Create a variable named `app` to store the Flask instance.
    - Write your database configurations (host, user, password, database).
    - Create a route with the method `GET`.
    - Create another route with the method `POST`.
    - Create variables for storing data in the database.
    - Ensure `debug=False` at the end of the `.py` file (`app.run(debug=False)`).

4. **Setting the Form Action Property:**
    - Provide the path as `/submit` in the form's `action` property (perform `POST` on the `/submit` route in the `.py` file).

5. **Preventing the Website from Redirecting to the .py File:**
    ```html
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            $('#contactForm').on('submit', function (event) {
                event.preventDefault(); // Prevent the default form submission

                $.ajax({
                    type: 'POST',
                    url: '/submit', // URL that takes input
                    data: $(this).serialize(), // Serialize the form data
                    success: function () {
                        // Optionally, you can reset the form if needed
                        $('#contactForm')[0].reset();
                    },
                    error: function () {
                        // Handle error
                    }
                });
            });
        });
    </script>
    ```

6. **Ensuring Correct Paths for Images and PDFs:**
    - For images: 
      ```html
      <img src="{{ url_for('static', filename='img/Converter.png') }}" alt="">
      ```
    - For PDFs: 
      ```html
      <a href="{{ url_for('static', filename='pdfs/Resume.pdf') }}">Download Resume</a>
      ```

7. **Running the Website:**
    - Open the terminal (use Git Bash).
    - Run the command `python file_name.py`.
    - The website will run on port 5000.
    - Fill up the form and click on submit.
    - If the form resets automatically, it means your data is successfully submitted to the database.
    - Check your database for new entries or the terminal for a message saying `/submit POST 200`.

### Example Flask Code (`connect.py`):
```python
from flask import Flask, request, render_template
import mysql.connector

app = Flask(__name__)

# Database configuration
db_config = {
    'host': 'your_host',
    'user': 'your_user',
    'password': 'your_password',
    'database': 'your_database'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form
    name = data['name']
    email = data['email']
    message = data['message']

    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    query = "INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)"
    cursor.execute(query, (name, email, message))
    connection.commit()
    cursor.close()
    connection.close()
    return '', 200

if __name__ == '__main__':
    app.run(debug=False)
