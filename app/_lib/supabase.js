import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rfdhytmendcqtjksrwwg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZGh5dG1lbmRjcXRqa3Nyd3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NDY2MzcsImV4cCI6MjA1MTQyMjYzN30.RsPvoMFWNgDW4EqDR0q9k1Ysa69DXt98kGwnP7XSjqw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
