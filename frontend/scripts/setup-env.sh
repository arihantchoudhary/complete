#!/bin/bash

# Get the parent directory's .env file
PARENT_ENV="../.env"

# Check if the parent .env file exists
if [ -f "$PARENT_ENV" ]; then
  # Extract the OpenAI API key
  OPENAI_API_KEY=$(grep OPENAI_API_KEY "$PARENT_ENV" | cut -d '=' -f2)
  
  # Create or update .env.local
  echo "OPENAI_API_KEY=$OPENAI_API_KEY" > .env.local
  echo "Environment variables have been set up successfully."
else
  echo "Error: Parent .env file not found at $PARENT_ENV"
  exit 1
fi 