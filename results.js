window.onload = function () {
    // Load filters from localStorage
    const filters = {
      interest: localStorage.getItem("interest") || "",
      location: localStorage.getItem("location") || "",
      experience: localStorage.getItem("experience") || "none",
      gpa: parseFloat(localStorage.getItem("gpa")) || 0,
      payPref: localStorage.getItem("payPref") || "paid only",
      resume: localStorage.getItem("resume") || "no"
    };
  
    // Fetch internship data and process
    fetch("output.txt")
      .then(response => response.text())
      .then(rawText => {
        const internships = parseInternships(rawText);
        const matches = filterInternships(internships, filters);
        displayResults(matches);
        initMap(matches);
      });
  };
  
  // Convert raw text to internship objects
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
  
  // Filter internships based on saved input
  function filterInternships(internships, filters) {
    return internships.filter(intern => {
      const field = (intern["field"] || "").toLowerCase();
      const location = (intern["location"] || "").toLowerCase();
      const experience = (intern["experience"] || "").toLowerCase();
      const pay = (intern["pay"] || "").toLowerCase();
      const minGpa = parseFloat(intern["minimum gpa"]) || 0;
  
      const interestMatch = !filters.interest || field.includes(filters.interest.toLowerCase());
      const locationMatch = !filters.location || location.includes(filters.location.toLowerCase());
      const experienceMatch = filters.experience === "none" || experience === filters.experience.toLowerCase();
      const gpaMatch = !filters.gpa || minGpa <= filters.gpa;
  
      const payMatch =
        filters.payPref === "volunteer ok"
          ? ["unpaid", "volunteer", "unpaid/volunteer"].includes(pay)
          : filters.payPref === "paid only"
          ? pay === "paid"
          : filters.payPref === "stipend"
          ? pay === "stipend"
          : true;
  
      return interestMatch && locationMatch && experienceMatch && gpaMatch && payMatch;
    });
  }
  
  // Display internship results as cards
  function displayResults(internships) {
    const resultsSection = document.querySelector(".internship-list");
    resultsSection.innerHTML = "";
  
    if (internships.length === 0) {
      resultsSection.innerHTML = "<p>No matching internships found. Try adjusting your filters.</p>";
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
  
  // Initialize map and add matching internship markers
  function initMap(internships) {
    const map = L.map("map").setView([39.8283, -98.5795], 4); // Centered on USA
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);
  
    internships.forEach(intern => {
      const location = intern["location"]?.toLowerCase();
      const coords = getCoordinatesForLocation(location);
  
      if (coords) {
        L.marker(coords)
          .addTo(map)
          .bindPopup(`<b>${intern["title"]}</b><br>${intern["location"]}`);
      }
    });
  }
  
  // Map city names to coordinates (mocked)
  function getCoordinatesForLocation(location) {
    if (location.includes("san francisco")) return [37.7749, -122.4194];
    if (location.includes("new york")) return [40.7128, -74.0060];
    if (location.includes("los angeles")) return [34.0522, -118.2437];
    if (location.includes("chicago")) return [41.8781, -87.6298];
    if (location.includes("seattle")) return [47.6062, -122.3321];
    if (location.includes("remote")) return null; // Don't map remote roles
    if (location.includes("austin")) return [30.2672, -97.7431];
    if (location.includes("boston")) return [42.3601, -71.0589];
    if (location.includes("houston")) return [29.7604, -95.3698];
    if (location.includes("philadelphia")) return [39.9526, -75.1652];
    if (location.includes("miami")) return [25.7617, -80.1918];
    if (location.includes("dallas")) return [32.7767, -96.7970];
    if (location.includes("denver")) return [39.7392, -104.9903];
    if (location.includes("atlanta")) return [33.7490, -84.3880];
    if (location.includes("san diego")) return [32.7157, -117.1611];
    if (location.includes("phoenix")) return [33.4484, -112.0740];
    if (location.includes("orlando")) return [28.5383, -81.3792];
    if (location.includes("portland")) return [45.5051, -122.6750];
    if (location.includes("las vegas")) return [36.1699, -115.1398];
    if (location.includes("san jose")) return [37.3382, -121.8863];
    if (location.includes("minneapolis")) return [44.9778, -93.2650];
    if (location.includes("nashville")) return [36.1627, -86.7816];
    if (location.includes("charlotte")) return [35.2271, -80.8431];
    if (location.includes("detroit")) return [42.3314, -83.0458];
    if (location.includes("washington")) return [38.9072, -77.0369];


    return null; // Unknown or unhandled location
  }