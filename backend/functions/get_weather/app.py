import json
import os
import urllib.parse
import urllib.request

import boto3


secretsmanager = boto3.client("secretsmanager")
openweather_secret_name = os.environ.get("OPENWEATHER_SECRET_NAME")

NEW_YORK_LAT = "40.7128"
NEW_YORK_LON = "-74.0060"


def get_openweather_api_key():
    if not openweather_secret_name:
        raise ValueError("OPENWEATHER_SECRET_NAME is not configured")

    response = secretsmanager.get_secret_value(SecretId=openweather_secret_name)
    secret = json.loads(response["SecretString"])

    return secret["OPENWEATHER_API_KEY"]


def get_weather():
    api_key = get_openweather_api_key()

    query_params = urllib.parse.urlencode(
        {
            "lat": NEW_YORK_LAT,
            "lon": NEW_YORK_LON,
            "appid": api_key,
            "units": "imperial",
        }
    )

    url = f"https://api.openweathermap.org/data/2.5/weather?{query_params}"

    with urllib.request.urlopen(url, timeout=5) as response:
        data = json.loads(response.read().decode("utf-8"))

    weather = data["weather"][0]
    main = data["main"]

    return {
        "location": data["name"],
        "temperature": f"{round(main['temp'])}°F",
        "condition": weather["main"],
        "detail": weather["description"].capitalize(),
    }


def lambda_handler(event, context):
    try:
        weather = get_weather()

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps(weather),
        }
    except Exception as error:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps(
                {
                    "message": "Weather request failed",
                    "error": str(error),
                }
            ),
        }
