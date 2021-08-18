from flask import Flask, jsonify, request, render_template
import numpy as np
import pandas as pd
import os
# import json
# import mysql.connector
# import flask_mysqldb.MySQL as MySQL

from flask_mysqldb import MySQL
import yaml

# For model dumping
import joblib


application = Flask(__name__)

# Configure db
db = yaml.load(open(basepath +'db.yaml'))
application.config['MYSQL_HOST'] = db['mysql_host']
application.config['MYSQL_USER'] = db['mysql_user']
application.config['MYSQL_PASSWORD'] = db['mysql_password']
application.config['MYSQL_DB'] = db['mysql_db']
application.config['MYSQL_PORT'] = db['mysql_port']
mysql = MySQL(application)

basepath = "/var/flask-app/" # os.path.abspath(".")  | "./"
# basepath = "./"

@application.route('/')
def index():
    return render_template('register.html')

# 2 decorators same function
@application.route('/', methods=['GET', 'POST'])
@application.route('/<id>', methods=['GET', 'POST'])
def socCode(id='socCode'):
    
    print('The program is here.')
    print(socCode)
    if request.method == "POST":
        JD = request.form["jd"]
        print(JD)

    prediction = {}
    df_description = pd.read_csv(basepath + 'static/data/AYJ_Aug_Description.csv')
    classes = list(set(df_description['SOC']))
    df_prob = pd.DataFrame({"SOC": classes})
    df_prob.sort_values(by='SOC', ascending=True, inplace=True)
    
    def modelPredict(data):
        
        result_rf = {}
        result_nb = {}
        df_data = pd.DataFrame({"JD": [data]})

        # load, no need to initialize the loaded_rf
        print('load models')
        # loaded_model = joblib.load("./static/models/random_forest.joblib")
        # loaded_model_nb = joblib.load("./static/models/naive_baeyes.joblib")
        loaded_model = joblib.load(basepath + "static/models/naive_baeyes.joblib")

        pred = loaded_model.predict(df_data['JD'])
        y_proba = loaded_model.predict_proba(df_data['JD'])

        df_prob['RF_prob'] = y_proba[0]
        df_prob.sort_values(by='RF_prob', ascending=False, inplace=True)

        most_prob_soc = [df_prob['SOC'].iloc[0], df_prob['SOC'].iloc[1], df_prob['SOC'].iloc[2]]
        print(most_prob_soc)

        # df.drop(['column_1', 'Column_2'], axis = 1, inplace = True)
        df_prob.drop(['RF_prob'], axis=1, inplace=True)
        df_prob.sort_values(by='SOC', ascending=True, inplace=True)


        for soc in most_prob_soc:
            for i in range(0, len(df_description)):
                if (soc == df_description['SOC'].iloc[i]):
                    desc = df_description['Description'].iloc[i]
                    prediction[str(soc)] = str(soc) + ', ' + desc
                    break
            print(prediction)
        
        return prediction, most_prob_soc
        # return result_rf, result_nb

    def predictSOC(input_data):
        prediction = {}
        # Prediction to find SOC of new Data
        predict_soc, list_soc  = modelPredict(input_data)
        return list_soc, predict_soc
    
    result = ''
    list_soc, details = predictSOC(JD)
    
    result += str(details[str(list_soc[0])]) + '\n'
    result += str(details[str(list_soc[1])]) + '\n'
    result += str(details[str(list_soc[2])])
    print(result)

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO test_table1 VALUES(5, 'Dummy');")
    mysql.connection.commit()
    cur.close()
    print('Success')
    '''json_object = json.dumps(details, indent = 4)
    print(json_object)'''

    return render_template('register.html', data= result)

if __name__ == '__main__':
    application.run(debug=True)