document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (navbar) {
    navbar.innerHTML = `
      <div class="nav-container">
        <a href="index.html" class="logo">XIE Council</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="events.html">Events</a></li>
          <li><a href="medal_tally.html" class="active">Medal Tally</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} XIE Student Council. All Rights Reserved.</p>
    `;
  }
});
