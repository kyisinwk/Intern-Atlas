// When the button is clicked, load and show all internships
function findInternships() {
  fetch("data/internships.txt")
    .then(response => response.text())
    .then(rawText => {
      const internships = parseInternships(rawText);
      displayAll(internships);
    });
}

// Parses plain text format into objects
function parseInternships(rawText) {
  const entries = rawText.split("---").map(e => e.trim()).filter(Boolean);

  return entries.map(entry => {
    const lines = entry.split("\n").map(line => line.trim()).filter(Boolean);
    const intern = {};
    lines.forEach(line => {
      const [key, value] = line.split(":").map(part => part.trim());
      if (key && value) {
        intern[key.toLowerCase()] = value;
      }
    });
    return intern;
  });
}

// Displays all internships (no filters)
function displayAll(internships) {
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "<h2>All Available Internships</h2>";

  internships.forEach(intern => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${intern["title"]}</h3>
      <p><strong>Field:</strong> ${intern["field"]}</p>
      <p><strong>Location:</strong> ${intern["location"]}</p>
      <p><strong>Experience:</strong> ${intern["experience"]}</p>
      <p><strong>Minimum GPA:</strong> ${intern["minimum gpa"]}</p>
      <p><strong>Pay:</strong> ${intern["pay"]}</p>
      <p><strong>Platform:</strong> ${intern["platform"]}</p>
      <hr>
    `;
    resultsSection.appendChild(card);
  });
}