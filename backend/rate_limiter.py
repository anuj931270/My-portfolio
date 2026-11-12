import time
from collections import defaultdict, deque
from typing import Callable
from fastapi import HTTPException, Request, status


class InMemoryRateLimiter:
    """
    Thread-safe, in-memory sliding-window rate limiter by client IP address.
    """

    def __init__(self, max_requests: int = 5, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.clients = defaultdict(deque)

    def _get_client_ip(self, request: Request) -> str:
        """
        Extracts client IP, respecting X-Forwarded-For if behind a reverse proxy.
        """
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        if request.client and request.client.host:
            return request.client.host
        return "unknown_client"

    def check(self, request: Request):
        """
        Checks whether the client IP has exceeded the allowed rate limit.
        Raises HTTPException(429) if exceeded.
        """
        client_ip = self._get_client_ip(request)
        now = time.time()
        queue = self.clients[client_ip]

        # Purge timestamps outside the current sliding window
        while queue and queue[0] <= now - self.window_seconds:
            queue.popleft()

        if len(queue) >= self.max_requests:
            retry_after = int(self.window_seconds - (now - queue[0])) + 1
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded. Maximum {self.max_requests} requests per {self.window_seconds}s. Please retry in {retry_after}s.",
                headers={"Retry-After": str(retry_after)},
            )

        queue.append(now)


# Standard Rate Limiter instances for production routes
contact_limiter = InMemoryRateLimiter(max_requests=5, window_seconds=60)
inquiry_limiter = InMemoryRateLimiter(max_requests=5, window_seconds=60)
auth_limiter = InMemoryRateLimiter(max_requests=6, window_seconds=60)


def rate_limit(limiter: InMemoryRateLimiter) -> Callable:
    """FastAPI Dependency wrapper for rate limiting."""
    def dependency(request: Request):
        limiter.check(request)
    return dependency

