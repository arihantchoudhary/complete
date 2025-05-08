# import pandas as pd
# from openai import OpenAI
# import os
# from dotenv import load_dotenv

# # Load your OpenAI API key
# load_dotenv()
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# print(os.getcwd())
# df = pd.read_csv('icp.csv')

# # print(df["Personal Linkedin URL"])
# print(df.columns)
# # response = client.responses.create(
# #     model="gpt-4.1",
# #     input="Write a one-sentence bedtime story about a unicorn."
# # )

# # print(response.output_text)


# # # Read your CSV
# # df = pd.read_csv("icp.csv")

# # # Select the first row
# # row = df.iloc[0]

# # # Build the prompt using relevant columns
# # prompt = (
# #     f"Write a personalized business email to {row['First Name']} {row['Last Name']}, "
# #     f"{row['Title']} at {row['Company']} (Industry: {row['Industry']}). "
# #     f"Company description: {row.get('SEO Description', '')}. "
# #     f"Location: {row.get('City', '')}, {row.get('State', '')}, {row.get('Country', '')}. "
# #     "City AI is a platform that helps companies manage their supply chain GRC problems. "
# #     "Include a subject line and a short, friendly body."
# # )

# # # Call the OpenAI Responses API
# # response = client.responses.create(
# #     model="gpt-4.1",
# #     input=prompt
# # )

# # # Print the output
# # print(response.output_text)


# # Read your CSV
# df = pd.read_csv("icp.csv")

# # Select the first row
# row = df.iloc[0]

# # List of real supply chain GRC problems
# grc_problems = (
#     "Here are real supply chain GRC (Governance, Risk, and Compliance) problems companies face: "
#     "1. Invoice discrepancies (e.g., mismatched shipment counts), "
#     "2. Quality disputes (e.g., failed inspections), "
#     "3. Lost shipments due to lack of live tracking, "
#     "4. Regulatory compliance issues (e.g., importing from sanctioned suppliers), "
#     "5. Missing documentation during audits, "
#     "6. Supplier bankruptcy, "
#     "7. Data breaches from logistics partners, "
#     "8. Ethical sourcing violations (e.g., child labor)."
# )

# # Build the prompt for GPT
# prompt = (
#     f"Write a cold business email to {row['First Name']} {row['Last Name']}, "
#     f"{row['Title']} at {row['Company']} (Industry: {row['Industry']}). "
#     f"Company description: {row.get('SEO Description', '')}. "
#     f"Location: {row.get('City', '')}, {row.get('State', '')}, {row.get('Country', '')}. "
#     f"{grc_problems} "
#     "First, parse the user's role/title and, based on that, mention a relevant supply chain GRC problem from the list above that someone in this role is likely to face. "
#     "Briefly describe the problem in the email, and then state how City AI can help solve it. "
#     "Add a line inviting the recipient to check out our past work at this link: https://drive.google.com/drive/folders/13RgPghTYfrhC60IbJoyjqp5d9rp_-Phd. "
#     "Include that City AI is a company working with the biggest suppliers across the world, started by ex-UC Berkeley, Microsoft, Intel, Airbus, Tesla, and Kaiser engineers. "
#     "Sign off as Aditya, COO of City AI. "
#     "The email should be very sweet, like say Hi, how are you type shit, lead with what you do first. Then say you think. a clear, specific subject line and a body that is no more than three sentences, stating exactly what is wanted from the recipient. "
#     "Avoid pleasantries, keep it direct, and do not exceed one short paragraph. Request for their time sweetly "
# )

# # Call the OpenAI Responses API
# response = client.responses.create(
#     model="gpt-4.1",
#     input=prompt
# )

# # Print the output
# print(response.output_text)


import pandas as pd
from openai import OpenAI
import os
from dotenv import load_dotenv
import time

from tqdm import tqdm

# ... (rest of your imports and setup)

# Add tqdm to pandas apply
tqdm.pandas()

# Load your OpenAI API key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Read your CSV
df = pd.read_csv("icp.csv")

# List of real supply chain GRC problems
grc_problems = (
    "Here are real supply chain GRC (Governance, Risk, and Compliance) problems companies face: "
    "1. Invoice discrepancies (e.g., mismatched shipment counts), "
    "2. Quality disputes (e.g., failed inspections), "
    "3. Lost shipments due to lack of live tracking, "
    "4. Regulatory compliance issues (e.g., importing from sanctioned suppliers), "
    "5. Missing documentation during audits, "
    "6. Supplier bankruptcy, "
    "7. Data breaches from logistics partners, "
    "8. Ethical sourcing violations (e.g., child labor)."
)

def generate_email(row):
    prompt = (
        f"Write a cold business email to {row['First Name']} {row['Last Name']}, "
        f"{row['Title']} at {row['Company']} (Industry: {row['Industry']}). "
        f"Company description: {row.get('SEO Description', '')}. "
        f"Location: {row.get('City', '')}, {row.get('State', '')}, {row.get('Country', '')}. "
        f"{grc_problems} "
        "First, parse the user's role/title and, based on that, mention a relevant supply chain GRC problem from the list above that someone in this role is likely to face. "
        "Briefly describe the problem in the email, and then state how City AI can help solve it. "
        "Add a line inviting the recipient to check out our past work at this link: https://drive.google.com/drive/folders/13RgPghTYfrhC60IbJoyjqp5d9rp_-Phd. "
        "Include that City AI is a company working with the biggest suppliers across the world, started by ex-UC Berkeley, Microsoft, Intel, Airbus, Tesla, and Kaiser engineers. "
        "Sign off as Aditya, COO of City AI. "
        "The email should be very sweet, like say Hi, how are you type shit, lead with what you do first. Then say you think. a clear, specific subject line and a body that is no more than three sentences, stating exactly what is wanted from the recipient. "
        "Avoid pleasantries, keep it direct, and do not exceed one short paragraph. Request for their time sweetly "
    )
    try:
        response = client.responses.create(
            model="gpt-4.1",
            input=prompt
        )
        text = response.output_text
        print(text)
        # Split subject and body (assuming subject is first line)
        lines = text.split('\n', 1)
        subject = lines[0].replace("Subject:", "").strip()
        body = lines[1].strip() if len(lines) > 1 else ""
        return pd.Series([subject, body])
    except Exception as e:
        print(f"Error for {row['First Name']} {row['Last Name']}: {e}")
        return pd.Series(["", ""])

# Apply to all rows (add a delay to avoid rate limits)
results = df.progress_apply(generate_email, axis=1)
df[['subject line', 'email body']] = results

# Save the updated DataFrame
df.to_csv("icp_with_emails.csv", index=False)
