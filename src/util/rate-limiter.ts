/**
 * Date created: 09/05/2026
 *
 * Author: Nothile Moyo
 *
 * Description: The rate limiter file for the app
 * This is key for security to prevent DDOS and brute force attacks on the server
 */
import { NextFunction, Request, Response } from "express";
import { RateLimiterMongo } from "rate-limiter-flexible";
import mongoose from "mongoose";

// ==================================================================================================================
// Rate limiting at a rate of 120 per minute (2 per second) to prevent spam. Blocks for 1 minute when limit reached.
// ==================================================================================================================

/**
 * @name rateLimiter
 *
 * @param storeClient - Client to connect to the database
 * @param points - How many requests
 * @param duration - The period to trace the requests
 * @param blockDuration - How long to block the IP address for
 */
const rateLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: 2,
  duration: 1,
  blockDuration: 60,
});

/**
 * @name rateLimiterMiddleware
 *
 * @param request - Request info from the HTTP request
 * @param response - Response to return to the user with the status code and JSON for parsing
 */
const rateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // Get forwarded address so we get the original IP address
  const proxyIPHeader = request.headers["x-forwarded-for"] as string;
  let proxyIP = "unknown";
  let IP = proxyIP;

  if (proxyIPHeader) {
    proxyIP = proxyIPHeader.split(",")[0].trim();
  }

  if (request.ip) {
    IP = request.ip;
  }

  // Apply our middleware for rate limiting
  try {
    await rateLimiter.consume(IP);
    next();
  } catch (error) {
    response.status(429).json({
      message: "Too many requests. Please try again later",
      error: error,
      success: false,
    });
  }
};

export default rateLimiterMiddleware;
