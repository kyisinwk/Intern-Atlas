let jobs = [];

fetch("jobs.json")
  .then(res => res.json())
  .then(data => jobs = data)
  .catch(err => console.error("Error loading JSON:", err));

function filterJobs() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = "";

  const filtered = jobs.filter(job =>
    Object.values(job).some(value =>
      String(value).toLowerCase().includes(keyword)
    )
  );

  if (filtered.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  filtered.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
      <p><strong>Title:</strong> ${job.job_title}</p>
      <p><strong>Field:</strong> ${job.sector || "Not specified"}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Paid:</strong> ${job.salary || "Not specified"}</p>
      <p><strong>Experience:</strong> Not specified</p>
      <p><strong>Minimum GPA:</strong> Not specified</p>
      <p><strong>Platform:</strong> ${job.job_board}</p>
      <p><a href="${job.page_url}" target="_blank">View Job</a></p>
      <hr>
    `;
    results.appendChild(div);
  });
}
