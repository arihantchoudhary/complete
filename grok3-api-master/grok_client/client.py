import requests
import json

class GrokClient:
    def __init__(self, cookies):
        """
        Initialize the Grok client with cookie values

        Args:
            cookies (dict): Dictionary containing cookie values
                - x-anonuserid
                - x-challenge
                - x-signature
                - sso
                - sso-rw
        """
        self.base_url = "https://grok.com/rest/app-chat/conversations/new"
        self.cookies = cookies
        self.headers = {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "content-type": "application/json",
            "origin": "https://grok.com",
            "priority": "u=1, i",
            "referer": "https://grok.com/",
            "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        }

    def _prepare_payload(self, message):
        """Prepare the default payload with the user's message"""
        return {
            "temporary": False,
            "modelName": "grok-3",
            "message": message,
            "fileAttachments": [],
            "imageAttachments": [],
            "disableSearch": False,
            "enableImageGeneration": True,
            "returnImageBytes": False,
            "returnRawGrokInXaiRequest": False,
            "enableImageStreaming": True,
            "imageGenerationCount": 2,
            "forceConcise": False,
            "toolOverrides": {},
            "enableSideBySide": True,
            "isPreset": False,
            "sendFinalMetadata": True,
            "customInstructions": "",
            "deepsearchPreset": "",
            "isReasoning": False
        }

    def send_message(self, message):
        """
        Send a message to Grok and collect the streaming response

        Args:
            message (str): The user's input message

        Returns:
            str: The complete response from Grok
        """
        payload = self._prepare_payload(message)
        try:
            response = requests.post(
                self.base_url,
                headers=self.headers,
                cookies=self.cookies,
                json=payload,
                stream=True
            )
            print(f"Response status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return ""

        full_response = ""

        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                try:
                    json_data = json.loads(decoded_line)
                    result = json_data.get("result", {})
                    response_data = result.get("response", {})

                    if "modelResponse" in response_data:
                        return response_data["modelResponse"]["message"]

                    token = response_data.get("token", "")
                    if token:
                        full_response += token

                except json.JSONDecodeError:
                    continue

        print(f"Full response: {full_response}")
        return full_response.strip()

if __name__ == "__main__":
    # Your cookie values
    cookies = {
        "x-anonuserid": "b853818a-ce1e-4771-8c2a-f19d39e474b7",
        "x-challenge": "BAOQG0v88NGdwudth9b7N+wWdL51t7zYMvsLAXC6WYuDsiBA6iCjctuOGY7iRyAKe4TZUb5wnMUmtxssVUhnD3P5o9NU4lBbcOmKeEwVErAaq5kuejRyqgz8XltXmPOm4/wTzGXWFoF6P/1cMFpg9HYIKE914PnyhwrUy8bawfU32xgu1Rw=",
        "x-signature": "yvD3Cp9+o0+wI/Sku/DWrhqHIrWXINdyyK5minChlFwYQywK4723Rh/1gRpEZzrQsmA8mcZoZgeFXDMnMlJ6fQ==",
        "sso": "eyJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uX2lkIjoiNGMwNTE4OWItN2QyNC00N2E3LTg5MmEtZDUxYzlmMDBhYTg0In0.0JCS-hYwZTVB_URYJzmWmPsAccs2WhtYaWkk-mqvCCw",
        "sso-rw": "eyJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uX2lkIjoiNGMwNTE4OWItN2QyNC00N2E3LTg5MmEtZDUxYzlmMDBhYTg0In0.0JCS-hYwZTVB_URYJzmWmPsAccs2WhtYaWkk-mqvCCw"
    }

    # Initialize the client
    client = GrokClient(cookies)

    # Send a message and get response
    response = client.send_message("write a poem")
    print(response)
