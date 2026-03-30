const conditions = [
  {
    name: "HIV/AIDS",
    category: "Infectious disease",
    symptoms: "Fever, fatigue, weight loss, recurrent infections",
    prevention: "Testing, safe sex practices, education, early treatment",
    href: "conditions/hiv-aids.html"
  },
  {
    name: "Tuberculosis",
    category: "Respiratory infection",
    symptoms: "Persistent cough, fever, night sweats, weight loss",
    prevention: "Early screening, treatment adherence, public health support",
    href: "conditions/tuberculosis.html"
  },
  {
    name: "Malaria",
    category: "Mosquito-borne disease",
    symptoms: "Fever, chills, headache, nausea",
    prevention: "Mosquito nets, repellents, prompt treatment",
    href: "conditions/malaria.html"
  },
  {
    name: "Cardiovascular disease",
    category: "Chronic disease",
    symptoms: "Chest pain, shortness of breath, dizziness, fatigue",
    prevention: "Exercise, heart-healthy diet, blood pressure care",
    href: "conditions/cardiovascular-disease.html"
  },
  {
    name: "Cancer",
    category: "Chronic disease",
    symptoms: "Unusual lumps, unexplained weight loss, persistent pain",
    prevention: "Screenings, avoiding tobacco, early evaluation",
    href: "conditions/cancer.html"
  },
  {
    name: "Diabetes",
    category: "Metabolic disease",
    symptoms: "Increased thirst, fatigue, frequent urination, blurred vision",
    prevention: "Healthy eating, exercise, monitoring, regular checkups",
    href: "conditions/diabetes.html"
  },
  {
    name: "Hypertension",
    category: "Chronic illness",
    symptoms: "Often silent, but may include headaches, dizziness, or vision changes",
    prevention: "Routine screening, reducing salt intake, exercise, regular care",
    href: "conditions/hypertension.html"
  },
  {
    name: "Asthma",
    category: "Chronic respiratory illness",
    symptoms: "Wheezing, coughing, chest tightness, shortness of breath",
    prevention: "Trigger control, inhaler access, regular monitoring",
    href: "conditions/asthma.html"
  },
  {
    name: "Maternal and neonatal health",
    category: "Care pathway",
    symptoms: "High-risk pregnancy signs, bleeding, fever, newborn distress",
    prevention: "Prenatal care, skilled birth support, postnatal check-ins",
    href: "conditions/maternal-neonatal-health.html"
  },
  {
    name: "Flu and common illnesses",
    category: "Common conditions",
    symptoms: "Fever, cough, sore throat, congestion, tiredness",
    prevention: "Vaccines, rest, hydration, hygiene",
    href: "conditions/common-illnesses.html"
  }
];

const locationSummaries = {
  kenya: {
    sourceLabel: "CDC traveler guidance | reviewed February 19, 2026",
    title: "Quick summary for Kenya",
    bullets: [
      "Malaria prevention matters in most areas below 2,500 meters, with Nairobi's highly urbanized center treated differently.",
      "CDC flags measles as a global travel concern and recommends travelers be fully vaccinated before international travel.",
      "Meningococcal vaccination is recommended for travel into Kenyan areas that are part of the meningitis belt during the dry season.",
      "Mosquito-borne illnesses like dengue and Zika, plus exposures such as Rift Valley fever and leptospirosis, are also worth checking."
    ]
  },
  india: {
    sourceLabel: "CDC traveler guidance | reviewed February 19, 2026",
    title: "Quick summary for India",
    bullets: [
      "CDC notes malaria risk across much of India, including Mumbai and New Delhi, but not in several higher-elevation regions above 2,000 meters.",
      "A rabies-related travel notice appears on the India traveler page, alongside the broader global measles alert.",
      "Travelers should review bug-bite precautions carefully because mosquito-borne illness remains important in many regions.",
      "Vaccination review before travel matters, especially for measles and routine immunizations."
    ]
  },
  nigeria: {
    sourceLabel: "CDC traveler guidance | reviewed February 19, 2026",
    title: "Quick summary for Nigeria",
    bullets: [
      "CDC lists a Level 2 notice tied to global polio and also highlights an ongoing diphtheria outbreak in several Nigerian states.",
      "Malaria prevention is recommended broadly, with CDC advising travelers to carry and complete chemoprophylaxis.",
      "Measles remains a worldwide travel concern, so vaccination status should be checked before travel.",
      "Nigeria summaries should prioritize vaccination readiness, malaria prevention, and outbreak awareness."
    ]
  },
  peru: {
    sourceLabel: "CDC traveler guidance | reviewed February 19, 2026",
    title: "Quick summary for Peru",
    bullets: [
      "CDC highlights Oropouche activity in the Americas and the global measles alert on Peru's traveler page.",
      "Malaria risk is mainly in areas east of the Andes below 2,500 meters, including Iquitos and Puerto Maldonado, while Lima and highland tourist areas are different.",
      "Yellow fever vaccine recommendations depend heavily on elevation and region, so destination details matter.",
      "Bug-bite protection is especially important because dengue, Zika, and other vector-borne illnesses are part of the exposure picture."
    ]
  },
  brazil: {
    sourceLabel: "CDC traveler guidance | reviewed from current traveler notices",
    title: "Quick summary for Brazil",
    bullets: [
      "CDC flags Oropouche activity in the Americas and the ongoing global measles concern on Brazil-related traveler guidance.",
      "Brazil travel health context often centers on mosquito-borne illness, so dengue-style precautions remain important.",
      "Vaccination review before travel is still important, especially for measles and destination-specific recommendations like yellow fever where applicable.",
      "Search local outbreak news as well because regional risk can differ a lot across Brazil."
    ]
  }
};

