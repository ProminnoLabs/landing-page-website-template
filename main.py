import logging
import re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

logger = logging.getLogger("contact-api")

app = FastAPI(title="Contact API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://prominnolabs.github.io"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str
    message: str = Field(min_length=1, max_length=2000)

    @field_validator("name", "message")
    @classmethod
    def not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("must not be blank")
        return value.strip()

    @field_validator("email")
    @classmethod
    def valid_email(cls, value: str) -> str:
        if not EMAIL_PATTERN.match(value):
            raise ValueError("must be a valid email address")
        return value


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/contact")
def contact(request: ContactRequest) -> dict:
    # TODO: send an email, save to a database or push to your CRM here.
    logger.info("New enquiry from %s <%s>", request.name, request.email)
    return {"message": "Thanks! We will get back to you soon."}
