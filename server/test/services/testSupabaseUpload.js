// testSupabaseStorage.js

const { supabase } = require("../../src/configs/supabaseClient");

// Function to test uploading a file to Supabase Storage
async function testUploadToSupabaseStorage() {
  const file = new File(["Hello Supabase!"], "test.txt", {
    type: "text/plain",
  });

  const { data, error } = await supabase.storage
    .from("resume-uploads") // Replace with your actual storage bucket name
    .upload("test/test.txt", file);

  if (error) {
    console.error("Error uploading file to Supabase Storage:", error);
  } else {
    console.log("File uploaded successfully:", data);
  }
}

// Call the test function
testUploadToSupabaseStorage();
