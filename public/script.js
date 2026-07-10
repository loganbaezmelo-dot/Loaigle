// Keep track of any active Zerg Rush intervals so they don't stack up
let activeZergRush = null;

// Tracks initialized state parameters during cold reboots
let isFirebaseInitializing = true;

// Shared configuration parameters initialized globally
let auth, db, googleProvider, githubProvider;

// The canonical master blueprint text block utilized across both viewport layouts
const masterGuideHTML = `
    <div class="konami-guide-container" id="loaigle-system-guide">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3c4043; padding-bottom: 10px; margin-bottom: 15px;">
            <h2 style="color: #34a853; margin: 0; font-size: 20px; font-family: monospace;">🎮 LOAIGLE SYSTEM MANIFEST</h2>
            <button onclick="deleteFromBrowserStorage()" style="background: #ef4444; color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: bold; cursor: pointer;">Hide Guide</button>
        </div>
        
        <div class="guide-section">
            <h3>✨ Active Animation Drivers</h3>
            <p>• <strong>"do a barrel roll"</strong> - Forces full 360-degree CSS viewport rotation alongside text scrambling.</p>
            <p>• <strong>"tilt" / "askew"</strong> - Locks the core browser axis parameters onto a fixed 4.5-degree slant profile.</p>
            <p>• <strong>"67" / "wobble"</strong> - Initiates an infinite alternate keyframe vibration loop layout simulation.</p>
        </div>

        <div class="guide-section">
            <h3>🕵️‍♂️ Core Threat Mitigation Systems</h3>
            <p>• <strong>"zerg rush"</strong> - Triggers automated destruction array rains that systematic dissolve element layouts.</p>
        </div>

        <div class="guide-section">
            <h3>💻 Standalone HTML Sandbox Pro Suite</h3>
            <p>• <strong>Raw Data Strings (&lt;html&gt;, &lt;!DOCTYPE&gt;)</strong> - Manifests a 100% unnerfed sandbox theater card layout with full security shields.</p>
        </div>
    </div>
`;

// 🎙️ REAL-TIME HARDWARE VOICE SEARCH ENGINE
function triggerVoiceCapture() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showCustomAlert("❌ Audio Exception: Speech Recognition API is not supported on this specific mobile browser browser framework.");
        return;
    }

    const micBtn = document.getElementById("voice-search-btn");
    const searchInput = document.getElementById("searchInput");
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    micBtn.style.color = "#ea4335"; 
    micBtn.style.background = "#3c4043";
    micBtn.innerText = "🛑";

    recognition.start();

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        searchInput.value = spokenText;
        micBtn.style.color = "#bdc1c6";
        micBtn.style.background = "#303134";
        micBtn.innerText = "🎙️";
        search(); 
    };

    recognition.onerror = function(e) {
        console.error(e);
        micBtn.style.color = "#bdc1c6";
        micBtn.style.background = "#303134";
        micBtn.innerText = "🎙️";
    };

    recognition.onend = function() {
        micBtn.style.color = "#bdc1c6";
        micBtn.style.background = "#303134";
        micBtn.innerText = "🎙️";
    };
}

// ⚙️ SETTINGS PANEL NAVIGATION CONTROLS
function toggleSettingsMenu() {
    const modal = document.getElementById("loaigle-settings-modal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
        updateThemeButtonsUI();
    }
}

