
  const SUPABASE_URL = 'ttps://dmoqroytssryxlqwhahk.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb3Fyb3l0c3NyeXhscXdoYWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTA4NDksImV4cCI6MjA3NjE4Njg0OX0.F82TmPIQtdznL-HzobN2uVTfyG0bM7WM0UgGbMtADGM';

  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
