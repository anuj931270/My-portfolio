from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Text
from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    problem = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    impact = Column(Text, nullable=True)
    tech_stack = Column(Text, nullable=False)
    github_link = Column(String(255), nullable=True)
    live_link = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    service_type = Column(String(100), nullable=False)
    budget_range = Column(String(100), nullable=False)
    timeline = Column(String(100), nullable=False)
    details = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ChatLog(Base):
    __tablename__ = "chat_logs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_message = Column(Text, nullable=False)
    bot_response = Column(Text, nullable=False)
    client_ip = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
