document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-event-form');
    const successMessage = document.getElementById('success-message');
    const pageTitle = document.querySelector('.admin-container h1');
    const submitButton = document.querySelector('button[type="submit"]');
    const eventYearInput = document.getElementById('eventYear');

    const STORAGE_KEY = 'xieEvents';

    const getEvents = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const saveEvents = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    let events = getEvents();

    if (editId) {
        // --- EDIT MODE ---
        const eventToEdit = events.find((e) => e.id == editId);
        if (eventToEdit) {
            pageTitle.textContent = 'Edit Event Details';
            submitButton.textContent = 'Save Changes';
            
            document.getElementById('eventName').value = eventToEdit.name;
            document.getElementById('winnerName').value = eventToEdit.winner;
            document.getElementById('className').value = eventToEdit.class;
            eventYearInput.value = eventToEdit.year;
            document.getElementById('fest').value = eventToEdit.fest;
            document.getElementById('medal').value = eventToEdit.medal;
        }
    } else {
        // --- ADD NEW MODE ---
        // **FIX: Pre-fill the year with the current year**
        eventYearInput.value = new Date().getFullYear();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const eventData = {
            id: editId ? parseInt(editId) : Date.now(),
            name: document.getElementById('eventName').value.trim(),
            winner: document.getElementById('winnerName').value.trim(),
            class: document.getElementById('className').value.trim(),
            year: parseInt(eventYearInput.value),
            fest: document.getElementById('fest').value,
            medal: document.getElementById('medal').value,
        };

        if (editId) {
            events = events.map((event) => (event.id == editId ? eventData : event));
        } else {
            events.push(eventData);
        }

        saveEvents(events);

        successMessage.textContent = `✅ Event ${editId ? 'updated' : 'added'} successfully!`;
        successMessage.classList.remove('hidden');

        setTimeout(() => {
            window.location.href = 'events.html';
        }, 1500);
    });
});