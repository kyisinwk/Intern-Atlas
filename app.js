// Save user input and go to the results page
function findInternships() {
  // Get form input values
  const interest = document.getElementById("interest").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const experience = document.getElementById("experience").value.toLowerCase();
  const gpa = parseFloat(document.getElementById("gpa").value) || 0;
  const payPref = document.getElementById("pay").value.toLowerCase();
  const resume = document.getElementById("resume").value;

  // Save to localStorage
  localStorage.setItem("interest", interest);
  localStorage.setItem("location", location);
  localStorage.setItem("experience", experience);
  localStorage.setItem("gpa", gpa);
  localStorage.setItem("payPref", payPref);
  localStorage.setItem("resume", resume);

  // Redirect to results page
  window.location.href = "results.html";
}