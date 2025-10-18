// Add Supabase details (replace with your actual keys)
const SUPABASE_URL = "https://YOUR_SUPABASE_URL.supabase.co";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";
let supabase = null; // Initialize later

if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
    console.error("Supabase client not loaded.");
    // Optionally redirect to an error page or show a message
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!supabase) {
        alert("Supabase client failed to load. Cannot verify admin status.");
        window.location.href = 'auth.html';
        return;
    }

    // --- Security Check ---
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = 'auth.html'; // Not logged in
        return;
    }

    // Fetch user role from your database
    const { data: profile, error } = await supabase
        .from('users') // Or your profiles table name
        .select('role')
        .eq('id', user.id)
        .single();

    if (error || !profile || profile.role !== 'admin') {
        alert('Access Denied: Admins only.');
        window.location.href = 'index.html'; // Redirect non-admins
        return;
    }

    // --- Page specific code starts below ---
    console.log('Admin user verified. Dashboard loaded.');

    // --- Logout Functionality ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Logout error:", error);
                alert("Error logging out.");
            } else {
                console.log("Logged out successfully.");
                window.location.href = 'auth.html'; // Redirect to login page
            }
        });
    }

    // --- Add styles for admin link cards (optional, can also put in a separate admin_dashboard.css) ---
    const style = document.createElement('style');
    style.textContent = `
        .admin-link-card {
            text-decoration: none;
            color: var(--Text-Primary);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .admin-link-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 74, 173, 0.15); /* Subtle blue shadow */
        }
        .admin-link-card i {
            color: var(--Primary);
            margin-bottom: 1rem;
        }
        .admin-link-card h3 {
            color: var(--Primary-Dark);
        }
        .admin-link-card p {
            color: var(--Text-Secondary);
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);

});