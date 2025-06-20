import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = "ACc8ad97ead8fc2fcb8b3b26c89a852987"
auth_token ="3497161596edf43575164f4b53a79444"
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_="whatsapp:+16509005017",
    body="Hello, there!",
    to="whatsapp:+15109895404",
)

print(message.body)