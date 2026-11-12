import sys
import os
import unittest
from datetime import datetime

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from pydantic import ValidationError
import schemas
from security import (
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)
from rate_limiter import InMemoryRateLimiter
from notifier import send_contact_notification, send_inquiry_notification
from fastapi import HTTPException


class TestPortfolioBackend(unittest.TestCase):

    def test_message_validation_success(self):
        valid_msg = schemas.MessageCreate(
            name="Alice Johnson",
            email="alice@company.com",
            message="We would like to hire you for a LangGraph project.",
        )
        self.assertEqual(valid_msg.name, "Alice Johnson")
        self.assertEqual(valid_msg.email, "alice@company.com")

    def test_message_validation_invalid_email(self):
        with self.assertRaises(ValidationError):
            schemas.MessageCreate(
                name="Alice",
                email="not-an-email",
                message="Valid length message",
            )

    def test_message_validation_short_name(self):
        with self.assertRaises(ValidationError):
            schemas.MessageCreate(
                name="A",
                email="alice@example.com",
                message="Valid length message",
            )

    def test_inquiry_validation_success(self):
        inquiry = schemas.InquiryCreate(
            name="Robert Smith",
            email="robert@techcorp.io",
            service_type="AI Agents & Automation",
            budget_range="$5,000 - $10,000",
            timeline="1 - 2 months",
            details="Looking to build an MCP server and multi-agent workflow for our support team.",
        )
        self.assertEqual(inquiry.service_type, "AI Agents & Automation")

    def test_inquiry_validation_invalid_email(self):
        with self.assertRaises(ValidationError):
            schemas.InquiryCreate(
                name="Robert",
                email="robert_at_test",
                service_type="RAG Chatbot",
                budget_range="$3,000+",
                timeline="1 month",
                details="Detailed specifications...",
            )

    def test_admin_jwt_generation_and_decode(self):
        token = create_access_token({"sub": ADMIN_USERNAME, "role": "admin"})
        self.assertIsInstance(token, str)
        self.assertTrue(len(token) > 20)

        payload = decode_access_token(token)
        self.assertEqual(payload.get("sub"), ADMIN_USERNAME)
        self.assertEqual(payload.get("role"), "admin")
        self.assertIn("exp", payload)

    def test_invalid_jwt_token(self):
        with self.assertRaises(HTTPException) as ctx:
            decode_access_token("invalid.token.payload")
        self.assertEqual(ctx.exception.status_code, 401)

    def test_password_hashing_and_verification(self):
        plain = "super_secret_password_123"
        hashed = hash_password(plain)
        self.assertTrue(hashed.startswith("pbkdf2:sha256:100000$"))
        self.assertTrue(verify_password(plain, hashed))
        self.assertFalse(verify_password("wrong_password", hashed))

    def test_admin_env_password_verification(self):
        # Verify configured admin password matches
        self.assertTrue(verify_password(ADMIN_PASSWORD, ADMIN_PASSWORD))
        self.assertFalse(verify_password("wrong_admin_pwd", ADMIN_PASSWORD))

    def test_rate_limiter_permits_within_limit(self):
        limiter = InMemoryRateLimiter(max_requests=3, window_seconds=60)

        class MockRequest:
            client = type("Client", (), {"host": "192.168.1.100"})()
            headers = {}

        req = MockRequest()
        # 3 requests should pass without exception
        limiter.check(req)
        limiter.check(req)
        limiter.check(req)

        # 4th request must trigger 429
        with self.assertRaises(HTTPException) as ctx:
            limiter.check(req)
        self.assertEqual(ctx.exception.status_code, 429)
        self.assertIn("Retry-After", ctx.exception.headers)

    def test_rate_limiter_distinct_ips(self):
        limiter = InMemoryRateLimiter(max_requests=2, window_seconds=60)

        class MockRequest1:
            client = type("Client", (), {"host": "10.0.0.1"})()
            headers = {}

        class MockRequest2:
            client = type("Client", (), {"host": "10.0.0.2"})()
            headers = {}

        req1 = MockRequest1()
        req2 = MockRequest2()

        # Both IPs get their own separate quota
        limiter.check(req1)
        limiter.check(req1)
        limiter.check(req2)
        limiter.check(req2)

        with self.assertRaises(HTTPException):
            limiter.check(req1)

    def test_notifier_dispatch_without_smtp_enabled(self):
        # Should complete silently with a warning/info log, never crash the app
        send_contact_notification(
            name="Test User",
            email="test@domain.com",
            message="Hello Anuj, testing email alerts.",
            message_id=999,
        )
        send_inquiry_notification(
            name="Client Name",
            email="client@domain.com",
            service_type="RAG Pipeline",
            budget_range="$5,000+",
            timeline="3 weeks",
            details="Building enterprise RAG application.",
            inquiry_id=888,
        )

    def test_cors_local_network_origins_allowed(self):
        import main
        from starlette.middleware.cors import CORSMiddleware

        # Locate CORSMiddleware from app.user_middleware or middleware_stack
        cors_middleware = None
        for m in main.app.user_middleware:
            if m.cls == CORSMiddleware:
                cors_middleware = m.cls(None, **m.kwargs)
                break

        self.assertIsNotNone(cors_middleware, "CORSMiddleware must be configured on FastAPI app")

        # Test local network origins
        self.assertTrue(cors_middleware.is_allowed_origin("http://192.168.1.5:5173"))
        self.assertTrue(cors_middleware.is_allowed_origin("http://10.0.0.12:5173"))
        self.assertTrue(cors_middleware.is_allowed_origin("http://172.16.0.4:3000"))
        self.assertTrue(cors_middleware.is_allowed_origin("https://myportfolio.example.com"))


if __name__ == "__main__":
    unittest.main()

