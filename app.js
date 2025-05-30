function findInternships() {
    // 1. Get values from form
    const interest = document.getElementById("interest").value.toLowerCase();
    const location = document.getElementById("location").value.toLowerCase();
    const experience = document.getElementById("experience").value;
    const gpa = parseFloat(document.getElementById("gpa").value) || 0;
    const payPref = document.getElementById("payPref").value.toLowerCase();
    const resume = document.getElementById("resume").value;
  
    // 2. Sample dataset (normally you'd fetch this from a file or API)
    const internships = [
      {
        title: "Software Engineering Intern",
        field: "computer science",
        location: "remote",
        paid: "yes",
        experience: "beginner",
        gpa: 3.0,
        platform: "LinkedIn"
      },
      {
        title: "Marketing Assistant Intern",
        field: "business",
        location: "new york city",
        paid: "stipend",
        experience: "none",
        gpa: 2.5,
        platform: "Chegg Internships"
      },
      {
        title: "Data Analyst Intern",
        field: "statistics",
        location: "remote",
        paid: "yes",
        experience: "past internship",
        gpa: 3.5,
        platform: "Handshake"
      },
      {
        title: "Education Outreach Intern",
        field: "education",
        location: "los angeles",
        paid: "volunteer",
        experience: "beginner",
        gpa: 2.7,
        platform: "InternXL"
      }
    ];
  
    // 3. Filter based on inputs
    const matches = internships.filter(intern => {
      return (
        intern.field.includes(interest) &&
        (intern.location.includes(location) || location === "") &&
        (intern.experience === experience || experience === "none") &&
        intern.gpa <= gpa &&
        (payPref === "volunteer okay" || intern.paid === payPref)
      );
    });
  
    // 4. Display results
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = "";
  
    if (matches.length === 0) {
      resultsSection.innerHTML = "<p>No matching internships found. Try adjusting your filters.</p>";
    } else {
      matches.forEach(intern => {
        const card = document.createElement("div");
        card.innerHTML = `
          <h3>${intern.title}</h3>
          <p><strong>Field:</strong> ${intern.field}</p>
          <p><strong>Location:</strong> ${intern.location}</p>
          <p><strong>Experience Required:</strong> ${intern.experience}</p>
          <p><strong>Minimum GPA:</strong> ${intern.gpa}</p>
          <p><strong>Paid:</strong> ${intern.paid}</p>
          <p><strong>Platform:</strong> ${intern.platform}</p>
          <hr>
        `;
        resultsSection.appendChild(card);
      });
    }
  }