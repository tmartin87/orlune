import "dotenv/config";

import { app } from "./app.js";

const port = Number(process.env.PORT ?? "3000");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number");
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Orlune API running on port ${port}`);
});