from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # You can pass data dynamically to template
    portfolio_data = {
        'name': 'Harshit Pawar',
        'introduction': 'I am a Data Analyst with experience in Python, SQL, and Data Visualization.',
        'skills': ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel'],
        'projects': [
            {'name': 'IPL Analysis', 'description': 'Analysis of IPL matches data.'},
            {'name': 'Restaurant Data Analysis', 'description': 'Insights on restaurant data for business growth.'}
        ],
        'contact': {
            'email': 'harshitpawar0103@gmail.com',
            'phone': '+91 6263264146',
            'linkedin': 'https://linkedin.com/in/harshitpawar'
        }
    }
    return render_template('index.html', data=portfolio_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

