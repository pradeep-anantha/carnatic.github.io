// js/app.js

// ----------------------------
// Global State
// ----------------------------
const state = {
  lang: "en",
  currentTab: "basic"
};

// ----------------------------
// Tabs Configuration
// ----------------------------
const tabs = [
  { id: "basic", en: "Basic Exercises", kn: "ಮೂಲ ಅಭ್ಯಾಸಗಳು" },
  { id: "varnas", en: "Varnas", kn: "ವರಣಗಳು" },
  { id: "madhyama", en: "Madhyama Keerthana", kn: "ಮಧ್ಯಮ ಕೀರ್ತನೆಗಳು" },
  { id: "vilamba", en: "Vilamba Keerthana", kn: "ವಿಲಂಬ ಕೀರ್ತನೆಗಳು" },
  { id: "tillana", en: "Tillana", kn: "ತಿಲ್ಲಾನಾ" },
  { id: "devaranama", en: "Devaranama", kn: "ದೇವರನಾಮ" },
  { id: "vachana", en: "Vachana", kn: "ವಚನ" },
  { id: "composers", en: "Composers", kn: "ಸಂಗೀತಗಾರರು" }
];

// ----------------------------
// Swaras (Mayamalavagowla)
// ----------------------------
const SWARAS = {
  en: ["S", "R1", "G3", "M1", "P", "D1", "N3", "S"],
  kn: ["ಸ", "ರಿ₁", "ಗ₃", "ಮ₁", "ಪ", "ಧ₁", "ನಿ₃", "ಸ"]
};

// ----------------------------
// Translation Helper
// ----------------------------
function t(key) {
  const dict = {
    Exercise: { en: "Exercise", kn: "ಅಭ್ಯಾಸ" },
    "Speed 1": { en: "Speed 1", kn: "ವೇಗ ೧" },
    "Speed 2": { en: "Speed 2", kn: "ವೇಗ ೨" },
    "Speed 3": { en: "Speed 3", kn: "ವೇಗ ೩" },
    "Content will be added here": {
      en: "Content will be added here",
      kn: "ಇಲ್ಲಿ ವಿಷಯ ಸೇರಲಾಗುತ್ತದೆ"
    }
  };
  return dict[key][state.lang];
}

// ----------------------------
// Sarali Varisai Generator
// ----------------------------
function generateSaraliExercises() {
  const sw = SWARAS[state.lang];

  return [
    [sw[0], sw[1], sw[2], sw[3], sw[4], sw[5], sw[6], sw[7]],
    [sw[1], sw[2], sw[3], sw[4], sw[5], sw[6], sw[7], sw[0]],
    [sw[2], sw[3], sw[4], sw[5], sw[6], sw[7], sw[0], sw[1]],
    [sw[3], sw[4], sw[5], sw[6], sw[7], sw[0], sw[1], sw[2]],
    [sw[4], sw[5], sw[6], sw[7], sw[0], sw[1], sw[2], sw[3]],
    [sw[5], sw[6], sw[7], sw[0], sw[1], sw[2], sw[3], sw[4]],
    [sw[6], sw[7], sw[0], sw[1], sw[2], sw[3], sw[4], sw[5]]
  ];
}

// ----------------------------
// Speed Generator (Carnatic Correct)
// ----------------------------
function generateSpeeds(pattern) {
  return {
    speed1: formatSpeed(pattern, 1),
    speed2: formatSpeed(pattern, 2),
    speed3: formatSpeed(pattern, 4)
  };
}

function formatSpeed(pattern, notesPerBeat) {
  let output = [];

  for (let i = 0; i < pattern.length; i += notesPerBeat) {
    const group = pattern.slice(i, i + notesPerBeat);
    output.push(group.join(" "));
  }

  return output.join("   "); // spacing between beats
}

// ----------------------------
// Exercise Section Renderer
// ----------------------------
function exerciseSection(enTitle, knTitle, type) {
  let html = `
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">
        ${state.lang === "en" ? enTitle : knTitle}
      </h2>
  `;

  let exercises = [];

  if (type === "sarali") {
    exercises = generateSaraliExercises();
  } else {
    exercises = Array(7).fill(["..."]);
  }

  exercises.forEach((pattern, index) => {
    const speeds = generateSpeeds(pattern);

    html += `
      <div class="bg-white p-4 mb-4 rounded-lg shadow-sm border">
        
        <div class="font-semibold text-md mb-2">
          ${t("Exercise")} ${index + 1}
        </div>

        <div class="space-y-3 font-mono text-lg text-blue-700 leading-relaxed">

          <div>
            <span class="text-gray-500 text-sm">${t("Speed 1")}:</span><br/>
            ${speeds.speed1}
          </div>

          <div>
            <span class="text-gray-500 text-sm">${t("Speed 2")}:</span><br/>
            ${speeds.speed2}
          </div>

          <div>
            <span class="text-gray-500 text-sm">${t("Speed 3")}:</span><br/>
            ${speeds.speed3}
          </div>

        </div>

      </div>
    `;
  });

  html += `</div>`;
  return html;
}

// ----------------------------
// Render Content
// ----------------------------
function renderContent() {
  const content = document.getElementById("content");

  if (state.currentTab === "basic") {
    content.innerHTML =
      exerciseSection("Sarali Varisai", "ಸರಳಿ ವರಿಸೈ", "sarali") +
      exerciseSection("Jantai Varisai", "ಜಂಟೈ ವರಿಸೈ", "jantai") +
      exerciseSection("Dhatu Varisai", "ಧಾಟು ವರಿಸೈ", "dhatu") +
      exerciseSection("Alankara", "ಅಲಂಕಾರ", "alankara");
  } else {
    content.innerHTML = `
      <div class="p-4 bg-white rounded shadow">
        ${t("Content will be added here")}
      </div>
    `;
  }
}

// ----------------------------
// Tabs Initialization
// ----------------------------
function initTabs() {
  const tabContainer = document.getElementById("tabs");
  tabContainer.innerHTML = "";

  tabs.forEach(tab => {
    const btn = document.createElement("button");

    btn.textContent = tab[state.lang];

    btn.className = `
      px-4 py-2 rounded-md text-sm font-medium
      ${
        state.currentTab === tab.id
          ? "bg-blue-500 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }
    `;

    btn.addEventListener("click", () => loadTab(tab.id));

    tabContainer.appendChild(btn);
  });
}

// ----------------------------
// Tab Switch
// ----------------------------
function loadTab(tabId) {
  state.currentTab = tabId;
  renderContent();
  initTabs();
}

// ----------------------------
// Language Switch
// ----------------------------
function setLanguage(lang) {
  state.lang = lang;

  document.getElementById("title").textContent =
    lang === "en" ? "Carnatic Learning" : "ಕಾರ್ನಾಟಿಕ್ ಲರ್ನಿಂಗ್";

  document.getElementById("btn-en").className =
    lang === "en"
      ? "px-3 py-1 rounded bg-white text-blue-600 font-semibold"
      : "px-3 py-1 rounded bg-blue-500 text-white";

  document.getElementById("btn-kn").className =
    lang === "kn"
      ? "px-3 py-1 rounded bg-white text-blue-600 font-semibold"
      : "px-3 py-1 rounded bg-blue-500 text-white";

  initTabs();
  renderContent();
}

// ----------------------------
// Init App
// ----------------------------
document
  .getElementById("btn-en")
  .addEventListener("click", () => setLanguage("en"));

document
  .getElementById("btn-kn")
  .addEventListener("click", () => setLanguage("kn"));

initTabs();
renderContent();
