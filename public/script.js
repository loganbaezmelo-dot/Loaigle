// Keep track of any active Zerg Rush intervals so they don't stack up
let activeZergRush = null;

// 🔐 MATRIX LAYOUT GATE CONTROLLER STATS: "login" | "guest" | "authenticated"
let currentSystemSessionState = "login";

// Locks out structural overlays while tokens resolve asynchronously on phone engines
let isFirebaseInitializing = true;

// The canonical master blueprint text block utilized across both viewport layouts
const masterGuideHTML = `
    <div class="konami-guide-container" id="loaigle-system-guide">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3c4043; padding-bottom: 10px; margin-bottom: 15px;">
            <h2 style="color: #34a853; margin: 0; font-size: 20px; font-family: monospace;">🎮 LOAIGLE SYSTEM MANIFEST</h2>
            <button onclick="deleteFromBrowserStorage()" style="background: #ef4444; color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: bold; cursor: pointer;">Hide Guide</button>
        </div>
        
        <div class="guide-section">
            <h3>✨ Active Animation Drivers</h3>
            <p>• <strong>"do a barrel roll"</strong> (or spin variations) - Forces full 360-degree CSS viewport rotation alongside an automated real-time text scrambling algorithm matrix.</p>
            <p>• <strong>"tilt" / "askew"</strong> - Locks the core browser axis parameters onto a fixed, permanent 4.5-degree slant profile.</p>
            <p>• <strong>"67" / "wobble"</strong> - Initiates an infinite loop alternate keyframe layout simulation that rhythmically vibrates the interface glass.</p>
        </div>

        <div class="guide-section">
            <h3>🕵️‍♂️ Core Threat Mitigation Systems</h3>
            <p>• <strong>"zerg rush"</strong> (or direct string smash failures) - Triggers the automated destruction array. Rains localized alpha characters from the document roof that systematically dissolve and delete elements from the screen layout graph.</p>
        </div>

        <div class="guide-section">
            <h3>📜 Integrated Corporate Lore Routes</h3>
            <p>• <strong>"google" / "toogle"</strong> - Injects custom layout reference components mapping the accidental history of the mobile fat-finger deployment event that permanently altered corporate naming architecture conventions.</p>
        </div>

        <div class="guide-section">
            <h3>💻 Standalone HTML Sandbox Pro Suite</h3>
            <p>• <strong>Raw Data Strings (&lt;html&gt;, &lt;!DOCTYPE&gt;)</strong> - Bypasses standard server proxies to manifest a 100% unnerfed components theater card. Features a client-side <code>localStorage</code> database sync utility designed explicitly to test or persistently lock custom theme templates, design styles, and skin textures directly into the system boot cycle.</p>
        </div>
    </div>
`;

// ⚙️ SETTINGS PANEL NAVIGATION CONTROLS
function toggleSettingsMenu() {
    // 🚪 ENTRANCE ESCAPE HANDSHAKE: If user is explicitly viewing as guest, bounce back to login portal cleanly
    if (currentSystemSessionState === "guest") {
        document.getElementById("loaigle-settings-modal").style.display = "none";
        document.getElementById("main-app-canvas").style.display = "none";
        document.getElementById("login-gate").style.display = "flex";
        currentSystemSessionState = "login";
        localStorage.removeItem('loaigle_guest_trace');
        return;
    }

    const modal = document.getElementById("loaigle-settings-modal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
        updateThemeButtonsUI();
    }
}

// 🌓 ULTIMATE REAL-TIME THEME TRANSLATION ENGINE
function setThemeStyle(themeMode) {
    localStorage.setItem('loaigle_theme', themeMode);
    applyThemeLayer();
    updateThemeButtonsUI();
}

