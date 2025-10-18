// --- Supabase Client Initialization ---
// IMPORTANT: Replace with your actual project URL and Anon Key
const SUPABASE_URL = "https://YOUR_SUPABASE_URL.supabase.co";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

// Check if Supabase client is available
if (!window.supabase) {
  console.error("Supabase client library is not loaded.");
} else {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
  // --- Auth Page Logic ---
  document.addEventListener("DOMContentLoaded", () => {
    
    // Get DOM elements
    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");
    const statusMsg = document.getElementById("loginStatus");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    let currentRole = "user"; // default role

    // --- Role Selection Logic ---
    userBtn.addEventListener("click", () => {
      if (currentRole !== "user") {
        currentRole = "user";
        userBtn.classList.add("active");
        adminBtn.classList.remove("active");
        console.log("Role set to User");
      }
    });

    adminBtn.addEventListener("click", () => {
      if (currentRole !== "admin") {
        currentRole = "admin";
        adminBtn.classList.add("active");
        userBtn.classList.remove("active");
        console.log("Role set to Admin");
      }
    });
    
    // --- Utility Functions for Status ---
    function showStatus(message, type = "normal") {
      statusMsg.textContent = message;
      statusMsg.className = "status-message"; // Reset
      if (type === "error") {
        statusMsg.classList.add("error");
      } else if (type === "success") {
        statusMsg.classList.add("success");
      }
    }

    function disableForm(disabled) {
      loginBtn.disabled = disabled;
      emailInput.disabled = disabled;
      passwordInput.disabled = disabled;
      loginBtn.textContent = disabled ? "Authenticating..." : "Login";
    }

    // --- Login Submission Handler ---
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop form from submitting traditionally
      
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Basic validation
      if (!email || !password) {
        showStatus("⚠️ Please fill in all fields.", "error");
        return;
      }

      // Add console log for debugging role selection
      console.log("Current role on submit:", currentRole); 

      // --- MOCK LOGIN (If Supabase keys are not set) ---
      if (SUPABASE_URL === "https://YOUR_SUPABASE_URL.supabase.co") {
        console.warn("Supabase keys not set. Running in MOCK mode.");
        showStatus("⏳ Authenticating (Mock Mode)...", "normal");
        disableForm(true);

        setTimeout(() => {
          let mockLoginSuccess = false;
          let redirectUrl = "";

          // Mock Admin Login
          if (email === "admin@xie.edu" && password === "admin123" && currentRole === "admin") {
            mockLoginSuccess = true;
            redirectUrl = "admin_dashboard.html";
            console.log("Mock Admin Login successful. Redirecting to:", redirectUrl); // Debug log
          }
          // Mock User Login
          else if (email === "student@xie.edu" && password === "user123" && currentRole === "user") {
            mockLoginSuccess = true;
            redirectUrl = "index.html";
            console.log("Mock User Login successful. Redirecting to:", redirectUrl); // Debug log
          }
          // Mock Role Mismatch
          else if ((email === "admin@xie.edu" && currentRole === "user") || (email === "student@xie.edu" && currentRole === "admin")) {
            showStatus("❌ Unauthorized role access!", "error");
            console.log("Mock Login Failed: Role mismatch."); // Debug log
          }
          // Mock Invalid Credentials
          else {
            showStatus("❌ Invalid email or password.", "error");
            console.log("Mock Login Failed: Invalid credentials."); // Debug log
          }

          if (mockLoginSuccess) {
            showStatus("✅ Login successful!", "success");
            setTimeout(() => {
              console.log("Attempting redirect now..."); // Debug log
              window.location.href = redirectUrl; 
            }, 1000); // Wait 1 second before redirecting
          } else {
            disableForm(false);
          }
        }, 1500); // Simulate network delay
        
        return; // Stop execution if in mock mode
      }

      // --- LIVE SUPABASE LOGIN ---
      try {
        showStatus("⏳ Authenticating...", "normal");
        disableForm(true);

        // 1. Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) throw authError;

        if (!authData.user) {
          throw new Error("Authentication failed, no user data returned.");
        }

        // 2. Check role from the 'users' (or 'profiles') table
        const { data: profileData, error: profileError } = await supabase
          .from("users") // Change 'users' to your table name if different
          .select("role")
          .eq("id", authData.user.id) // Best practice to use user ID
          .single();

        if (profileError) throw profileError;

        // 3. Verify role
        if (!profileData || profileData.role !== currentRole) {
          await supabase.auth.signOut(); 
          throw new Error("Unauthorized role access!");
        }

        // 4. Success and Redirect
        showStatus("✅ Login successful!", "success");
        setTimeout(() => {
          if (currentRole === "admin") {
            window.location.href = "admin_dashboard.html";
          } else {
            window.location.href = "index.html";
          }
        }, 1000);

      } catch (err) {
        console.error("Login Error:", err.message);
        let userMessage = "❌ Invalid email or password.";
        if (err.message === "Unauthorized role access!") {
          userMessage = "❌ Unauthorized role access!";
        }
        showStatus(userMessage, "error");
        disableForm(false);
      }
    });

  });
}