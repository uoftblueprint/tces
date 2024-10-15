require("dotenv").config();

// supabaseClient.js (for Supabase Storage connection)
const { createClient } = require("@supabase/supabase-js");

// Replace with your Supabase project details
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  supabase,
};
