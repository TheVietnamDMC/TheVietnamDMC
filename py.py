from flask import Flask, request, jsonify
from flask_cors import CORS

import gspread
from google.oauth2.service_account import Credentials

app = Flask(__name__)
CORS(app)

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets"
]

creds = Credentials.from_service_account_file(
    "credentials.json",
    scopes=SCOPES
)

client = gspread.authorize(creds)

sheet = client.open("TheVietnamDMC Enquiries").worksheet("Enquiries")


@app.route("/quote", methods=["POST"])
def quote():

    data = request.json

    sheet.append_row([
        data.get("agentName"),
        data.get("companyName"),
        data.get("email"),
        data.get("phone"),
        data.get("pax"),
        data.get("hotelCategory"),
        data.get("requirements")
    ])

    return jsonify({
        "success":True,
        "message":"Quote received."
    })


if __name__=="__main__":
    app.run(debug=True)