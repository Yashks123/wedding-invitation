from flask import Flask, render_template

app = Flask(__name__)


# ============================================================
# WEDDING DETAILS
# ============================================================

WEDDING = {
    "bride": "Yashwanth KS",
    "groom": "Thejaswini S",

    "date": "06 September 2026",
    "date_iso": "2026-09-30T09:30:00",

    "venue": "Grand Wedding Hall",
    "location": "Bengaluru, Karnataka",

    "address": "Wedding Hall Address, Bengaluru, Karnataka",

    "welcome_message": (
        "With hearts full of love and happiness, "
        "we invite you to celebrate our special day with us."
    ),

    "story": (
        "Two hearts, two families and one beautiful journey. "
        "We are excited to begin this new chapter together "
        "and would be honored to have you with us."
    ),

    "map_url": "https://maps.app.goo.gl/vbECqUR4dPfENbQ1A?g_st=aw",

    "events": [
        {
            "name": "Engagement",
            "date": "25 September 2027",
            "time": "06:00 PM",
            "description": "An evening filled with love, laughter and blessings."
        },
        {
            "name": "Wedding Ceremony",
            "date": "30 September 2027",
            "time": "09:30 AM",
            "description": "Join us as we begin our forever together."
        },
        {
            "name": "Reception",
            "date": "01 October 2027",
            "time": "07:00 PM",
            "description": "Dinner, celebrations and memories with our loved ones."
        }
    ]
}


@app.route("/")
def home():
    return render_template(
        "index.html",
        wedding=WEDDING
    )



# if __name__ == "__main__":
#     app.run(
#         host="0.0.0.0",
#         port=5000,
#         debug=True
#     )

if __name__ == "__main__":
    app.run()