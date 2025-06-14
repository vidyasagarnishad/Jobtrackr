const jobForm = document.getElementById("jobForm");
const submitBtn = document.getElementById("submitBtn");
const jobsContainer = document.getElementById("jobsContainer");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let isEditing = false;
let editingIndex = null;

function renderJobs() {
  jobsContainer.innerHTML = "";
  jobs.forEach((job, index) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.innerHTML = `
      <h3>${job.company} - ${job.role}</h3>
      <p>Status: ${job.status}</p>
      <a href="${job.link}" target="_blank">View Job</a><br>
      <button onclick="editJob(${index})">Edit</button>
      <button onclick="deleteJob(${index})">Delete</button>
    `;
    jobsContainer.appendChild(jobCard);
  });
}

function resetForm() {
  jobForm.reset();
  isEditing = false;
  editingIndex = null;
  submitBtn.textContent = "Add Job";
}

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const link = document.getElementById("link").value;
  const status = document.getElementById("status").value;

  if (isEditing) {
    jobs[editingIndex] = { company, role, link, status };
  } else {
    jobs.push({ company, role, link, status });
  }

  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
  resetForm();
});

function editJob(index) {
  const job = jobs[index];
  document.getElementById("company").value = job.company;
  document.getElementById("role").value = job.role;
  document.getElementById("link").value = job.link;
  document.getElementById("status").value = job.status;

  isEditing = true;
  editingIndex = index;
  submitBtn.textContent = "Update Job";
}

function deleteJob(index) {
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
}

renderJobs();



const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

// Update renderJobs to accept search/filter values
function renderJobs(searchTerm = "", filter = "All") {
  jobsContainer.innerHTML = "";

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm) ||
                          job.role.toLowerCase().includes(searchTerm);
    const matchesFilter = filter === "All" || job.status === filter;
    return matchesSearch && matchesFilter;
  });

  filteredJobs.forEach((job, index) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.innerHTML = `
      <h3>${job.company} - ${job.role}</h3>
      <p>Status: ${job.status}</p>
      <a href="${job.link}" target="_blank">View Job</a><br>
      <button onclick="editJob(${index})">Edit</button>
      <button onclick="deleteJob(${index})">Delete</button>
    `;
    jobsContainer.appendChild(jobCard);
  });
}

// Event listeners for search and filter
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedStatus = filterStatus.value;
  renderJobs(searchTerm, selectedStatus);
});

filterStatus.addEventListener("change", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedStatus = filterStatus.value;
  renderJobs(searchTerm, selectedStatus);
});