function applyThemeLayer() {
    const currentMode = localStorage.getItem('loaigle_theme') || 'auto';
    
    if (currentMode === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.add('light-theme');
    } else if (currentMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.remove('light-theme');
    } else if (currentMode === 'auto') {
        const phonePrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (phonePrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.remove('light-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.add('light-theme');
        }
    }
}

function updateThemeButtonsUI() {
    const currentMode = localStorage.getItem('loaigle_theme') || 'auto';
    const btnDark = document.getElementById('theme-btn-dark');
    const btnLight = document.getElementById('theme-btn-light');
    const btnAuto = document.getElementById('theme-btn-auto');
    
    if (!btnDark || !btnLight || !btnAuto) return;

    [btnDark, btnLight, btnAuto].forEach(btn => {
        btn.style.border = "1px solid #3c4043";
        btn.style.background = "#303134";
        btn.style.color = "#fff";
    });

    if (currentMode === 'dark') {
        btnDark.style.border = "1px solid #8ab4f8";
        btnDark.style.background = "#384966";
    } else if (currentMode === 'light') {
        btnLight.style.border = "1px solid #8ab4f8";
        btnLight.style.background = "#384966";
    } else if (currentMode === 'auto') {
        btnAuto.style.border = "1px solid #8ab4f8";
        btnAuto.style.background = "#384966";
    }
}

// 🚀 BOOTSTRAPPER: Direct script execution block triggered immediately on engine load
(function bootLoader() {
    const cachedHtml = localStorage.getItem("loaigle_bg_html");
    if (cachedHtml) {
        const template = document.createElement("div");
        template.id = "background-persistent-layer";
        template.innerHTML = cachedHtml;
    }

    applyThemeLayer();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('loaigle_theme') === 'auto' || !localStorage.getItem('loaigle_theme')) {
            applyThemeLayer();
        }
    });

    window.addEventListener("DOMContentLoaded", () => {
        const isKonamiUnlocked = localStorage.getItem("loaigle_konami_unlocked") === "true";
        if (isKonamiUnlocked) {
            renderGuideOnMenu();
        }
    });
})();

function renderGuideOnMenu() {
    const existing = document.getElementById("home-permanent-guide");
    if (existing) return; 

    const homeGuideAnchor = document.createElement("div");
    homeGuideAnchor.id = "home-permanent-guide";
    homeGuideAnchor.style.maxWidth = "650px";
    homeGuideAnchor.style.margin = "20px auto 40px auto";
    homeGuideAnchor.style.padding = "0 20px";
    homeGuideAnchor.innerHTML = masterGuideHTML;
    
    const searchBox = document.querySelector(".search-box");
    if (searchBox) {
        searchBox.parentNode.insertBefore(homeGuideAnchor, searchBox.nextSibling);
    }
}

function deleteFromBrowserStorage() {
    localStorage.removeItem("loaigle_bg_html");
    localStorage.removeItem("loaigle_konami_unlocked"); 
    localStorage.removeItem("loaigle_theme");
    localStorage.removeItem("loaigle_guest_trace");
    
    const layer = document.getElementById("background-persistent-layer");
    const guide = document.getElementById("home-permanent-guide");
    
    if (layer) layer.remove();
    if (guide) guide.remove();
    
    window.location.reload();
}

function loadToBrowserStorage() {
    const searchInput = document.getElementById("searchInput");
    const currentPayload = searchInput.value.trim();
    if (currentPayload) {
        localStorage.setItem("loaigle_bg_html", currentPayload);
        showCustomAlert("HTML successfully locked into BrowserStorage! Reload Loaigle to see your new persistent interface skin live! 💀😭📲");
    }
}

function showCustomAlert(message, callback = null) {
    const alertId = "loaigle-custom-alert";
    const existing = document.getElementById(alertId);
    if (existing) existing.remove();

    const alertHtml = `
        <div id="${alertId}" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 50000; padding: 20px;">
            <div style="background: #202124; border: 1px solid #3c4043; border-radius: 16px; max-width: 400px; width: 100%; padding: 24px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;">
                <p style="color: #bdc1c6; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">${message}</p>
                <button id="close-alert-btn" style="padding: 10px 30px; font-size: 14px; border: none; border-radius: 24px; background-color: #34a853; color: white; cursor: pointer; font-weight: bold;">OK</button>
            </div>
        </div>
    `;
    const div = document.createElement("div");
    div.innerHTML = alertHtml;
    document.body.appendChild(div);

    document.getElementById("close-alert-btn").onclick = function() {
        document.getElementById(alertId).remove();
        if (callback) callback();
    };
}

