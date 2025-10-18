document.addEventListener("DOMContentLoaded", () => {
    const draftForm = document.getElementById("draftForm");
    const statusMessage = document.getElementById("statusMessage");
    const historyTableBody = document.getElementById("history-table-body");
    if (!draftForm) return;

    draftForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("draftTitle").value.trim(); const group = document.getElementById("recipientGroup").value;
        statusMessage.className = "";
        if (!title || !group) { statusMessage.textContent = "⚠️ Please fill all required fields."; statusMessage.className = "error"; return; }
        addHistoryRow(title, group);
        statusMessage.textContent = `✅ Draft sent successfully to ${group}!`; statusMessage.className = "success";
        draftForm.reset();
        setTimeout(() => { statusMessage.className = ""; }, 4000);
    });

    function addHistoryRow(title, group) {
        const newRow = historyTableBody.insertRow(0);
        const date = new Date();
        const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true }).replace(',', '');
        newRow.innerHTML = `<td>${escapeHTML(title)}</td><td>${escapeHTML(group)}</td><td>${formattedDate}</td><td class="actions"><button class="btn-action view" title="View Details">👁️</button></td>`;
    }

    const modal = document.getElementById("preview-modal");
    if (historyTableBody && modal) {
        const closeButton = modal.querySelector(".close-button");
        historyTableBody.addEventListener("click", (e) => {
            if (e.target.closest(".view")) {
                const row = e.target.closest("tr");
                document.getElementById("preview-title").textContent = row.cells[0].textContent;
                document.getElementById("preview-group").textContent = row.cells[1].textContent;
                document.getElementById("preview-date").textContent = row.cells[2].textContent;
                modal.classList.add("active"); modal.style.display = 'flex';
            }
        });
        const closeModal = () => { modal.classList.remove("active"); setTimeout(() => { modal.style.display = 'none'; }, 300); };
        closeButton.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    }
});

function escapeHTML(str) { return str.replace(/[&<>"']/g, match => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[match]); }