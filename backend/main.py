from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_methods=['*'],
  allow_headers=['*']
)

class ChatRequest(BaseModel):
  message: str

@app.post("/chat")
def chat(request: ChatRequest):
    return {
      "reply" : "Backend is connected! congratulations!"
    }