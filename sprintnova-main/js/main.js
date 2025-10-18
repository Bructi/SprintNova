document.addEventListener('DOMContentLoaded', () => {
    // --- Upcoming Events ---
    const upcomingEventsContainer = document.getElementById('upcoming-events-container');

    // This data would ideally come from your Supabase 'events' table
    const events = [
        {
            id: 1,
            title: "CodeClash Event",
            fest: "Transmission",
            date: "Oct 25, 2025 | 10:00 AM",
            image: "assets/event-posters/codeclash.jpg", // NEW: Image path
            registrationLink: "https://forms.gle/yourcodeclashformlink", // NEW: Google Form link
            accent: true // Keep if you want a distinct button style, otherwise remove
        },
        {
            id: 2,
            title: "Melody Night Event",
            fest: "Spandan",
            date: "Oct 28, 2025 | 6:00 PM",
            image: "assets/event-posters/melody-night.jpg",
            registrationLink: "https://forms.gle/yourmelodyformlink"
        },
        {
            id: 3,
            title: "XIE Marathon Event",
            fest: "Sparx",
            date: "Nov 02, 2025 | 7:00 AM",
            image: "assets/event-posters/marathon.jpg",
            registrationLink: "https://forms.gle/yourmarathonformlink"
        },
        {
            id: 4,
            title: "RoboWars Event",
            fest: "Transmission",
            date: "Nov 05, 2025 | 11:00 AM",
            image: "assets/event-posters/robowars.jpg",
            registrationLink: "https://forms.gle/yourrobowarsformlink"
        },
        // Add more events here
        {
            id: 5,
            title: "Chess Tournament",
            fest: "Mind Games",
            date: "Nov 10, 2025 | 2:00 PM",
            image: "assets/event-posters/chess.jpg",
            registrationLink: "https://forms.gle/yourchesstournamentlink"
        },
        {
            id: 6,
            title: "Dance Mania",
            fest: "Fusion Fest",
            date: "Nov 15, 2025 | 8:00 PM",
            image: "assets/event-posters/dance-mania.jpg",
            registrationLink: "https://forms.gle/yourdancemanialink"
        }
    ];

    function renderEvents() {
        if (!upcomingEventsContainer) return; // Exit if container not found

        upcomingEventsContainer.innerHTML = ''; // Clear existing events
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card', 'card'); // Added 'card' class for styling

            // Dynamically set button class based on 'accent' property, or default to primary
            const buttonClass = event.accent ? 'btn btn-accent' : 'btn btn-primary';

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title} Poster" class="event-poster">
                <div class="card-content">
                    <h3>${event.title}</h3>
                    <p class="event-fest">from ${event.fest}</p>
                    <p class="event-date">${event.date}</p>
                    <a href="${event.registrationLink}" target="_blank" class="${buttonClass}">Register Now</a>
                </div>
            `;
            upcomingEventsContainer.appendChild(eventCard);
        });
    }

    renderEvents(); // Initial render


    // --- Animated Stats Counter (UNCHANGED) ---
    // (Keep your existing stats counter logic here)
    const statCounters = document.querySelectorAll('.stat-item h2');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent, 10);
                let startValue = 0;
                const duration = 2000; // 2 seconds
                const step = Math.ceil(endValue / (duration / 10)); // Calculate step for smoother animation

                const counter = setInterval(() => {
                    if (startValue < endValue) {
                        startValue += step;
                        if (startValue > endValue) startValue = endValue;
                        target.textContent = startValue;
                    } else {
                        clearInterval(counter);
                    }
                }, 10);
                observer.unobserve(target); // Stop observing once animated
            }
        });
    }, observerOptions);

    statCounters.forEach(counter => {
        observer.observe(counter);
    });

    // --- Notice Ticker (UNCHANGED) ---
    // (Keep your existing notice ticker logic here)
    const noticeContent = document.querySelector('.notice-content');
    if (noticeContent) {
        // Duplicate content to ensure seamless loop
        noticeContent.innerHTML += noticeContent.innerHTML;
    }

    // --- Countdown Timer (UNCHANGED) ---
    // (Keep your existing countdown timer logic here)
    const countdownItems = document.querySelectorAll('.countdown-item');
    const targetDate = new Date("Nov 25, 2025 00:00:00").getTime(); // Example target date

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownItems.forEach(item => {
                item.querySelector('h2').textContent = "00";
                item.querySelector('p').textContent = "ENDED";
            });
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownValues = [days, hours, minutes, seconds];
        const countdownLabels = ["Days", "Hours", "Minutes", "Seconds"];

        countdownItems.forEach((item, index) => {
            item.querySelector('h2').textContent = countdownValues[index].toString().padStart(2, '0');
            item.querySelector('p').textContent = countdownLabels[index];
        });
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display immediately

    // --- Testimonial Slider (UNCHANGED) ---
    // (Keep your existing testimonial slider logic here)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    if (testimonialCards.length > 0) {
        showTestimonial(currentTestimonial);
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000); // Change testimonial every 5 seconds
    }

    // --- FAQ Accordion (UNCHANGED) ---
    // (Keep your existing FAQ accordion logic here)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = question.classList.toggle('active');

            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
            // Close other open answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherAnswer.style.maxHeight = null;
                    }
                }
            });
        });
    });

    // --- Medal Tally / Leaderboard Tabs (UNCHANGED) ---
    // (Keep your existing tab logic here)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const leaderboardTables = document.querySelectorAll('.leaderboard-table-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' from all buttons and hide all tables
            tabButtons.forEach(btn => btn.classList.remove('active'));
            leaderboardTables.forEach(table => table.classList.add('hidden'));

            // Add 'active' to clicked button
            button.classList.add('active');

            // Show corresponding table
            const targetId = button.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Ensure one tab is active on load
    if (tabButtons.length > 0) {
        tabButtons[0].click(); // Activate the first tab by default
    }

});