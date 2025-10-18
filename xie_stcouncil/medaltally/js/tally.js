// js/tally.js

document.addEventListener("DOMContentLoaded", async () => {
  const tallyBody = document.getElementById("tallyBody");
  const classBtn = document.getElementById("classBtn");
  const deptBtn = document.getElementById("deptBtn");
  const refreshBtn = document.getElementById("refreshBtn");

  let currentView = "class";

  async function renderTally(type) {
    tallyBody.innerHTML = `<tr><td colspan="6">Loading...</td></tr>`;

    const data = await fetchTallyData(type);
    tallyBody.innerHTML = "";

    if (!data.length) {
      tallyBody.innerHTML = `<tr><td colspan="6">No data available.</td></tr>`;
      return;
    }

    data
      .map(obj => ({ ...obj, total: obj.gold + obj.silver + obj.bronze }))
      .sort((a, b) => b.total - a.total)
      .forEach((entry, index) => {
        const row = document.createElement("tr");
        if (index === 0) row.classList.add("highlight-gold");
        else if (index === 1) row.classList.add("highlight-silver");
        else if (index === 2) row.classList.add("highlight-bronze");

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${entry.name}</td>
          <td>${entry.gold}</td>
          <td>${entry.silver}</td>
          <td>${entry.bronze}</td>
          <td><strong>${entry.total}</strong></td>
        `;
        tallyBody.appendChild(row);
      });
  }

  // Button Event Listeners
  classBtn.addEventListener("click", () => {
    classBtn.classList.add("active");
    deptBtn.classList.remove("active");
    currentView = "class";
    renderTally("class");
  });

  deptBtn.addEventListener("click", () => {
    deptBtn.classList.add("active");
    classBtn.classList.remove("active");
    currentView = "dept";
    renderTally("dept");
  });

  refreshBtn.addEventListener("click", () => renderTally(currentView));

  // Initial Load
  await renderTally("class");
});
