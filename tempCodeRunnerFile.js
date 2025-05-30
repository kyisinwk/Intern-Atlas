// Save user input and go to the results page
function findInternships() {
  // Get form input values
  const interest = document.getElementById("interest").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const experience = document.getElementById("experience").value.toLowerCase();
  const gpa = parseFloat(document.getElementById("gpa").value) || 0;
  const payPref = document.getElementById("pay").value.toLowerCase();
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
 