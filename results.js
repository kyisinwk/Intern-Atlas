window.onload = function () {
    // Load saved filters from localStorage
    const filters = {
      interest: localStorage.getItem("interest") || "",
      location: localStorage.getItem("location") || "",
      experience: localStorage.getItem("experience") || "none",
      gpa: parseFloat(localStorage.getItem("gpa")) || 0,
      payPref: localStorage.getItem("payPref") || "paid only",
      resume: localStorage.getItem("resume") || "no"
    };
  
    // Fetch internship data
    fetch("data/internships.txt")
      .then(response => response.text())
      .then(rawText => {
        const internships = parseInternships(rawText);
        const matches = filterInternships(internships, filters);
        displayResults(matches);
      });
  };
  
  // Parse raw text into internship objects
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
  
  // Filter based on saved inputs
  function filterInternships(internships, filters) {
    return internships.filter(intern => {
      return (
        intern["field"]?.toLowerCase().includes(filters.interest) &&
        (intern["location"]?.toLowerCase().includes(filters.location) || filters.location === "") &&
        (filters.experience === "none" || intern["experience"]?.toLowerCase() === filters.experience) &&
        parseFloat(intern["minimum gpa"] || "0") <= filters.gpa &&
        (filters.payPref === "volunteer ok" || intern["pay"]?.toLowerCase() === filters.payPref)
      );
    });
  }
  
  // Show results in the page
  function displayResults(matches) {
    const resultsSection = document.querySelector(".internship-list");
    resultsSection.innerHTML = "";
  
    if (matches.length === 0) {
      resultsSection.innerHTML = "<p>No matching internships found. Try adjusting your filters.</p>";
      return;
    }
  
    matches.forEach(intern => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${intern["title"] || "Untitled Internship"}</h3>
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