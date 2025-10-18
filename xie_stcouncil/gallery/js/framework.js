document.addEventListener("DOMContentLoaded", () => {
  // Navbar
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.innerHTML = `
      <nav>
        <a href="index.html">🏠 Home</a>
        <a href="events.html">🎉 Events</a>
        <a href="medal_tally.html">🏅 Medal Tally</a>
        <a href="gallery.html">📸 Gallery</a>
        <a href="contact.html">📞 Contact</a>
      </nav>
    `;
  }

  // Footer
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} XIE Student Council. All Rights Reserved.</p>
      <p>Designed using Universal Frontend Framework</p>
    `;
  }
});

