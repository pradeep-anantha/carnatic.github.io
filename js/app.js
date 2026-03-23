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
  { id: "basic", en: "Basic Exercises", kn: "ಮೂಲ ಅಭ್ಯಾಸಗಳು" }
];

// ----------------------------
// Swaras (Mayamalavagowla)
// ----------------------------
const SWARAS = {
  en: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "S"],
  kn: ["ಸ", "ರಿ₁", "ಗ₃", "ಮ₁", "ಪ", "ಧ₁", "ನಿ₃", "ಸ"]
};

// ----------------------------
// Raga Data
// ----------------------------
const RAGA = {
  en: {
    name: "Mayamalavagowla",
    arohana: ["S", "R₁", "G₃", "M₁", "P", "D₁", "N₃", "S"],
    avarohana: ["S", "N₃", "D₁", "P", "M₁", "G₃", "R₁", "S"]
  },
  kn: {
    name: "ಮಾಯಾಮಾಳವಗೌಳ",
    arohana: ["ಸ", "ರಿ₁", "ಗ₃", "ಮ₁", "ಪ", "ಧ₁", "ನಿ₃", "ಸ"],
    avarohana: ["ಸ", "ನಿ₃", "ಧ₁", "ಪ", "ಮ₁", "ಗ₃", "ರಿ₁", "ಸ"]
  }
};

// ----------------------------
// Translation
// ----------------------------
function t(key) {
  const dict = {
    "Speed 1": { en: "Speed 1", kn: "ವೇಗ ೧" },
    "Speed 2": { en: "Speed 2", kn: "ವೇಗ ೨" },
    "Speed 3": { en: "Speed 3", kn: "ವೇಗ ೩" },
    "Arohana": { en: "Arohana", kn: "ಆರೋಹಣ" },
    "Avarohana": { en: "Avarohana", kn: "ಅವರೋಹಣ" }
  };
  return dict[key][state.lang];
}

// ----------------------------
// Speed Engine (Correct)
// ----------------------------
function generateSpeeds(sequence) {
  return {
    speed1: render(sequence, 1),
    speed2: render(sequence, 2),
    speed3: render(sequence, 4)
  };
}

function render(seq, notesPerBeat) {
  let groups = [];

  for (let i = 0; i < seq.length; i += notesPerBeat) {
    groups.push(seq.slice(i, i + notesPerBeat).join(" "));
  }

  return applyTala(groups);
}

// ----------------------------
// Adi Tala (4 + 2 + 2)
// ----------------------------
function applyTala(groups) {
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
// Render Raga
// ----------------------------
function renderRaga() {
  const r = RAGA[state.lang];

  const aroSpeeds = generateSpeeds(r.arohana);
  const avaSpeeds = generateSpeeds(r.avarohana);

  return `
    <div class="bg-white p-5 rounded-lg shadow border space-y-6">

      <div class="text-2xl font-bold">${r.name}</div>

      <!-- AROHANA -->
      <div>
        <div class="font-semibold mb-2">${t("Arohana")}</div>

        ${renderSpeedBlock(aroSpeeds)}
      </div>

      <!-- AVAROHANA -->
      <div>
        <div class="font-semibold mb-2">${t("Avarohana")}</div>

        ${renderSpeedBlock(avaSpeeds)}
      </div>

    </div>
  `;
}

// ----------------------------
// Speed Block UI
// ----------------------------
function renderSpeedBlock(speeds) {
  return `
    <div class="space-y-3 text-blue-700">

      <div>
        <div class="text-sm text-gray-500">${t("Speed 1")}</div>
        <pre class="bg-gray-50 p-3 rounded font-mono">${speeds.speed1}</pre>
      </div>

      <div>
        <div class="text-sm text-gray-500">${t("Speed 2")}</div>
        <pre class="bg-gray-50 p-3 rounded font-mono">${speeds.speed2}</pre>
      </div>

      <div>
        <div class="text-sm text-gray-500">${t("Speed 3")}</div>
        <pre class="bg-gray-50 p-3 rounded font-mono">${speeds.speed3}</pre>
      </div>

    </div>
  `;
}

// ----------------------------
// Render Content
// ----------------------------
function renderContent() {
  const content = document.getElementById("content");
  content.innerHTML = renderRaga();
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
    btn.className = "px-4 py-2 rounded bg-blue-500 text-white";

    nav.appendChild(btn);
  });
}

// ----------------------------
// Language Switch
// ----------------------------
function setLanguage(lang) {
  state.lang = lang;

  document.getElementById("title").textContent =
    lang === "en" ? "Carnatic Learning" : "ಕಾರ್ನಾಟಿಕ್ ಲರ್ನಿಂಗ್";

  renderContent();
  initTabs();
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
