/**
 * Date created: 10/05/2026
 *
 * Author: Nothile Moyo
 *
 * Description: A test file which will hammer my endpoint in order to make sure the rate limiter is successful
 */

// ========================================================================================================================
// Hammer the test endpoint in a batch using a promise
// File will be removed from the production build
// ========================================================================================================================
import dotenv from "dotenv";

// Import the .env variables
dotenv.config();

const environment = process.env;
const endpoint = `${environment.DEVELOPMENT_URL}:${environment.EXPRESS_PORT}`;
const numberOfRequests = 20;
const currentDate = new Date();

const formatTime = (date) => {
  const pad = (text) => String(text).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const results = await Promise.all(
  Array.from({ length: numberOfRequests }, async (_, index) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ __typename }" }),
    });
    return {
      request: index + 1,
      status: res.status,
      time: formatTime(currentDate),
    };
  }),
);

for (const { request, status, time } of results) {
  const label = status === 429 ? "❌ RATE LIMITED" : "✅ OK";
  console.log(`[${time}] Request ${request}: ${status} ${label}`);
}
