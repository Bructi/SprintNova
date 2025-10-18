document.addEventListener("DOMContentLoaded", () => {
    // --- Mailing List Tab & Email Management ---
    const tabContainer = document.querySelector(".tabs");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabContainer) {
        tabContainer.addEventListener("click", (e) => {
            const clickedButton = e.target.closest(".tab-btn");
            if (!clickedButton) return;
            tabContainer.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            clickedButton.classList.add("active");
            document.getElementById(`tab-${clickedButton.dataset.tab}`).classList.add("active");
        });
    }

    document.querySelectorAll(".admin-section .tab-content").forEach(section => {
        const addForm = section.querySelector(".add-email-form");
        const emailList = section.querySelector(".email-list");
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = section.querySelector("input[type='email']");
            const email = emailInput.value.trim();
            if (email) {
                const li = document.createElement("li");
                li.innerHTML = `<span>${escapeHTML(email)}</span><button class="btn-action delete-email" title="Delete Email">🗑️</button>`;
                emailList.appendChild(li);
                emailInput.value = "";
            }
        });
        emailList.addEventListener("click", (e) => {
            if (e.target.closest(".delete-email")) if (confirm("Are you sure?")) e.target.closest("li").remove();
        });
    });

    // --- Admin Draft Form ---
    const adminDraftForm = document.getElementById("adminDraftForm");
    if (adminDraftForm) {
        const statusMessage = document.getElementById("formStatusMessage");
        const historyTableBody = document.getElementById("draft-history-body");
        adminDraftForm.addEventListener("submit", e => {
            e.preventDefault();
            const title = document.getElementById("draftTitle").value; const group = document.getElementById("recipientGroup").value;
            if (!title || !group) { statusMessage.textContent = "⚠️ Title and Recipient Group are required."; statusMessage.className = "error"; return; }
            let status, date;
            if (e.submitter.name === "schedule") {
                const scheduleDate = document.getElementById("scheduleDate").value, scheduleTime = document.getElementById("scheduleTime").value;
                if (!scheduleDate || !scheduleTime) { statusMessage.textContent = "⚠️ Please select a date and time."; statusMessage.className = "error"; return; }
                status = "scheduled"; date = new Date(`${scheduleDate}T${scheduleTime}`); statusMessage.textContent = `✅ Draft successfully scheduled.`;
            } else { status = "sent"; date = new Date(); statusMessage.textContent = `✅ Draft was sent successfully!`; }
            addDraftToTable(historyTableBody, { title, group, date, status });
            statusMessage.className = "success"; adminDraftForm.reset();
            document.querySelector(".file-name").textContent = "No file chosen";
            setTimeout(() => { statusMessage.className = ""; statusMessage.textContent = ""; }, 5000);
        });
        document.getElementById('draftFile').addEventListener('change', function() {
            document.querySelector(".file-name").textContent = this.files[0] ? this.files[0].name : "No file chosen";
        });
    }

    // --- Modal & Table Actions ---
    const historyTable = document.getElementById("draft-history-body");
    const modal = document.getElementById("preview-modal");
    if (historyTable && modal) {
        historyTable.addEventListener("click", e => {
            const row = e.target.closest("tr"); if (!row) return;
            if (e.target.closest(".view")) {
                document.getElementById("preview-title").textContent = row.cells[0].textContent;
                document.getElementById("preview-group").textContent = row.cells[1].textContent;
                document.getElementById("preview-date").textContent = row.cells[2].textContent;
                document.getElementById("preview-status").textContent = row.cells[3].textContent;
                modal.classList.add("active"); modal.style.display = 'flex';
            }
            if (e.target.closest(".delete-draft")) {
                if (confirm(`Delete draft: "${row.cells[0].textContent}"?`)) row.remove();
            }
        });
        const closeModal = () => { modal.classList.remove("active"); setTimeout(() => { modal.style.display = 'none'; }, 300); };
        modal.querySelector(".close-button").addEventListener("click", closeModal);
        modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    }
});

function addDraftToTable(tableBody, draftData) {
    const newRow = tableBody.insertRow(0);
    const formattedDate = draftData.date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');
    const statusClass = draftData.status.toLowerCase(), statusText = statusClass.charAt(0).toUpperCase() + statusClass.slice(1);
    newRow.innerHTML = `<td>${escapeHTML(draftData.title)}</td><td>${escapeHTML(draftData.group)}</td><td>${formattedDate}</td><td><span class="status ${statusClass}">${statusText}</span></td><td class="actions"><button class="btn-action view" title="View Details">👁️</button><button class="btn-action delete-draft" title="Delete Draft">🗑️</button></td>`;
}

function escapeHTML(str) { return str.replace(/[&<>"']/g, match => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[match]); }