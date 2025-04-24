from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        user_input = request.form['user_input']
        return f'You entered: {user_input}'
    return '''
        <form method="POST">
            <label for="user_input">Enter something:</label>
            <input type="text" name="user_input" id="user_input">
            <input type="submit" value="Submit">
        </form>
    '''

if __name__ == '__main__':
    app.run(debug=True) 