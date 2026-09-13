/**
 * Custom Domain Error Classes
 * Strict isolation - Pure TypeScript.
 */

export class ApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message = 'Rate limit exceeded. Please try again shortly.') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}
