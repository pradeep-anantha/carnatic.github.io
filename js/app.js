// js/app.js

// ----------------------------
// Global State
// ----------------------------
const state = {
  lang: "en",
  currentTab: "basic"
};

// ----------------------------
// Tabs
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
  en: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "S"],
  kn: ["ಸ", "ರಿ₁", "ಗ₃", "ಮ₁", "ಪ", "ಧ₁", "ನಿ₃", "ಸ"]
};

// ----------------------------
// Translation
// ----------------------------
function t(key) {
  const dict = {
    Exercise: { en: "Exercise", kn: "ಅಭ್ಯಾಸ" },
    "Speed 1": { en: "Speed 1", kn: "ವೇಗ ೧" },
    "Speed 2": { en: "Speed 2", kn: "ವೇಗ ೨" },
    "Speed 3": { en: "Speed 3", kn: "ವೇಗ ೩" },
    "Sarali Varisai": { en: "Sarali Varisai", kn: "ಸರಳಿ ವರಿಸೈ" },
    "Content will be added here": {
      en: "Content will be added here",
      kn: "ಇಲ್ಲಿ ವಿಷಯ ಸೇರಲಾಗುತ್ತದೆ"
    }
  };
  return dict[key] ? dict[key][state.lang] : key;
}

// ----------------------------
// Sarali Varisai (Correct Structure)
// ----------------------------
function getSaraliExercises() {
  const s = SWARAS[state.lang];

  return [
    [[s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]]],

    [[s[0], s[1], s[2], s[3]], [s[1], s[2], s[3], s[4]], [s[2], s[3], s[4], s[5]], [s[3], s[4], s[5], s[6]], [s[4], s[5], s[6], s[7]]],

    [[s[0], s[1], s[0], s[1]], [s[1], s[2], s[1], s[2]], [s[2], s[3], s[2], s[3]], [s[3], s[4], s[3], s[4]], [s[4], s[5], s[4], s[5]], [s[5], s[6], s[5], s[6]], [s[6], s[7], s[6], s[7]]],

    [[s[0], s[1], s[2], s[3], s[0], s[1], s[2], s[3]], [s[4], s[5], s[6], s[7]]],

    [[s[0], s[2], s[1], s[3]], [s[1], s[3], s[2], s[4]], [s[2], s[4], s[3], s[5]], [s[3], s[5], s[4], s[6]], [s[4], s[6], s[5], s[7]]],

    [[s[0], s[1], s[2], s[1]], [s[1], s[2], s[3], s[2]], [s[2], s[3], s[4], s[3]], [s[3], s[4], s[5], s[4]], [s[4], s[5], s[6], s[5]], [s[5], s[6], s[7], s[6]]],

    [[s[0], s[1], s[2], s[3]], [s[3], s[2], s[1], s[0]], [s[1], s[2], s[3], s[4]], [s[4], s[3], s[2], s[1]], [s[2], s[3], s[4], s[5]], [s[5], s[4], s[3], s[2]]]
  ];
}

// ----------------------------
// Correct Speed Rendering
// ----------------------------
function generateSpeeds(lines) {
  return {
    speed1: lines.map(line => renderLine(line, 1)).join("\n"),
    speed2: lines.map(line => renderLine(line, 2)).join("\n"),
    speed3: lines.map(line => renderLine(line, 4)).join("\n")
  };
}

function renderLine(line, notesPerBeat) {
  let groups = [];

  for (let i = 0; i < line.length; i += notesPerBeat) {
    groups.push(line.slice(i, i + notesPerBeat).join(" "));
  }

  return applyAdiTala(groups);
}

// ----------------------------
// Adi Tala (4 + 2 + 2)
// ----------------------------
function applyAdiTala(groups) {
  const laghu = groups.slice(0, 4).join("   ");
  const d1 = groups.slice(4, 6).join("   ");
  const d2 = groups.slice(6, 8).join("   ");

  let line = "";

  if (laghu) line += laghu + " | ";
  if (d1) line += d1 + " | ";
  if (d2) line += d2 + " ||";

  return line.trim();
}

// ----------------------------
// Render Sarali
// ----------------------------
function renderSarali() {
  const exercises = getSaraliExercises();
  let html = `<div class="mb-8">
    <h2 class="text-xl font-bold mb-4">${t("Sarali Varisai")}</h2>
  `;

  exercises.forEach((lines, i) => {
    const speeds = generateSpeeds(lines);

    html += `
      <div class="bg-white p-4 mb-6 rounded-lg shadow border">

        <div class="font-bold mb-3">
          ${t("Exercise")} ${i + 1}
        </div>

        <div class="space-y-4 text-blue-700">

          <div>
            <div class="text-gray-500 text-sm">${t("Speed 1")}</div>
            <pre class="bg-gray-50 p-3 rounded font-mono overflow-x-auto">${speeds.speed1}</pre>
          </div>

          <div>
            <div class="text-gray-500 text-sm">${t("Speed 2")}</div>
            <pre class="bg-gray-50 p-3 rounded font-mono overflow-x-auto">${speeds.speed2}</pre>
          </div>

          <div>
            <div class="text-gray-500 text-sm">${t("Speed 3")}</div>
            <pre class="bg-gray-50 p-3 rounded font-mono overflow-x-auto">${speeds.speed3}</pre>
          </div>

        </div>

      </div>
    `;
  });

  html += `</div>`;
  return html;
}

// ----------------------------
// Main Render
// ----------------------------
function renderContent() {
  const content = document.getElementById("content");

  if (state.currentTab === "basic") {
    content.innerHTML = renderSarali();
  } else {
    content.innerHTML = `
      <div class="p-4 bg-white rounded shadow">
        ${t("Content will be added here")}
      </div>
    `;
  }
}

// ----------------------------
// Tabs
// ----------------------------
function initTabs() {
  const nav = document.getElementById("tabs");
  nav.innerHTML = "";

  tabs.forEach(tab => {
    const btn = document.createElement("button");

    btn.textContent = tab[state.lang];
    btn.className = `px-4 py-2 rounded ${
      state.currentTab === tab.id
        ? "bg-blue-500 text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`;

    btn.onclick = () => {
      state.currentTab = tab.id;
      renderContent();
      initTabs();
    };

    nav.appendChild(btn);
  });
}

// ----------------------------
// Language
// ----------------------------
function setLanguage(lang) {
  state.lang = lang;

  document.getElementById("title").textContent =
    lang === "en" ? "Carnatic Learning" : "ಕಾರ್ನಾಟಿಕ್ ಲರ್ನಿಂಗ್";

  initTabs();
  renderContent();
}

// ----------------------------
// Init
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-en").onclick = () => setLanguage("en");
  document.getElementById("btn-kn").onclick = () => setLanguage("kn");

  initTabs();
  renderContent();
});
