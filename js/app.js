/* ---------------- STATE ---------------- */

let currentLang = "en";
let currentTab = null;

/* ---------------- TAB CONFIG ---------------- */

const tabConfig = {
  basic: { en: "Basic Exercises", kn: "ಮೂಲ ಅಭ್ಯಾಸಗಳು" },
  varnas: { en: "Varnas", kn: "ವರ್ಣಗಳು" },
  mk: { en: "Madhyama Keerthana", kn: "ಮಧ್ಯಮ ಕಾಲ ಕೀರ್ತನೆ" },
  vk: { en: "Vilamba Keerthana", kn: "ವಿಲಂಬ ಕಾಲ ಕೀರ್ತನೆ" },
  tillana: { en: "Tillana", kn: "ತಿಲ್ಲಾನಾ" },
  devaranama: { en: "Devaranama", kn: "ದೇವರನಾಮ" },
  vachana: { en: "Vachana", kn: "ವಚನ" },
  composers: { en: "Composers", kn: "ಸಂಗೀತಗಾರರು" }
};

/* ---------------- INIT ---------------- */

function initTabs() {
  const nav = document.getElementById("tabs");
  nav.innerHTML = "";

  Object.keys(tabConfig).forEach(tab => {
    const btn = document.createElement("button");
    btn.className = "tab-btn px-3 py-1 bg-gray-700 rounded";
    btn.innerText = tabConfig[tab][currentLang];
    btn.onclick = (e) => loadTab(e, tab);
    nav.appendChild(btn);
  });
}

initTabs();

/* ---------------- LANGUAGE ---------------- */

function setLanguage(lang) {
  currentLang = lang;

  document.getElementById("title").innerText =
    lang === "en"
      ? "Carnatic Learning"
      : "ಕರ್ನಾಟಕ ಸಂಗೀತ ಕಲಿಕೆ";

  initTabs();

  if (currentTab) {
    loadTab(null, currentTab, true);
  }
}

/* ---------------- TAB LOAD ---------------- */

function loadTab(event, tab, isLangSwitch = false) {
  currentTab = tab;
  const content = document.getElementById("content");

  if (event) {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.remove("bg-indigo-600");
      btn.classList.add("bg-gray-700");
    });

    event.target.classList.remove("bg-gray-700");
    event.target.classList.add("bg-indigo-600");
  }

  if (tab === "basic") {
    content.innerHTML =
      exerciseSection("Sarali Varisai", "ಸರಳಿ ವರಿಸೈ") +
      exerciseSection("Jantai Varisai", "ಜಂಟೈ ವರಿಸೈ") +
      exerciseSection("Dhatu Varisai", "ಧಾಟು ವರಿಸೈ") +
      exerciseSection("Alankara", "ಅಲಂಕಾರ");
    
  } else
    content.innerHTML = `
      <div class="bg-gray-800 p-4 rounded">
        <h2 class="text-xl mb-2">${tabConfig[tab][currentLang]}</h2>
        <p>${translate("Content will be added here")}</p>
      </div>
    `;
  }
}

/* ---------------- EXERCISES ---------------- */

function exerciseSection(enTitle, knTitle) {
  const title = currentLang === "en" ? enTitle : knTitle;

  let html = `
    <div class="mb-6">
      <h3 class="text-xl mb-2">${title}</h3>
  `;

  for (let i = 1; i <= 7; i++) {
    html += `
      <div class="bg-gray-800 p-3 mb-2 rounded">
        <p>${translate("Exercise")} ${i}</p>
        <p class="text-sm text-gray-300">
          ${translate("Speed 1")} | ${translate("Speed 2")} | ${translate("Speed 3")}
        </p>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

/* ---------------- TRANSLATION ---------------- */

function translate(text) {
  if (currentLang === "en") return text;

  const kn = {
    "Exercise": "ಅಭ್ಯಾಸ",
    "Speed 1": "ವೇಗ ೧",
    "Speed 2": "ವೇಗ ೨",
    "Speed 3": "ವೇಗ ೩",
    "Content will be added here": "ಇಲ್ಲಿ ವಿಷಯ ಸೇರಲಾಗುತ್ತದೆ"
  };

  return kn[text] || text;
}
