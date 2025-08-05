// Sample data
let jobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        salary: "$80k - $120k",
        category: "development",
        description: "Looking for an experienced frontend developer to join our team. Must have React and TypeScript experience."
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "Design Studio",
        location: "New York, NY",
        salary: "$70k - $90k",
        category: "design",
        description: "Creative designer needed for web and mobile applications. Portfolio required."
    }
];

let profiles = [
    {
        id: 1,
        name: "John Smith",
        title: "Full Stack Developer",
        category: "development",
        bio: "5+ years experience in React, Node.js, and Python. Passionate about clean code and user experience.",
        portfolio: "https://johnsmith.dev",
        experience: "5 years"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        title: "Graphic Designer",
        category: "design",
        bio: "Creative designer specializing in brand identity and digital marketing materials.",
        portfolio: "https://sarahdesigns.com",
        experience: "3 years"
    }
];

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'jobs') renderJobs();
    if (sectionId === 'profiles') renderProfiles();
}

// Job posting
document.querySelector('.job-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select, textarea');
    
    const jobData = {
        title: inputs[0].value,
        company: inputs[1].value,
        category: inputs[2].value,
        location: inputs[3].value,
        salary: inputs[4].value,
        description: inputs[5].value,
        requirements: inputs[6].value
    };
    
    try {
        const response = await fetch('/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });
        const result = await response.json();
        alert(result.message);
        e.target.reset();
    } catch (error) {
        alert('Error posting job');
    }
});

// Profile creation
document.querySelector('.profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, select, textarea');
    
    const newProfile = {
        id: profiles.length + 1,
        name: inputs[0].value,
        title: inputs[2].value,
        category: inputs[3].value,
        bio: inputs[4].value,
        experience: inputs[5].value,
        portfolio: inputs[6].value
    };
    
    profiles.push(newProfile);
    e.target.reset();
    alert('Profile created successfully!');
});

// Render jobs
function renderJobs() {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company}</div>
            <div class="job-location">📍 ${job.location}</div>
            <div class="job-salary">💰 ${job.salary}</div>
            <div class="job-category">${job.category}</div>
            <div class="job-description">${job.description}</div>
            <button class="apply-btn" onclick="applyToJob(${job.id})">Apply Now</button>
        </div>
    `).join('');
}

// Render profiles
function renderProfiles() {
    const profileList = document.getElementById('profile-list');
    const categoryFilter = document.getElementById('category-filter').value;
    
    const filteredProfiles = categoryFilter 
        ? profiles.filter(profile => profile.category === categoryFilter)
        : profiles;
    
    profileList.innerHTML = filteredProfiles.map(profile => `
        <div class="profile-card">
            <div class="profile-name">${profile.name}</div>
            <div class="profile-title">${profile.title}</div>
            <div class="profile-category">${profile.category}</div>
            <div class="profile-bio">${profile.bio}</div>
            <div style="margin: 1rem 0;">
                <strong>Experience:</strong> ${profile.experience}
            </div>
            ${profile.portfolio ? `<a href="${profile.portfolio}" target="_blank" class="portfolio-link">View Portfolio →</a>` : ''}
            <div style="margin-top: 1rem;">
                <button class="contact-btn" onclick="contactTalent(${profile.id})">Contact</button>
            </div>
        </div>
    `).join('');
}

// Filter profiles
document.getElementById('category-filter').addEventListener('change', renderProfiles);

// Actions
function applyToJob(jobId) {
    alert(`Application submitted for job ID: ${jobId}`);
}

function contactTalent(profileId) {
    alert(`Contact request sent to profile ID: ${profileId}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderJobs();
});