async function search() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim();
    if (!query) return;

    if (activeZergRush) {
        clearInterval(activeZergRush);
        activeZergRush = null;
    }

    const dictionaryDiv = document.getElementById("dictionary-box");
    const MathDiv = document.getElementById("results");
    
    dictionaryDiv.innerHTML = "";
    MathDiv.innerHTML = "<p style='color: #bdc1c6;'>Searching Loaigle...</p>";

    const homeMenuGuide = document.getElementById("home-permanent-guide");
    if (homeMenuGuide) {
        homeMenuGuide.style.display = "none";
    }

    const lowerQuery = query.toLowerCase();
    
    const barrelRollPhrases = [
        "do a barrel roll", "do a barrel roll please", 
        "can you do a barrel roll", "barrel roll", 
        "do a flip", "spin the screen", "make it spin"
    ];
    const tiltPhrases = ["askew", "tilt", "67", "wobble"];
    const zergPhrases = ["zerg rush", "destroy my page", "virus"];
    const googlePhrases = ["google", "alphabet", "sundar pichai", "google.com", "googl", "toogle"];

    const isBarrelRoll = barrelRollPhrases.includes(lowerQuery);
    const isTilt = tiltPhrases.includes(lowerQuery);
    const isGoogleSearch = googlePhrases.some(phrase => lowerQuery.includes(phrase));

    document.body.classList.remove("tilt-animation", "wobble-animation");

    if (lowerQuery === "up up down down left right left right b a") {
        localStorage.setItem("loaigle_konami_unlocked", "true"); 
        renderGuideOnMenu(); 
        const targetGuide = document.getElementById("home-permanent-guide");
        if (targetGuide) targetGuide.style.display = "block"; 
        showCustomAlert("✔ CHEAT CODE ACTIVATED!<br><br>The Master Blueprint Registry has been permanently locked and anchored right onto your home menu screen beneath the search bar! 🎮🚀");
        searchInput.value = ""; 
        MathDiv.innerHTML = ""; 
        return; 
    }

    const hasHtmlTags = /<(!doctype|html|head|body|div|p|span|a|link|script)/i.test(lowerQuery);
    if (hasHtmlTags) {
        MathDiv.innerHTML = `
            <div class="html-viewer-container" style="text-align: left; margin-top: 20px;">
                <h2 style="color: #8ab4f8; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #3c4043; padding-bottom: 8px;">HTML Viewer:</h2>
                <div class="rendered-payload" style="background: transparent; padding: 10px 0;">${query}</div>
                <div style="margin-top: 30px; background-color: #202124; border: 1px solid #3c4043; padding: 16px; border-radius: 12px; text-align: center;">
                    <button onclick="loadToBrowserStorage()" style="padding: 10px 20px; font-size: 13px; border: none; border-radius: 24px; background-color: #34a853; color: white; cursor: pointer; font-weight: bold; margin-bottom: 12px;">Load custom HTML in BrowserStorage</button>
                    <p style="color: #ea4335; font-size: 11px; font-weight: bold; line-height: 1.4; margin: 0; text-align: left;">
                        ⚠️ DISCLAIMER: This is only made for an HTML that changes the theme or texture of Loaigle. If this is code that actually is a full HTML app, test it through this HTML Viewer interface and don't click the button.
                    </p>
                </div>
                <div style="margin-top: 40px; text-align: center; border-top: 1px solid #3c4043; padding-top: 20px;">
                    <button onclick="showHtmlViewerLore()" style="padding: 10px 20px; font-size: 14px; border: none; border-radius: 24px; background-color: #ea4335; color: white; cursor: pointer;">What is this?</button>
                </div>
            </div>
        `;
        return; 
    }

    function checkIsGibberish(str) {
        const words = str.split(" ");
        const passList = ["hello", "hi", "hey", "test", "nth", "bnd", "scrs", "txt", "bit", "html", "css", "js", "json"];
        for (let word of words) {
            if (passList.includes(word) || word.startsWith("zerg") || word.startsWith("rush")) continue;
            if (/(.)\1\1/.test(word)) return true; 
            if (word.length >= 6 && (word.match(/[bcdfghjklmnpqrstvwxz]/gi) || []).length > word.length * 0.7) {
                if (!/[aeiouy]{2,}/i.test(word) && /jw|wj|hx|q|z/i.test(word)) return true;
            }
            if (word.length >= 4) {
                const vowels = (word.match(/[aeiouy]/gi) || []).length;
                if (vowels === 0) return true;
                if (/[bcdfghjklmnpqrstvwxz]{4,}/i.test(word)) return true;
            }
        }
        return false;
    }

    if (checkIsGibberish(lowerQuery)) {
        MathDiv.innerHTML = `
            <div class="result result-roast" style="margin-top: 20px;">
                <h2 id="roast-text" style="color: #ea4335; font-size: 24px; margin-bottom: 8px;"></h2>
                <p class="result-snippet" style="color: #9aa0a6; font-style: italic; font-size: 13px; margin-top: 15px;">Disclaimer: If you didn't type gibberish, you might have triggered another error.</p>
            </div>
        `;
        document.getElementById("roast-text").innerText = `"${query}" is gibberish! Learn English!`;
        triggerZergRush();
        return; 
    }

    function autoCorrectQuery(str) {
        let words = str.split(" ");
        let hasZerg = false;
        let hasRush = false;
        words = words.map(word => {
            if (word.startsWith("zerg")) { hasZerg = true; return "zerg"; }
            if (word.startsWith("rush")) { hasRush = true; return "rush"; }
            const typoMap = { "googl": "google", "toogle": "google", "searchh": "search", "helloo": "hello" };
            return typoMap[word] || word;
        });
        if (hasZerg && hasRush) return "zerg rush";
        return words.join(" ");
    }

    const serverQuery = autoCorrectQuery(lowerQuery);
    const isZergRush = zergPhrases.includes(lowerQuery) || serverQuery === "zerg rush";

    if (query.split(" ").length === 1 && !isZergRush) {
        try {
            const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
            if (dictRes.ok) {
                const dictData = await dictRes.json();
                if (dictData && dictData[0]) {
                    const definition = dictData[0].meanings[0].definitions[0].definition;
                    const partOfSpeech = dictData[0].meanings[0].partOfSpeech;
                    dictionaryDiv.innerHTML = `
                        <div class="word-dictionary">
                            <h3>Word Dictionary: ${query} (${partOfSpeech})</h3>
                            <p>${definition}</p>
                        </div>
                    `;
                }
            }
        } catch (e) { console.log("No dictionary entry."); }
    }

    const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(serverQuery)}&hl=en-US&gl=US&ceid=US:en`;
    const cb = new Date().getTime();
    let articles = [];

    const proxyChain = [
        () => fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}&_cb=${cb}`),
        () => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}`)}&_cb=${cb}`).then(res => res.ok ? res.json().then(d => ({ items: JSON.parse(d.contents).items })) : null),
        () => fetch(`https://corsproxy.io/?${encodeURIComponent(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}`)}`),
        () => fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}`)}`)
    ];

    for (let i = 0; i < proxyChain.length; i++) {
        try {
            const response = await proxyChain[i]();
            let data = response.items ? response : await response.json();
            
            if (data && data.items && data.items.length > 0) {
                articles = data.items.slice(0, 10);
                break;
            }
        } catch (err) { console.log("Node down"); }
    }

    if (articles.length === 0) {
        articles = [
            {
                title: `Latest updates on '${query}' surrounding global trends`,
                link: "https://google.com",
                description: `High-velocity internet traffic for '${query}' temporarily delayed live proxy servers. Systems are monitoring the surge.`
            },
            {
                title: "Loaigle Mobile interface officially deploys globally",
                link: "#",
                description: "User experience metrics skyrocket by 300% after developers transition layout formatting to phone-responsive media parameters."
            },
            {
                title: "Toogle News legacy protocol remains active",
                link: "#",
                description: "Inside sources confirm corporate spelling overrides are running smoothly across all mobile viewport tests."
            }
        ];
    }

    MathDiv.innerHTML = "";

    if (localStorage.getItem("loaigle_konami_unlocked") !== "true") {
        const hintCard = document.createElement("div");
        hintCard.className = "hint-header-card";
        hintCard.innerHTML = `
            <span style="font-size: 18px;">💡</span>
            <span style="color: #ea4335; font-size: 12px; font-weight: bold; font-family: sans-serif;">
                Tip: Type <span style="color: #8ab4f8; font-family: monospace; background: #202124; padding: 2px 6px; border-radius: 4px;">up up down down left right left right b a</span> into our search bar!
            </span>
        `;
        MathDiv.appendChild(hintCard);
    }

    const sourceTag = isGoogleSearch || lowerQuery.includes("toogle") ? "Toogle News" : "Google News";

    if (isGoogleSearch || lowerQuery.includes("toogle")) {
        const fakeDiv = document.createElement("div");
        fakeDiv.className = "result";
        fakeDiv.style.borderLeft = "3px solid #ea4335";
        fakeDiv.style.paddingLeft = "10px";
        fakeDiv.innerHTML = `
            <span class="source-tag" style="color: #ea4335; font-weight: bold;">Toogle Lore</span>
            <a href="#" class="result-link" onclick="showToogleLore(event)">Why does this say 'Toogle' instead of 'Google'? The Secret Revealed</a>
            <p class="result-snippet">An inside look into the catastrophic, accidental mobile keyboard fat-finger incident that permanently altered internet search history on Loaigle...</p>
        `;
        MathDiv.appendChild(fakeDiv);
    }

    articles.forEach((item) => {
        const div = document.createElement("div");
        div.className = "result";
        let displayTitle = item.title;
        let displaySnippet = item.description || "";

        if (isGoogleSearch || lowerQuery.includes("toogle")) {
            displayTitle = displayTitle.replace(/Google/g, "Toogle").replace(/google/g, "toogle");
            displaySnippet = displaySnippet.replace(/Google/g, "Toogle").replace(/google/g, "toogle");
        }
        
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = displaySnippet;
        const cleanSnippet = tempDiv.innerText.split("...")[0] + "..."; 

        div.dataset.originalTitle = displayTitle;
        div.dataset.originalSnippet = cleanSnippet;
        div.dataset.originalLink = item.link;

        div.innerHTML = `
            <span class="source-tag">${sourceTag}</span>
            <a href="${item.link}" class="result-link" target="_blank">${displayTitle}</a>
            <p class="result-snippet">${cleanSnippet}</p>
        `;
        MathDiv.appendChild(div);
    });

    if (isBarrelRoll || serverQuery.includes("barrel roll")) {
        triggerChaosAnimation();
    } else if (isTilt) {
        if (lowerQuery === "67" || lowerQuery === "wobble") {
            document.body.classList.add("wobble-animation");
        } else {
            document.body.classList.add("tilt-animation");
        }
    } else if (isZergRush) {
        triggerZergRush();
    }
}

function showToogleLore(event) {
    event.preventDefault();
    showCustomAlert(
        "📜 THE LORE OF TOOGLE:\n\n" +
        "This was not an intentional tech feature. While the lead engineer was rapidly deploying code from a tiny, chaotic mobile interface, their thumb struck the 'T' key instead of the 'G' key.\n\n" +
        "Vercel built it instantly. The internet witnessed it. The blinding white layout collapsed under its power. Instead of fixing the mistake silently, it was immortalized forever into the source code as a feature.\n\n" +
        "Long live Toogle News! 💀😭"
    );
}

function showHtmlViewerLore() {
    const modalHtml = `
        <div id="custom-lore-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 20000; padding: 20px;">
            <div style="background: #202124; border: 1px solid #3c4043; border-radius: 16px; max-width: 500px; width: 100%; padding: 24px; max-height: 80vh; overflow-y: auto; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <h3 style="color: #8ab4f8; margin-top: 0; font-size: 20px; border-bottom: 1px solid #3c4043; padding-bottom: 10px; font-weight: bold; font-family: sans-serif;">🛠️ LOAIGLE HTML VIEWER PRO STATUS LOG:</h3>
                <div style="color: #bdc1c6; font-size: 13px; line-height: 1.6; font-family: sans-serif;">
                    <p style="margin-bottom: 15px;"><strong>1. THE ORIGIN ACCIDENT:</strong><br>This portal was birthed during a high-velocity script layout verification test. A copy of the platform's literal repository code was passed directly into the search bar. Because code syntax fails the vowel-ratio metrics of the Gibberish Roast Engine, the input was flagged as an absolute keyboard smash.</p>
                    <p style="margin-bottom: 15px;"><strong>2. THE CHAIN REACTION:</strong><br>Instead of rendering as flat string text, the engine dropped the raw source code variables directly inside a live innerHTML template. The browser compiled the structural tags instantly—manifesting an identical, operational mirror loop of the website layout inside the insult card, while the hardcoded gibberish routine automatically unleashed an active Zerg Rush script to destroy it.</p>
                    <p style="margin-bottom: 15px;"><strong>3. THE THEME CONTROLS & DISCLAIMER ORIGIN:</strong><br>The theme-injection disclaimer was permanently written into the specs after a developer tried running a massive standalone React + Tailwind YouTube Hallucination inside the engine. The browser parsed the simulator's custom stylesheet, completely overrode Loaigle's global layout properties, and instantly hijacked the master viewport background color from dark charcoal to onyx black!</p>
                    <p><strong>4. CURRENT PRODUCTION USECASE:</strong><br>This portal now features dual-routing capability: use the interface window to safely execute and debug live single-file 'index.html' applications without interference, OR use the background engine to permanently save custom CSS code overrides into localStorage to inject custom skins, backgrounds, and custom textures natively into Loaigle's core skin style!</p>
                </div>
                <div style="margin-top: 20px; text-align: right;">
                    <button onclick="document.getElementById('custom-lore-modal').remove()" style="padding: 10px 24px; font-size: 14px; border: none; border-radius: 24px; background-color: #ea4335; color: white; cursor: pointer; font-weight: bold;">OK</button>
                </div>
            </div>
        </div>
    `;
    const div = document.createElement("div");
    div.id = "lore-modal-container";
    div.innerHTML = modalHtml;
    document.body.appendChild(div);
}

function triggerChaosAnimation() {
    document.body.classList.add("spin-animation");
    setTimeout(() => { document.body.classList.remove("spin-animation"); }, 1000);
    const results = document.querySelectorAll(".result");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    results.forEach(result => {
        const linkElement = result.querySelector(".result-link");
        const snippetElement = result.querySelector(".result-snippet");
        const origTitle = result.dataset.originalTitle;
        const origSnippet = result.dataset.originalSnippet;
        const origLink = result.dataset.originalLink;
        let scrambledTitle = "";
        let scrambledSnippet = "";
        for(let i=0; i<origTitle.length; i++) scrambledTitle += chars[Math.floor(Math.random() * chars.length)];
        for(let i=0; i<origSnippet.length; i++) scrambledSnippet += chars[Math.floor(Math.random() * chars.length)];
        linkElement.innerText = scrambledTitle;
        snippetElement.innerText = scrambledSnippet;
        linkElement.href = `https://${scrambledTitle.substring(0,8)}.com/error-broken-link`;
        let iterations = 0;
        const interval = setInterval(() => {
            linkElement.innerText = origTitle.split("").map((letter, index) => {
                if (index < iterations) return origTitle[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            snippetElement.innerText = origSnippet.split("").map((letter, index) => {
                if (index < iterations) return origSnippet[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            iterations += 1;
            if (iterations >= Math.max(origTitle.length, origSnippet.length)) {
                clearInterval(interval);
                linkElement.innerText = origTitle;
                snippetElement.innerText = origSnippet;
                linkElement.href = origLink;
            }
        }, 30);
    });
}

function triggerZergRush() {
    const DefenseDiv = document.getElementById("results");
    activeZergRush = setInterval(() => {
        const currentResults = document.querySelectorAll(".result, .result-roast");
        if (currentResults.length > 0) {
            const targetIndex = Math.floor(Math.random() * currentResults.length);
            const targetDiv = currentResults[targetIndex];
            const bug = document.createElement("span");
            bug.innerText = Math.random() > 0.5 ? "o" : "O";
            bug.style.position = "absolute";
            bug.style.color = Math.random() > 0.5 ? "#ea4335" : "#fbbc05";
            bug.style.fontWeight = "bold";
            bug.style.fontSize = "24px";
            bug.style.left = `${Math.random() * 60 + 20}%`;
            bug.style.top = "-50px";
            bug.style.zIndex = "999";
            bug.style.animation = "fall 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards";
            targetDiv.style.position = "relative";
            targetDiv.appendChild(bug);
            setTimeout(() => {
                targetDiv.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                targetDiv.style.opacity = "0";
                targetDiv.style.transform = "translateX(-20px) scale(0.9)";
                setTimeout(() => { if (targetDiv.parentNode) targetDiv.remove(); }, 400);
            }, 650);
        } else {
            clearInterval(activeZergRush);
            activeZergRush = null;
            DefenseDiv.innerHTML = "<p style='color: #ea4335; font-family: monospace; font-size: 20px; font-weight: bold;'>🚨 API not found!</p>";
            setTimeout(() => { DefenseDiv.innerHTML = "<p style='color: #bdc1c6;'>No results found on Loaigle.</p>"; }, 1500);
        }
    }, 500);
}

// ==========================================================================
// 📡 DEDICATED ENUM STATE-GATE MATRIX & FIREBASE PRODUCTION LAYOUT
// ==========================================================================
(function initFirebaseMatrix() {
    try {
        const config = {
          apiKey: "AIzaSyCqv4m005enhNhdXbdqvWHZ3fV2pZERdjU",
          authDomain: "loaiglesearch.firebaseapp.com",
          projectId: "loaiglesearch",
          storageBucket: "loaiglesearch.firebasestorage.app",
          messagingSenderId: "411313454942",
          appId: "1:411313454942:web:4e0c24b33fcae74ef359cf",
          measurementId: "G-HXS9N4GQ7Y"
        };

        if (typeof firebase === 'undefined') return;

        firebase.initializeApp(config);
        const auth = firebase.auth();
        const db = firebase.firestore();
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        const githubProvider = new firebase.auth.GithubAuthProvider();

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((e) => { console.error(e); });

        // Unified rendering manager that works strictly from the Enum State tracking configurations
        function displayActiveGate(gateMode) {
            currentSystemSessionState = gateMode; // Direct synchronization parameter mapping
            
            const loginGate = document.getElementById("login-gate");
            const appCanvas = document.getElementById("main-app-canvas");
            
            if (gateMode === "authenticated") {
                if (loginGate) loginGate.style.display = "none";
                if (appCanvas) appCanvas.style.display = "block";
            } else if (gateMode === "guest") {
                if (loginGate) loginGate.style.display = "none";
                if (appCanvas) appCanvas.style.display = "block";
            } else {
                if (loginGate) loginGate.style.display = "flex";
                if (appCanvas) appCanvas.style.display = "none";
            }
        }

        // Intercept tokens perfectly right on landing pass redirect
        auth.getRedirectResult().then((result) => {
            isFirebaseInitializing = false;
            if (result && result.user) {
                displayActiveGate("authenticated");
            }
        }).catch((e) => { 
            isFirebaseInitializing = false;
            showCustomAlert("⚠️ Secure Handshake Rejection: " + e.message); 
        });

        // Monitors credentials parameters fluidly
        auth.onAuthStateChanged(async (user) => {
            const syncStatusP = document.getElementById('settings-sync-indicator');
            const btnSaveCloud = document.getElementById('settings-btn-save');

            if (user) {
                isFirebaseInitializing = false;
                displayActiveGate("authenticated");
                
                if (syncStatusP) {
                    syncStatusP.innerText = `Active Account: ${user.email || 'Authorized Secure Operator'}`;
                    syncStatusP.style.color = "#34a853";
                }
                if (btnSaveCloud) btnSaveCloud.style.display = "block";

                try {
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        const cloudData = userDoc.data();
                        if (cloudData.bgHtml) localStorage.setItem('loaigle_bg_html', cloudData.bgHtml);
                        if (cloudData.konamiUnlocked) localStorage.setItem('loaigle_konami_unlocked', cloudData.konamiUnlocked);
                        if (cloudData.konamiUnlocked === "true") renderGuideOnMenu();
                    }
                } catch (e) { console.error(e); }
            } else {
                if (isFirebaseInitializing) {
                    if (localStorage.getItem('loaigle_guest_trace') === 'true') {
                        isFirebaseInitializing = false;
                        displayActiveGate("guest");
                    }
                    return; 
                }

                if (currentSystemSessionState !== "guest") {
                    displayActiveGate("login");
                }
            }
        });

        // Cold boot timing watch matrix
        setTimeout(() => {
            if (isFirebaseInitializing && !auth.currentUser && currentSystemSessionState !== "guest") {
                isFirebaseInitializing = false;
                if (localStorage.getItem('loaigle_guest_trace') === 'true') {
                    displayActiveGate("guest");
                } else {
                    displayActiveGate("login");
                }
            }
        }, 250);

        // Click routers pipeline execution passes
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'gate-btn-google') {
                isFirebaseInitializing = true;
                auth.signInWithRedirect(googleProvider);
            }

            if (e.target && e.target.id === 'gate-btn-github') {
                isFirebaseInitializing = true;
                auth.signInWithRedirect(githubProvider);
            }

            if (e.target && e.target.id === 'gate-btn-guest') {
                localStorage.setItem('loaigle_guest_trace', 'true');
                displayActiveGate("guest");
            }

            if (e.target && e.target.id === 'settings-btn-logout') {
                auth.signOut().then(() => {
                    localStorage.clear();
                    displayActiveGate("login");
                    document.getElementById("loaigle-settings-modal").style.display = "none";
                });
            }

            if (e.target && e.target.id === 'settings-btn-save') {
                if (!auth.currentUser) return;
                db.collection('users').doc(auth.currentUser.uid).set({
                  email: auth.currentUser.email || "",
                  bgHtml: localStorage.getItem('loaigle_bg_html') || "",
                  konamiUnlocked: localStorage.getItem('loaigle_konami_unlocked') || "false",
                  updatedAt: new Date().toISOString()
                }, { merge: true }).then(() => {
                    showCustomAlert("Configuration saved permanently to cloud database grid! 🎰🏁");
                });
            }
        });

    } catch (globalError) { console.error(globalError); }
})();

window.search = search;
window.deleteFromBrowserStorage = deleteFromBrowserStorage;
window.loadToBrowserStorage = loadToBrowserStorage;
window.toggleSettingsMenu = toggleSettingsMenu;
window.setThemeStyle = setThemeStyle;
