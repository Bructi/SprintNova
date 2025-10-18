document.addEventListener('DOMContentLoaded', () => {
    const eventGrid = document.getElementById('event-grid');
    const emptyState = document.getElementById('empty-state');
    const festFilter = document.getElementById('fest-filter');
    const medalFilter = document.getElementById('medal-filter');
    const searchInput = document.getElementById('search-input');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    const STORAGE_KEY = 'xieEvents';

    const mockEventsData = [
        { id: Date.now() + 1, fest: "Spandan", name: "Solo Singing", winner: "Aditi Rao", medal: "Gold", class: "SE COMP A", year: 2025 },
        { id: Date.now() + 2, fest: "Transmission", name: "Coding Marathon", winner: "Rahul Jain", medal: "Silver", class: "TE IT", year: 2025 },
        { id: Date.now() + 3, fest: "Sparx", name: "Football", winner: "Team Mech B", medal: "Gold", class: "BE MECH", year: 2024 },
        { id: Date.now() + 4, fest: "Spandan", name: "Group Dance", winner: "Dance Crew", medal: "Bronze", class: "TE ELEX", year: 2025 },
        { id: Date.now() + 5, fest: "Transmission", name: "Robo Wars", winner: "Arjun Singh", medal: "Gold", class: "BE EXTC", year: 2024 },
    ];

    let allEvents = [];

    const loadEvents = () => {
        const storedEvents = localStorage.getItem(STORAGE_KEY);
        allEvents = storedEvents ? JSON.parse(storedEvents) : mockEventsData;
    };

    const renderEvents = (eventsToDisplay) => {
        eventGrid.innerHTML = '';
        emptyState.classList.toggle('show', eventsToDisplay.length === 0);

        eventsToDisplay.forEach(event => {
            const medalEmoji = { Gold: '🥇', Silver: '🥈', Bronze: '🥉' }[event.medal] || '';
            const card = document.createElement('div');
            card.className = 'event-card';

            // --- MODIFICATION START ---
            // The card footer with the kebab menu, edit, and delete buttons has been removed.
            card.innerHTML = `
                <div class="card-header">
                    <h3>${event.name}</h3>
                    <span class="medal-badge medal-${event.medal.toLowerCase()}">${medalEmoji} ${event.medal}</span>
                </div>
                <div class="card-body">
                    <p><strong>Winner:</strong> ${event.winner}</p>
                    <p><strong>Class:</strong> ${event.class}</p>
                    <p><strong>Fest:</strong> ${event.fest}</p>
                    <p><strong>Year:</strong> ${event.year}</p>
                </div>`;
            // --- MODIFICATION END ---
            
            eventGrid.appendChild(card);

            // All event listeners for edit, delete, and the dropdown menu have been removed.
        });
    };

    const applyFilters = () => {
        const selectedFest = festFilter.value;
        const selectedMedal = medalFilter.value;
        const searchQuery = searchInput.value.toLowerCase().trim();

        const filteredEvents = allEvents.filter(event => {
            const matchesFest = selectedFest === 'All' || event.fest === selectedFest;
            const matchesMedal = selectedMedal === 'All' || event.medal === selectedMedal;
            const matchesSearch = searchQuery === '' ||
                event.name.toLowerCase().includes(searchQuery) ||
                event.winner.toLowerCase().includes(searchQuery);
            return matchesFest && matchesMedal && matchesSearch;
        });
        renderEvents(filteredEvents);
    };

    const clearFilters = () => {
        festFilter.value = 'All';
        medalFilter.value = 'All';
        searchInput.value = '';
        applyFilters();
    };

    [festFilter, medalFilter, searchInput].forEach(el => el.addEventListener('input', applyFilters));
    clearFiltersBtn.addEventListener('click', clearFilters);

    // The document-level click listener for hiding dropdowns has been removed as it's no longer needed.

    // --- INITIALIZATION ---
    loadEvents();
    applyFilters();
});