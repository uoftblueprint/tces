require("dotenv").config();

// supabaseClient.js (for Supabase Storage connection)
import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project details
const supabaseUrl = process.env.SUPABASE_DATABASE_URI;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
