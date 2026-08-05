from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_methods=['*'],
  allow_headers=['*']
)

class ChatRequest(BaseModel):
  message: str

def ask_gemini(prompt: str) -> str:
  response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt
  )
  return response.text

@app.post("/chat")
def chat(request: ChatRequest):
    user_message = request.message
    reply = ask_gemini(user_message)
    return { "reply": reply }