from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
import os


# ============================================================
# FLASK APPLICATION
# ============================================================

app = Flask(__name__)


# ============================================================
# WEDDING CONFIGURATION
# ============================================================

WEDDING = {

    # ========================================================
    # COUPLE
    # ========================================================

    "bride": "Radhika",

    "groom": "Yash",

    "initials": "RY",

    "tagline":
        "Two hearts, one beautiful journey, forever begins here.",

    "intro":
        "With the blessings of our families and the love of our dear ones, "
        "we invite you to be a part of our beautiful celebration.",


    # ========================================================
    # RECEPTION
    # ========================================================

    "reception": {

        "date": "September 29, 2026",

        "date_iso": "2026-09-29T19:00:00",

        "day": "Tuesday",

        "time": "07:00 PM",

        "title": "Reception",

        "description":
            "Join us for an evening filled with happiness, laughter, "
            "delicious food and beautiful memories."

    },


    # ========================================================
    # MUHURTHAM
    # ========================================================

    "muhurtham": {

        "date": "September 30, 2026",

        "date_iso": "2026-09-30T09:30:00",

        "day": "Wednesday",

        "time": "09:30 AM",

        "title": "Muhurtham",

        "description":
            "Be with us as we begin our new journey together "
            "with the blessings of our family and loved ones."

    },


    # ========================================================
    # VENUE
    # ========================================================

    "venue": {

        "name": "Wedding Venue",

        "address":
            "Complete Venue Address, Bengaluru, Karnataka",

        "map_url":
            "https://maps.google.com/"

    }

}


# ============================================================
# RSVP FILE
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)


RSVP_FILE = os.path.join(
    BASE_DIR,
    "rsvp_data.json"
)


# ============================================================
# CREATE RSVP FILE IF IT DOES NOT EXIST
# ============================================================

if not os.path.exists(RSVP_FILE):

    with open(
        RSVP_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            [],
            file,
            indent=4
        )


# ============================================================
# LOAD RSVP DATA
# ============================================================

def load_rsvps():

    try:

        with open(
            RSVP_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)


        if isinstance(data, list):

            return data


        return []


    except Exception as error:

        print(
            "ERROR READING RSVP FILE:",
            error
        )

        return []


# ============================================================
# SAVE RSVP DATA
# ============================================================

def save_rsvps(data):

    temp_file = RSVP_FILE + ".tmp"


    with open(
        temp_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )


    os.replace(
        temp_file,
        RSVP_FILE
    )


# ============================================================
# HOME PAGE
# ============================================================

@app.route("/")
def home():

    return render_template(
        "index.html",
        wedding=WEDDING
    )


# ============================================================
# SAVE RSVP
# ============================================================

@app.route(
    "/rsvp",
    methods=["POST"]
)
def submit_rsvp():

    print()
    print("=" * 70)
    print("                    NEW RSVP RECEIVED")
    print("=" * 70)


    try:

        data = request.get_json(
            silent=True
        )


        if not data:

            print(
                "ERROR: No RSVP data received."
            )

            return jsonify({

                "success": False,

                "message":
                    "No RSVP information received."

            }), 400


        # ====================================================
        # READ DATA
        # ====================================================

        name = str(
            data.get(
                "name",
                ""
            )
        ).strip()


        phone = str(
            data.get(
                "phone",
                ""
            )
        ).strip()


        reception = str(
            data.get(
                "reception",
                ""
            )
        ).strip()


        muhurtham = str(
            data.get(
                "muhurtham",
                ""
            )
        ).strip()


        guests = str(
            data.get(
                "guests",
                "1"
            )
        ).strip()


        dietary = str(
            data.get(
                "dietary",
                ""
            )
        ).strip()


        reason = str(
            data.get(
                "reason",
                ""
            )
        ).strip()


        message = str(
            data.get(
                "message",
                ""
            )
        ).strip()


        # ====================================================
        # VALIDATION
        # ====================================================

        if not name:

            return jsonify({

                "success": False,

                "message":
                    "Please enter your name."

            }), 400


        if reception not in [
            "yes",
            "no",
            "maybe"
        ]:

            return jsonify({

                "success": False,

                "message":
                    "Please select your Reception attendance."

            }), 400


        if muhurtham not in [
            "yes",
            "no",
            "maybe"
        ]:

            return jsonify({

                "success": False,

                "message":
                    "Please select your Muhurtham attendance."

            }), 400


        # ====================================================
        # CREATE RSVP RECORD
        # ====================================================

        rsvps = load_rsvps()


        new_id = len(rsvps) + 1


        new_rsvp = {

            "id": new_id,

            "name": name,

            "phone": phone,

            "reception": reception,

            "muhurtham": muhurtham,

            "guests": guests,

            "dietary": dietary,

            "reason": reason,

            "message": message,

            "submitted_at":
                datetime.now().strftime(
                    "%Y-%m-%d %H:%M:%S"
                )

        }


        # ====================================================
        # SAVE
        # ====================================================

        rsvps.append(
            new_rsvp
        )


        save_rsvps(
            rsvps
        )


        # ====================================================
        # PRINT TO TERMINAL
        # ====================================================

        print()

        print(
            "RSVP SAVED SUCCESSFULLY"
        )

        print()

        print(
            "Name       :",
            name
        )

        print(
            "Phone      :",
            phone
        )

        print(
            "Reception  :",
            reception
        )

        print(
            "Muhurtham  :",
            muhurtham
        )

        print(
            "Guests     :",
            guests
        )

        print(
            "Dietary    :",
            dietary
        )

        print(
            "Reason     :",
            reason
        )

        print(
            "Message    :",
            message
        )

        print()

        print(
            "Saved File :",
            RSVP_FILE
        )

        print()

        print(
            "=" * 70
        )


        return jsonify({

            "success": True,

            "message":
                "Thank you! Your response has been received. ❤️"

        })


    except Exception as error:

        print()

        print(
            "RSVP ERROR:"
        )

        print(
            str(error)
        )

        print()

        return jsonify({

            "success": False,

            "message":
                "Unable to save your response."

        }), 500


# ============================================================
# VIEW RSVPs
# ============================================================

@app.route("/rsvps")
def view_rsvps():

    rsvps = load_rsvps()


    return render_template(
        "rsvps.html",
        rsvps=rsvps
    )


# ============================================================
# RUN APPLICATION
# ============================================================

if __name__ == "__main__":

    print()
    print("=" * 70)
    print("              WEDDING INVITATION WEBSITE")
    print("=" * 70)

    print()

    print(
        "RSVP FILE:"
    )

    print(
        RSVP_FILE
    )

    print()

    print(
        "Website:"
    )

    print(
        "http://127.0.0.1:5000"
    )

    print()

    print(
        "RSVP Dashboard:"
    )

    print(
        "http://127.0.0.1:5000/rsvps"
    )

    print()

    print(
        "=" * 70
    )


    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )