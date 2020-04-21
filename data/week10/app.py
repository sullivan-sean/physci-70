from flask import Flask, request, g
import json
from werkzeug.exceptions import BadRequest
import sqlite3

app = Flask(__name__)

DATABASE = 'force_data.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def add_rows(rows):
    db = get_db()
    c = db.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS forces (
                uuid string(32) PRIMARY KEY,
                time integer NOT NULL,
                force float NOT NULL,
        );
    """)

    for row in rows:
        c.execute("INSERT INTO forces(uuid, time, force) VALUES(?, ?, ?)", row)

    c.commit()
    c.close()


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/data', methods=["POST"])
def data_route():
    try:
        data = request.get_json()
        print(data)
        forces = data['forces']
        start = data['start']
        uuid = data['uuid']
    except Exception:
        return "Error parsing data"
    rows = [(uuid, start + 10 * i, force) for i, force in enumerate(forces)]
    try:
        add_rows(rows)
    except Exception:
        return "Error adding data to db"
    return "Success"


@app.route('/get_data/<uuid>', methods=["GET"])
def get_data_route(uuid):
    c = get_db().cursor()
    data = c.execute("SELECT force FROM forces WHERE uuid = (?) ORDER BY time DESC", uuid).fetchall()
    return str(data)
