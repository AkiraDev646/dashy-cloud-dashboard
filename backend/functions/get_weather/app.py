import json
import os
import urllib.parse
import urllib.request

import boto3


secretsmanager = boto3.client("secretsmanager")
openweather_secret_name = os.environ.get("OPENWEATHER_SECRET_NAME")

DEFAULT_LAT = "40.7128"
DEFAULT_LON = "-74.0060"



def get_openweather_api_key():
    if not openweather_secret_name:
        raise ValueError("OPENWEATHER_SECRET_NAME is not configured")

    response = secretsmanager.get_secret_value(SecretId=openweather_secret_name)
    secret = json.loads(response["SecretString"])

    return secret["OPENWEATHER_API_KEY"]


def get_weather(lat, lon):
    api_key = get_openweather_api_key()
    query_params = urllib.parse.urlencode(
        {
            "lat": lat,
            "lon": lon,

            "appid": api_key,
            "units": "imperial",
        }
    )

    url = f"https://api.openweathermap.org/data/2.5/weather?{query_params}"

    with urllib.request.urlopen(url, timeout=5) as response:
        data = json.loads(response.read().decode("utf-8"))

    weather = data["weather"][0]
    main = data["main"]

    timezone_offset = data.get("timezone", 0)
    local_timestamp = data.get("dt", 0) + timezone_offset
    sunrise_timestamp = data["sys"]["sunrise"] + timezone_offset
    sunset_timestamp = data["sys"]["sunset"] + timezone_offset
    is_daytime = sunrise_timestamp <= local_timestamp <= sunset_timestamp

    return {
    "location": data["name"],
    "temperature": f"{round(main['temp'])}°F",
    "condition": weather["main"],
    "detail": weather["description"].capitalize(),
    "localTime": local_timestamp,
    "isDaytime": is_daytime,
    }


def lambda_handler(event, context):
    try:
        query_params = event.get("queryStringParameters") or {}
        lat = query_params.get("lat", DEFAULT_LAT)
        lon = query_params.get("lon", DEFAULT_LON)

        weather = get_weather(lat, lon)


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
