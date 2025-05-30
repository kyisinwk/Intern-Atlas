window.onload = function () {
    fetch("data/internships.txt")
      .then(response => response.text())
      .then(rawText => {
        const internships = parseInternships(rawText);
        displayResults(internships);
        initMap(internships); // initialize the map with markers
      });
  };
  
  // Parse internships from plain text
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
  
  // Display internship cards
  function displayResults(internships) {
    const resultsSection = document.querySelector(".internship-list");
    resultsSection.innerHTML = "";
  
    if (internships.length === 0) {
      resultsSection.innerHTML = "<p>No internships found.</p>";
      return;
    }
  
    internships.forEach(intern => {
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
  
  // Initialize Leaflet map
  function initMap(internships) {
    const map = L.map("map").setView([39.8283, -98.5795], 4); // Centered on USA
  
    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  
    // Example: Basic location-based marker using keywords
    internships.forEach(intern => {
      const location = intern["location"]?.toLowerCase();
  
      // Simple keyword-based mock locations (replace with real coordinates if possible)
      const coords = getCoordinatesForLocation(location);
      if (coords) {
        L.marker(coords)
          .addTo(map)
          .bindPopup(`<b>${intern["title"]}</b><br>${intern["location"]}`);
      }
    });
  }
  
  // Dummy function — replace with real geocoding later
  function getCoordinatesForLocation(location) {
    if (location.includes("san francisco")) return [37.7749, -122.4194];
    if (location.includes("new york")) return [40.7128, -74.0060];
    if (location.includes("remote")) return null; // skip remote jobs
    if (location.includes("los angeles")) return [34.0522, -118.2437];
    if (location.includes("chicago")) return [41.8781, -87.6298];
    return null; // Unknown location
  }