// ↩️ INTERACTIVE BACK CONTROLLER: Returns layout smoothly to menu home view parameters
function returnToHomeMenu() {
    if (activeZergRush) {
        clearInterval(activeZergRush);
        activeZergRush = null;
    }
    
    document.getElementById("searchInput").value = "";
    document.getElementById("dictionary-box").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    document.getElementById("loaigle-back-btn").style.display = "none";
    document.body.classList.remove("tilt-animation", "wobble-animation");

    const guide = document.getElementById("home-permanent-guide");
    if (guide) guide.style.display = "block";
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

// 🚀 BOOTSTRAPPER (Safe Sandbox Extraction)
(function bootLoader() {
    const cachedHtml = localStorage.getItem("loaigle_bg_html");
    if (cachedHtml) {
        const template = document.createElement("div");
        template.id = "background-persistent-layer";
        template.innerHTML = cachedHtml;
        document.body.appendChild(template);
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
    localStorage.removeItem("loaigle_validated_auth");
    
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

// 🛡️ MOBILE STYLE INJECTIONS FOR OVERLAYS
const commonModalStyles = "position: fixed; inset: 0; background: rgba(10,10,12,0.98); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px; box-sizing: border-box; font-family: sans-serif; width: 100vw; height: 100vh;";

function showHijackInterceptorPrompt(queryPayload, executeInjectionCallback) {
    const promptId = "loaigle-hijack-interceptor";
    const existing = document.getElementById(promptId);
    if (existing) existing.remove();

    const promptHtml = `
        <div id="${promptId}" style="${commonModalStyles}">
            <div style="background: #202124; border: 2px solid #ea4335; border-radius: 16px; max-width: 90%; width: 380px; padding: 24px; text-align: left; box-shadow: 0 10px 40px rgba(0,0,0,0.6); color: #fff; box-sizing: border-box;">
                <h3 style="color: #ea4335; margin-top: 0; font-size: 18px; margin-bottom: 15px; font-family: monospace;">⚠️ RUNTIME INTERCEPT</h3>
                <p style="color: #bdc1c6; font-size: 13px; line-height: 1.6; margin-bottom: 24px;">
                    This HTML code is trying to cover the entire page of Loaigle, please confirm if you want to inject this code temporarily.
                </p>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button id="hijack-btn-no" style="padding: 10px 20px; font-size: 13px; border: 1px solid #5f6368; border-radius: 20px; background: #303134; color: #fff; cursor: pointer; font-weight: bold;">No</button>
                    <button id="hijack-btn-yes" style="padding: 10px 20px; font-size: 13px; border: none; border-radius: 20px; background: #ea4335; color: #fff; cursor: pointer; font-weight: bold;">Yes</button>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = promptHtml;
    document.body.appendChild(wrapper);

    document.getElementById("hijack-btn-no").onclick = function() {
        wrapper.remove();
        window.returnToHomeMenu();
    };

    document.getElementById("hijack-btn-yes").onclick = function() {
        wrapper.remove();
        executeInjectionCallback();
    };
}

function showHardwarePermissionWarningPrompt(executeInjectionCallback) {
    const promptId = "loaigle-hardware-interceptor";
    const existing = document.getElementById(promptId);
    if (existing) existing.remove();

    const promptHtml = `
        <div id="${promptId}" style="${commonModalStyles}">
            <div style="background: #202124; border: 2px solid #fbbc05; border-radius: 16px; max-width: 90%; width: 380px; padding: 24px; text-align: left; box-shadow: 0 10px 40px rgba(0,0,0,0.7); color: #fff; box-sizing: border-box;">
                <h3 style="color: #fbbc05; margin-top: 0; font-size: 17px; margin-bottom: 15px; font-family: monospace;">⚠️ PRIVACY EXPLOIT RADAR</h3>
                <p style="color: #bdc1c6; font-size: 13px; line-height: 1.6; margin-bottom: 24px;">
                    This code is trying to use permissions you set up on Loaigle. Are you sure you wanna use it?
                </p>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button id="hw-btn-no" style="padding: 10px 20px; font-size: 13px; border: 1px solid #5f6368; border-radius: 20px; background: #303134; color: #fff; cursor: pointer; font-weight: bold;">No</button>
                    <button id="hw-btn-yes" style="padding: 10px 20px; font-size: 13px; border: none; border-radius: 20px; background: #fbbc05; color: #000; cursor: pointer; font-weight: bold;">Yes</button>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = promptHtml;
    document.body.appendChild(wrapper);

    document.getElementById("hw-btn-no").onclick = function() {
        wrapper.remove();
        window.returnToHomeMenu();
    };

    document.getElementById("hw-btn-yes").onclick = function() {
        wrapper.remove();
        executeInjectionCallback();
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

    document.getElementById("loaigle-back-btn").style.display = "inline-block";

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

    // 🛡️ RE-ARMED CRITERIA
    const hasHtmlTags = /<html|<head|<body|<div|<p|<span|<a\s+href|<link|<script/i.test(lowerQuery);
    const containsCodeElements = /<script|eval\s*\(|settimeout\s*\(|setinterval\s*\(|\.onclick\s*=/i.test(lowerQuery);
    
    const attemptsFullHijack = /position\s*:\s*(fixed|absolute)|width\s*:\s*100(vw|%)|height\s*:\s*100(vh|%)|inset\s*:\s*0|background\s*:\s*#|<html|<body/i.test(lowerQuery) || lowerQuery.length > 1000;
    const attemptsHardwareAccess = /getusermedia|mediadevices|geolocation|getcurrentposition|webkitAudioContext|AudioContext|notification|permission|microphone/i.test(lowerQuery);

    const isAnyCodePayload = hasHtmlTags || containsCodeElements || lowerQuery.length > 300;

    const renderHtmlViewerLayout = () => {
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
            </div>
        `;
    };

    if (isAnyCodePayload) {
        const executeCompile = () => {
            if (attemptsHardwareAccess) {
                showHardwarePermissionWarningPrompt(() => {
                    renderHtmlViewerLayout();
                });
            } else {
                renderHtmlViewerLayout();
            }
        };

        if (attemptsFullHijack) {
            document.getElementById("loaigle-back-btn").style.display = "none";
            showHijackInterceptorPrompt(query, () => {
                executeCompile();
            });
        } else {
            executeCompile();
        }
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
        () => fetch(`https://corsproxy.io/?${encodeURIComponent('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(newsUrl))}`),
        () => fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(newsUrl))}`)
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
                description: `High-velocity internet traffic for '${query}' temporarily delayed live proxy servers.`
            }
        ];
    }

    MathDiv.innerHTML = "";
    const sourceTag = isGoogleSearch || lowerQuery.includes("toogle") ? "Toogle News" : "Google News";

    if (isGoogleSearch || lowerQuery.includes("toogle")) {
        const fakeDiv = document.createElement("div");
        fakeDiv.className = "result";
        fakeDiv.style.borderLeft = "3px solid #ea4335";
        fakeDiv.style.paddingLeft = "10px";
        fakeDiv.innerHTML = `
            <span class="source-tag" style="color: #ea4335; font-weight: bold;">Toogle Lore</span>
            <a href="#" class="result-link" onclick="showToogleLore(event)">Why does this say 'Toogle' instead of 'Google'? The Secret Revealed</a>
            <p class="result-snippet">An inside look into the catastrophic, accidental mobile keyboard fat-finger incident...</p>
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
    showCustomAlert("📜 THE LORE OF TOOGLE:\n\nThis was not an intentional tech feature. While the lead engineer was rapidly deploying code from a tiny, chaotic mobile interface, their thumb struck the 'T' key instead of the 'G' key... Long live Toogle News! 💀😭");
}

function triggerChaosAnimation() {
    document.body.classList.add("spin-animation");
    setTimeout(() => { document.body.classList.remove("spin-animation"); }, 1000);
    const results = document.querySelectorAll(".result");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    results.forEach(result => {
        const linkElement = result.querySelector(".result-link");
        const origTitle = result.dataset.originalTitle;
        let scrambledTitle = "";
        for(let i=0; i<origTitle.length; i++) scrambledTitle += chars[Math.floor(Math.random() * chars.length)];
        linkElement.innerText = scrambledTitle;
        let iterations = 0;
        const interval = setInterval(() => {
            linkElement.innerText = origTitle.split("").map((letter, index) => {
                if (index < iterations) return origTitle[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            iterations += 1;
            if (iterations >= origTitle.length) { clearInterval(interval); linkElement.innerText = origTitle; }
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
            setTimeout(() => {
                targetDiv.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                targetDiv.style.opacity = "0";
                targetDiv.style.transform = "scale(0.9)";
                setTimeout(() => { if (targetDiv.parentNode) targetDiv.remove(); }, 400);
            }, 200);
        } else {
            clearInterval(activeZergRush); activeZergRush = null;
            DefenseDiv.innerHTML = "<p style='color: #ea4335;'>🚨 API not found!</p>";
        }
    }, 500);
}

function triggerGoogleLogin() {
    localStorage.setItem('loaigle_validated_auth', 'true');
    auth.signInWithRedirect(googleProvider);
}

function triggerGithubLogin() {
    localStorage.setItem('loaigle_validated_auth', 'true');
    auth.signInWithRedirect(githubProvider);
}

function triggerSignOut() {
    localStorage.removeItem('loaigle_validated_auth');
    auth.signOut().then(() => { localStorage.clear(); setPageLayoutState(false); });
}

function pushConfigsToCloud() {
    if (!auth.currentUser) return;
    db.collection('users').doc(auth.currentUser.uid).set({
      email: auth.currentUser.email || "",
      bgHtml: localStorage.getItem('loaigle_bg_html') || "",
      konamiUnlocked: localStorage.getItem('loaigle_konami_unlocked') || "false",
      updatedAt: new Date().toISOString()
    }, { merge: true }).then(() => { showCustomAlert("Configuration saved permanently to cloud database grid! 🎰🏁"); });
}

function setPageLayoutState(isAuthenticated) {
    const loginGate = document.getElementById("login-gate");
    const appCanvas = document.getElementById("main-app-canvas");
    if (isAuthenticated) {
        if (loginGate) loginGate.style.display = "none";
        if (appCanvas) appCanvas.style.display = "block";
    } else {
        if (loginGate) loginGate.style.display = "flex";
        if (appCanvas) appCanvas.style.display = "none";
        document.getElementById("loaigle-settings-modal").style.display = "none";
    }
}

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
        auth = firebase.auth(); db = firebase.firestore();
        googleProvider = new firebase.auth.GoogleAuthProvider(); githubProvider = new firebase.auth.GithubAuthProvider();

        auth.getRedirectResult().then((result) => {
            if (result && result.user) { localStorage.setItem('loaigle_validated_auth', 'true'); isFirebaseInitializing = false; setPageLayoutState(true); }
        }).catch((e) => { isFirebaseInitializing = false; });

        auth.onAuthStateChanged(async (user) => {
            isFirebaseInitializing = false;
            if (user) {
                localStorage.setItem('loaigle_validated_auth', 'true'); setPageLayoutState(true);
                const syncStatusP = document.getElementById('settings-sync-indicator');
                const btnSaveCloud = document.getElementById('settings-btn-save');
                if (syncStatusP) { syncStatusP.innerText = `Active Account: ${user.email}`; syncStatusP.style.color = "#34a853"; }
                if (btnSaveCloud) btnSaveCloud.style.display = "block";
            } else {
                if (localStorage.getItem('loaigle_validated_auth') === 'true') { setPageLayoutState(true); return; }
                setPageLayoutState(false);
            }
        });
    } catch (globalError) { console.error(globalError); }
})();

window.search = search; window.deleteFromBrowserStorage = deleteFromBrowserStorage; window.loadToBrowserStorage = loadToBrowserStorage;
window.toggleSettingsMenu = toggleSettingsMenu; window.setThemeStyle = setThemeStyle; window.returnToHomeMenu = returnToHomeMenu;
window.triggerGoogleLogin = triggerGoogleLogin; window.triggerGithubLogin = triggerGithubLogin; window.triggerSignOut = triggerSignOut; 
window.pushConfigsToCloud = pushConfigsToCloud; window.triggerVoiceCapture = triggerVoiceCapture;
