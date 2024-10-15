// testSupabase.js

const { supabase } = require("../../src/configs/supabaseClient");

// Function to test Supabase connection and fetch data from a table
async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from("resume-uploads") // Replace with the actual table name
    .select("*");

  if (error) {
    console.error("Error fetching data from Supabase:", error);
  } else {
    console.log("Data fetched from Supabase:", data);
  }
}

// Call the test function
testSupabaseConnection();
