/**
 * Rate limiting for the API.
 */
const rateLimit = require("express-rate-limit");

const genericLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Window in milliseconds (MIN * SEC * MILLISEC)
    max: 100, // 100 requests per IP per window
    message: { error: 'Too many requests. Try again later.' },
    standardHeaders: true, // Return RateLimit-* headers
    legacyHeaders: false,  // Disable X-RateLimit-* headers

    // Optional: skip successful requests so only failed attempts count
    skipSuccessfulRequests: false,
});


const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many registration attempts. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many login attempts. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
});

module.exports = {
    genericLimiter,
    registerLimiter,
    loginLimiter,
}