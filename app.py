from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
import os

app = Flask(__name__)


# ============================================================
# WEDDING CONFIGURATION
# ============================================================

WEDDING = {

    # --------------------------------------------------------
    # COUPLE
    # --------------------------------------------------------

    "bride": "Yash",
    "groom": "Radhika",

    "initials": "YR",

    "tagline": "Two hearts, one beautiful journey, forever begins here.",

    "intro": (
        "With the blessings of our families and the love of our dear ones, "
        "we invite you to be a part of our beautiful celebration."
    ),


    # --------------------------------------------------------
    # RECEPTION
    # --------------------------------------------------------

    "reception": {

        "date": "September 29, 2026",

        "date_iso": "2026-09-29T19:00:00",

        "day": "Tuesday",

        "time": "07:00 PM",

        "title": "Reception",

        "description": (
            "Join us for an evening of happiness, laughter, "
            "delicious food and beautiful memories."
        )
    },


    # --------------------------------------------------------
    # MUHURTHAM
    # --------------------------------------------------------

    "muhurtham": {

        "date": "September 30, 2026",

        "date_iso": "2026-09-30T09:30:00",

        "day": "Wednesday",

        "time": "09:30 AM",

        "title": "Muhurtham",

        "description": (
            "Be with us as we begin our new journey together "
            "with the blessings of our family and loved ones."
        )
    },


    # --------------------------------------------------------
    # VENUE
    # --------------------------------------------------------

    "venue": {

        "name": "Wedding Venue",

        "address": "Complete Venue Address, Bengaluru, Karnataka",

        "map_url": "https://maps.google.com/"
    },


    # --------------------------------------------------------
    # RSVP
    # --------------------------------------------------------

    "rsvp_enabled": True
}


# ============================================================
# RSVP FILE
# ============================================================

RSVP_FILE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "rsvp_data.json"
)


def load_rsvps():

    if not os.path.exists(RSVP_FILE):
        return []

    try:

        with open(
            RSVP_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except Exception:

        return []


def save_rsvps(data):

    with open(
        RSVP_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            data,
            file,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# HOME
# ============================================================

@app.route("/")
def home():

    return render_template(
        "index.html",
        wedding=WEDDING
    )


# ============================================================
# RSVP
# ============================================================

@app.route(
    "/rsvp",
    methods=["POST"]
)
def rsvp():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No RSVP information received."
            }), 400


        name = data.get(
            "name",
            ""
        ).strip()


        phone = data.get(
            "phone",
            ""
        ).strip()


        attendance = data.get(
            "attendance",
            ""
        ).strip()


        guests = data.get(
            "guests",
            "1"
        )


        reason = data.get(
            "reason",
            ""
        ).strip()


        message = data.get(
            "message",
            ""
        ).strip()


        if not name:

            return jsonify({
                "success": False,
                "message": "Please enter your name."
            }), 400


        if attendance not in [
            "yes",
            "no",
            "maybe"
        ]:

            return jsonify({
                "success": False,
                "message": "Please select your attendance."
            }), 400


        # ----------------------------------------------------
        # Save RSVP
        # ----------------------------------------------------

        rsvps = load_rsvps()


        new_rsvp = {

            "name": name,

            "phone": phone,

            "attendance": attendance,

            "guests": guests,

            "reason": reason,

            "message": message,

            "submitted_at": datetime.now().isoformat(
                timespec="seconds"
            )
        }


        rsvps.append(new_rsvp)

        save_rsvps(rsvps)


        return jsonify({

            "success": True,

            "message":
                "Thank you! Your response has been received. ❤️"
        })


    except Exception as error:

        print("RSVP ERROR:", error)

        return jsonify({

            "success": False,

            "message":
                "Something went wrong. Please try again."

        }), 500


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )