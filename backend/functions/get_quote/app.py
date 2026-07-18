import json
import os
import random

import boto3

dynamodb = boto3.resource("dynamodb")
quotes_table_name = os.environ.get("QUOTES_TABLE_NAME")

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

def get_quote_from_dynamodb():
    if not quotes_table_name:
        return None

    table = dynamodb.Table(quotes_table_name)
    response = table.scan()
    items = response.get("Items", [])

    if not items:
        return None

    return random.choice(items)

def lambda_handler(event, context):
    quote = get_quote_from_dynamodb() or random.choice(QUOTES)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(quote),
    }