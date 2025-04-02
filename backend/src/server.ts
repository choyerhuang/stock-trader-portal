// server.ts
// Starts the backend server (logic stripped for public release)

import app from "./app";
import "dotenv/config";
import env from "./env"; // validates required env variables

// 🔒 Runtime validation and launch logic omitted for academic integrity.
// This section typically sets up the server port and logs environment info.

const PORT = env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
