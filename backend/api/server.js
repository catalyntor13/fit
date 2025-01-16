const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Initialize Express app
const app = express();

// Enable CORS for all origins (or restrict to specific origin)
app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend's origin

app.use(bodyParser.json());

// Route to delete user
app.post("/api/delete-user", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Step 1: Mark user as deleted in `antrenori` table
    const { error: tableError } = await supabase
      .from("antrenori")
      .update({ is_deleted: true })
      .eq("id", userId);

    if (tableError) throw tableError;

    // Step 2: Delete user from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) throw authError;

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to delete user" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
