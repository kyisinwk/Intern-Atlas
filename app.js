// When the button is clicked, load and filter internships
function findInternships() {
  // Get form input values
  const interest = document.getElementById("interest").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const experience = document.getElementById("experience").value.toLowerCase();
  const gpa = parseFloat(document.getElementById("gpa").value) || 0;
  const payPref = document.getElementById("payPref").value.toLowerCase();
  const resume = document.getElementById("resume").value;

  // Fetch internship data
  fetch("data/internships.txt")
    .then(response => response.text())
    .then(rawText => {
      const internships = parseInternships(rawText);
      const matches = filterInternships(internships, {
        interest,
        location,
        experience,
        gpa,
        payPref
      });
      displayResults(matches);
    });
}

// Parses plain text format into structured internship objects
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

// Filters internships based on user input
function filterInternships(internships, filters) {
  return internships.filter(intern => {
    return (
      intern["field"]?.toLowerCase().includes(filters.interest) &&
      (intern["location"]?.toLowerCase().includes(filters.location) || filters.location === "") &&
      (filters.experience === "none" || intern["experience"]?.toLowerCase() === filters.experience) &&
      parseFloat(intern["minimum gpa"]) <= filters.gpa &&
      (filters.payPref === "volunteer" || intern["pay"]?.toLowerCase() === filters.payPref)
    );
  });
}

// Displays filtered internships
function displayResults(matches) {
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "";

  if (matches.length === 0) {
    resultsSection.innerHTML = "<p>No matching internships found. Try adjusting your filters.</p>";
    return;
  }

  resultsSection.innerHTML = "<h2>Matching Internships</h2>";

  matches.forEach(intern => {
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