const emergencyKeywords = [
  "chest pain",
  "trouble breathing",
  "difficulty breathing",
  "shortness of breath",
  "passed out",
  "fainted",
  "seizure",
  "severe bleeding",
  "stroke",
  "suicidal"
];

const symptomRules = [
  {
    match: ["cough", "fever", "night sweats"],
    causes: ["Tuberculosis", "Flu or another respiratory infection"],
    apollo:
      "Apollo recommends seeking a medical evaluation soon, especially if the cough has lasted more than a few days or you have weight loss."
  },
  {
    match: ["fever", "chills"],
    causes: ["Malaria", "Flu", "Another infection"],
    apollo:
      "Apollo recommends rest, hydration, and urgent evaluation if you have traveled in a malaria-risk area or symptoms are worsening."
  },
  {
    match: ["chest pain"],
    causes: ["Cardiovascular disease", "A serious breathing or circulation issue"],
    apollo:
      "Apollo recommends immediate emergency care for chest pain, especially if it is sudden, severe, or paired with shortness of breath."
  },
  {
    match: ["thirst", "frequent urination", "blurred vision"],
    causes: ["Diabetes", "Blood sugar imbalance"],
    apollo:
      "Apollo recommends scheduling a medical visit for testing and drinking water while monitoring for worsening symptoms."
  },
  {
    match: ["rash", "itching", "blisters"],
    causes: ["Chickenpox", "Skin irritation or another viral illness"],
    apollo:
      "Apollo recommends avoiding scratching, monitoring fever, and contacting a clinician if the rash is spreading quickly or looks infected."
  }
];

const conditionResults = document.querySelector("#condition-results");
const searchInput = document.querySelector("#condition-search");
const symptomForm = document.querySelector("#symptom-form");
const symptomsField = document.querySelector("#symptoms");
const ageRangeField = document.querySelector("#age-range");
const durationField = document.querySelector("#duration");
const severityField = document.querySelector("#severity");
const photoUpload = document.querySelector("#photo-upload");
const photoPreview = document.querySelector("#photo-preview");
const previewImage = document.querySelector("#preview-image");
const summaryState = document.querySelector("#summary-state");
const summaryOutput = document.querySelector("#summary-output");
const urgencyBanner = document.querySelector("#urgency-banner");
const possibleCauses = document.querySelector("#possible-causes");
const apolloGuidance = document.querySelector("#apollo-guidance");
const exploreLocationInput = document.querySelector("#explore-location");
const exploreLocationResults = document.querySelector("#explore-location-results");
const applyLocationInput = document.querySelector("#apply-location");
const applyLocationResults = document.querySelector("#apply-location-results");

function renderConditions(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = conditions.filter((condition) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      condition.name.toLowerCase().includes(normalizedQuery) ||
      condition.category.toLowerCase().includes(normalizedQuery) ||
      condition.symptoms.toLowerCase().includes(normalizedQuery)
    );
  });

  conditionResults.innerHTML = filtered
    .map(
      (condition) => `
        <a class="condition-card condition-link" href="${condition.href}">
          <p class="condition-meta">${condition.category}</p>
          <h4>${condition.name}</h4>
          <p><strong>Symptoms:</strong> ${condition.symptoms}</p>
          <p><strong>Prevention:</strong> ${condition.prevention}</p>
          <p class="condition-cta">Open detailed page</p>
        </a>
      `
    )
    .join("");

  if (!filtered.length) {
    conditionResults.innerHTML = `
      <article class="condition-card">
        <h4>No exact matches yet</h4>
        <p>Try searching for a symptom, disease name, or category like "infection" or "maternal".</p>
      </article>
    `;
  }
}

