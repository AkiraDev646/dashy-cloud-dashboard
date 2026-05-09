import json
import random


QUOTES = [
    {
        "quote": "Success is the sum of small efforts repeated day in and day out.",
        "author": "Robert Collier",
    },
    {
        "quote": "The secret of getting ahead is getting started.",
        "author": "Mark Twain",
    },
    {
        "quote": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt",
    },
]


def lambda_handler(event, context):
    quote = random.choice(QUOTES)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(quote),
    }