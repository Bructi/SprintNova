// 🔗 Supabase Client — XIE Medal Tally Project

// Your actual Supabase Project URL and anon key
const SUPABASE_URL = "https://dmoqroytssryxlqwhahk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb3Fyb3l0c3NyeXhscXdoYWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTA4NDksImV4cCI6MjA3NjE4Njg0OX0.F82TmPIQtdznL-HzobN2uVTfyG0bM7WM0UgGbMtADGM";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch medal tally data dynamically
 * @param {string} type - "class" or "dept"
 */
async function fetchTallyData(type) {
  const table = type === "class" ? "class_tally" : "dept_tally";
  const { data, error } = await supabase.from(table).select("*");

  if (error) {
    console.error(`❌ Error fetching ${type} tally:`, error.message);
    return [];
  }

  return data || [];
}

// 🔹 Optional: quick test to verify connection
(async () => {
  const { data, error } = await supabase.from("class_tally").select("*");
  console.log("Test Data:", data);  // Should print your table rows
  console.log("Test Error:", error); // Should be null
})();