function renderLocationResults(query, container, mode) {
  if (!container) {
    return;
  }

  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    container.innerHTML = `
      <article class="location-result-card">
        <p class="condition-meta">${mode}</p>
        <h4>Enter a location to search current health information</h4>
        <p>Search by country, state, or region to open outbreak news, travel notices, and local exposure context.</p>
      </article>
    `;
    return;
  }

  const encoded = encodeURIComponent(normalizedQuery);
  const summary = locationSummaries[normalizedQuery.toLowerCase()];

  const summaryMarkup = summary
    ? `
      <div class="location-summary">
        <p class="condition-meta">${summary.sourceLabel}</p>
        <h4>${summary.title}</h4>
        <ul class="clean-list">
          ${summary.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
      </div>
    `
    : `
      <div class="location-summary">
        <p class="condition-meta">Live search summary</p>
        <h4>Search current outbreak information for ${normalizedQuery}</h4>
        <p>Use the links below to quickly check recent outbreak news, travel notices, and public-health updates for this area.</p>
      </div>
    `;

  container.innerHTML = `
    <article class="location-result-card">
      <p class="condition-meta">${mode}</p>
      ${summaryMarkup}
      <div class="location-link-list">
        <a class="location-link-pill" href="https://news.google.com/search?q=${encoded}%20outbreak%20health" target="_blank" rel="noreferrer">Google News</a>
        <a class="location-link-pill" href="https://www.google.com/search?q=${encoded}%20outbreak%20WHO%20CDC" target="_blank" rel="noreferrer">Web search</a>
        <a class="location-link-pill" href="https://www.google.com/search?q=site%3Acdc.gov%20${encoded}%20travel%20health%20notice" target="_blank" rel="noreferrer">CDC notices</a>
        <a class="location-link-pill" href="https://www.google.com/search?q=site%3Awho.int%20${encoded}%20disease%20outbreak%20news" target="_blank" rel="noreferrer">WHO updates</a>
      </div>
    </article>
  `;
}

function getUrgency(symptomsText, severity, duration, ageRange) {
  if (emergencyKeywords.some((keyword) => symptomsText.includes(keyword))) {
    return {
      level: "Emergency",
      className: "urgency-emergency",
      message: "Seek immediate medical care now."
    };
  }

  if (
    severity === "severe" ||
    duration === "weeks" ||
    duration === "long-term" ||
    ((ageRange === "infant" || ageRange === "older-adult") && severity === "moderate")
  ) {
    return {
      level: "See a doctor soon",
      className: "urgency-soon",
      message: "Arrange medical care within 24 to 48 hours if possible."
    };
  }

  return {
    level: "Self-care and monitor",
    className: "urgency-self",
    message: "Use self-care, rest, and monitor symptoms closely."
  };
}

function getPossibleCauses(symptomsText, ageRange) {
  const matches = symptomRules.filter((rule) =>
    rule.match.some((fragment) => symptomsText.includes(fragment))
  );

  if (!matches.length) {
    const ageContext =
      ageRange === "infant" || ageRange === "child"
        ? " Younger age groups can need earlier review if symptoms persist."
        : ageRange === "older-adult"
          ? " Older adults may need earlier medical review because complication risk can be higher."
          : "";

    return {
      causes: ["Common viral illness", "A mild infection", "A condition that needs professional evaluation"],
      apollo:
        `Apollo recommends tracking your symptoms, resting, staying hydrated, and seeking care if anything gets worse or feels unusual.${ageContext}`
    };
  }

  const causes = [...new Set(matches.flatMap((rule) => rule.causes))];
  const ageContext =
    ageRange === "infant" || ageRange === "child"
      ? " Because this age range can be more sensitive to symptoms, earlier medical review may be helpful."
      : ageRange === "older-adult"
        ? " Because older adults can have higher complication risk, don't wait too long to seek medical care."
        : "";

  return {
    causes,
    apollo: `${matches[0].apollo}${ageContext}`
  };
}

searchInput.addEventListener("input", (event) => {
  renderConditions(event.target.value);
});

if (exploreLocationInput) {
  exploreLocationInput.addEventListener("input", (event) => {
    renderLocationResults(event.target.value, exploreLocationResults, "Explore area profile");
  });
}

if (applyLocationInput) {
  applyLocationInput.addEventListener("input", (event) => {
    renderLocationResults(event.target.value, applyLocationResults, "Apply area profile");
  });
}

photoUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;

  if (!file) {
    photoPreview.hidden = true;
    previewImage.removeAttribute("src");
    return;
  }

  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    previewImage.src = fileReader.result;
    photoPreview.hidden = false;
  });
  fileReader.readAsDataURL(file);
});

symptomForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const symptomsText = symptomsField.value.trim().toLowerCase();
  const ageRange = ageRangeField.value;
  const severity = severityField.value;
  const duration = durationField.value;

  const urgency = getUrgency(symptomsText, severity, duration, ageRange);
  const guidance = getPossibleCauses(symptomsText, ageRange);

  urgencyBanner.className = `urgency-banner ${urgency.className}`;
  urgencyBanner.textContent = `${urgency.level}: ${urgency.message}`;
  possibleCauses.innerHTML = guidance.causes.map((cause) => `<li>${cause}</li>`).join("");
  apolloGuidance.textContent = guidance.apollo;

  summaryState.hidden = true;
  summaryOutput.hidden = false;
});

renderConditions();
renderLocationResults("", exploreLocationResults, "Explore area profile");
renderLocationResults("", applyLocationResults, "Apply area profile");
