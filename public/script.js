// Keep track of any active Zerg Rush intervals so they don't stack up
let activeZergRush = null;

// 🚀 BOOTSTRAPPER: Run instantly on page load to inject cached themes/textures
(function bootLoader() {
    const cachedHtml = localStorage.getItem("loaigle_bg_html");
    if (cachedHtml) {
        const template = document.createElement("div");
        template.id = "background-persistent-layer";
        template.innerHTML = cachedHtml;
        document.documentElement.appendChild(template);

        window.addEventListener("DOMContentLoaded", () => {
            const toast = document.createElement("div");
            toast.className = "bg-toast";
            toast.id = "loaigle-bg-toast";
            toast.innerHTML = `
                <span style="color: #bdc1c6;">Running HTML in the background!</span>
                <button onclick="deleteFromBrowserStorage()">Delete from BrowserStorage</button>
            `;
            document.body.appendChild(toast);
        });
    }
})();

// Action button wrapper to wipe theme modifications instantly
function deleteFromBrowserStorage() {
    localStorage.removeItem("loaigle_bg_html");
    const layer = document.getElementById("background-persistent-layer");
    const toast = document.getElementById("loaigle-bg-toast");
    if (layer) layer.remove();
    if (toast) toast.remove();
    
    // Custom non-cutting alert modal
    showCustomAlert("Background HTML successfully purged. Reloading page to restore defaults! 💀😭", () => {
        window.location.reload();
    });
}

// Action button wrapper to grab input and save it to localStorage securely
function loadToBrowserStorage() {
    const searchInput = document.getElementById("searchInput");
    const currentPayload = searchInput.value.trim();
    if (currentPayload) {
        localStorage.setItem("loaigle_bg_html", currentPayload);
        showCustomAlert("HTML successfully locked into BrowserStorage! Reload Loaigle to see your new persistent interface skin live! 💀😭📲");
    }
}

// Helper function to build custom non-cutting alert boxes
function showCustomAlert(message, callback = null) {
    const alertId = "loaigle-custom-alert";
    const existing = document.getElementById(alertId);
    if (existing) existing.remove();

    const alertHtml = `
        <div id="${alertId}" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 30000; padding: 20px;">
            <div style="background: #202124; border: 1px solid #3c4043; border-radius: 16px; max-width: 400px; w-full; padding: 24px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;">
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
    const resultsDiv = document.getElementById("results");
    
    dictionaryDiv.innerHTML = "";
    resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>Searching Loaigle...</p>";

    const lowerQuery = query.toLowerCase();
    
    // 🌀 Easter Egg Trigger Lists
    const barrelRollPhrases = [
        "do a barrel roll", "do a barrel roll please", 
        "can you do a barrel roll", "barrel roll", 
        "do a flip", "spin the screen", "make it spin"
    ];
    const tiltPhrases = ["askew", "tilt", "67", "wobble"];
    const zergPhrases = ["zerg rush", "destroy my page", "virus"];
    const googlePhrases = ["google", "alphabet", "sundar pichai", "google.com", "googl"];

    const isBarrelRoll = barrelRollPhrases.includes(lowerQuery);
    const isTilt = tiltPhrases.includes(lowerQuery);
    const isGoogleSearch = googlePhrases.some(phrase => lowerQuery.includes(phrase));

    document.body.classList.remove("tilt-animation", "wobble-animation");

    // 🖥 shrink-0 ENGINE HOOK
    const hasHtmlTags = /<(!doctype|html|head|body|div|p|span|a|link|script)/i.test(lowerQuery);
    if (hasHtmlTags) {
        resultsDiv.innerHTML = `
            <div class="html-viewer-container" style="text-align: left; margin-top: 20px;">
                <h2 style="color: #8ab4f8; font-size: 20px; margin-bottom: 15px; border-bottom: 1px solid #3c4043; padding-bottom: 8px;">HTML Viewer:</h2>
                
                <div class="rendered-payload" style="background: transparent; padding: 10px 0;">
                    ${query}
                </div>

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

    // 🕵️‍♂️ ULTRA-STRICT GIBBERISH DETECTION ENGINE
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

    const isGibberish = checkIsGibberish(lowerQuery);

    if (isGibberish) {
        resultsDiv.innerHTML = `
            <div class="result result-roast" style="margin-top: 20px;">
                <h2 id="roast-text" style="color: #ea4335; font-size: 24px; margin-bottom: 8px;"></h2>
                <p class="result-snippet" style="color: #9aa0a6; font-style: italic; font-size: 13px; margin-top: 15px;">
                    Disclaimer: If you didn't type gibberish, you might have triggered another error.
                </p>
            </div>
        `;
        document.getElementById("roast-text").innerText = `"${query}" is gibberish! Learn English!`;
        triggerZergRush();
        return; 
    }

    // 🧠 SILENT SPELL-CHECK MATRIX WITH WILDCARD SCANNING
    function autoCorrectQuery(str) {
        let words = str.split(" ");
        let hasZerg = false;
        let hasRush = false;

        words = words.map(word => {
            if (word.startsWith("zerg")) { hasZerg = true; return "zerg"; }
            if (word.startsWith("rush")) { hasRush = true; return "rush"; }
            
            const typoMap = {
                "googl": "google",
                "toogle": "google",
                "searchh": "search",
                "helloo": "hello"
            };
            return typoMap[word] || word;
        });

        if (hasZerg && hasRush) {
            return "zerg rush";
        }
        return words.join(" ");
    }

    const serverQuery = autoCorrectQuery(lowerQuery);
    const isZergRush = zergPhrases.includes(lowerQuery) || serverQuery === "zerg rush";

    // 📖 1. Dictionary Lookup
    const isSingleWord = query.split(" ").length === 1;
    if (isSingleWord && !isZergRush) {
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
        } catch (e) {
            console.log("No dictionary entry found.");
        }
    }

    // 📰 2. News Search 
    const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(serverQuery)}&hl=en-US&gl=US&ceid=US:en`;
    const timestamp = new Date().getTime();
    let articles = [];

    try {
        const rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}&_cb=${timestamp}`;
        const res = await fetch(rss2json);
        if (res.ok) {
            const data = await res.json();
            if (data && data.items && data.items.length > 0) {
                articles = data.items.slice(0, 10);
            }
        }
    } catch (err) {
        console.log("Route 1 dropped.");
    }

    if (articles.length === 0) {
        try {
            const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}`)}&_cb=${timestamp}`;
            const res = await fetch(allOriginsUrl);
            if (res.ok) {
                const wrapper = await res.json();
                const data = JSON.parse(wrapper.contents);
                if (data && data.items && data.items.length > 0) {
                    articles = data.items.slice(0, 10);
                }
            }
        } catch (err) {
            console.log("Route 2 dropped.");
        }
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

    resultsDiv.innerHTML = "";

    // 📰 3. Render Results
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
        resultsDiv.appendChild(fakeDiv);
    }

    articles.forEach((item) => {
        const div = document.createElement("div");
        div.className = "result";
        
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = item.description || "";
        const cleanSnippet = tempDiv.innerText.split("...")[0] + "..."; 

        div.dataset.originalTitle = item.title;
        div.dataset.originalLink = item.link;
        div.dataset.originalSnippet = cleanSnippet;

        div.innerHTML = `
            <span class="source-tag">${sourceTag}</span>
            <a href="${item.link}" class="result-link" target="_blank">${item.title}</a>
            <p class="result-snippet">${cleanSnippet}</p>
        `;
        resultsDiv.appendChild(div);
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

// 📖 The Secret Backstory Popup Box
function showToogleLore(event) {
    event.preventDefault();
    showCustomAlert(
        "📜 THE LORE OF TOOGLE:\n\n" +
        "This was not an intentional tech feature. While the lead engineer was rapidly deploying code from a tiny, chaotic mobile interface, their thumb struck the 'T' key instead of the 'G' key.\n\n" +
        "Vercel built it instantly. The internet witnessed it. The blinding white layout collapsed under its power. Instead of fixing the mistake silently, it was immortalized forever into the source code as a feature.\n\n" +
        "Long live Toogle News! 💀😭"
    );
}

// 🛠️ COMPLETELY UNCHOPPED HISTORICAL LORE LOGS WITH MOBILE MODAL INJECTION
function showHtmlViewerLore() {
    const modalHtml = `
        <div id="custom-lore-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 20000; padding: 20px;">
            <div style="background: #202124; border: 1px solid #3c4043; border-radius: 16px; max-width: 500px; width: 100%; padding: 24px; max-height: 80vh; overflow-y: auto; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <h3 style="color: #8ab4f8; margin-top: 0; font-size: 20px; border-bottom: 1px solid #3c4043; padding-bottom: 10px; font-weight: bold; font-family: sans-serif;">🛠️ LOAIGLE HTML VIEWER PRO STATUS LOG:</h3>
                
                <div style="color: #bdc1c6; font-size: 13px; line-height: 1.6; font-family: sans-serif;">
                    <p style="margin-bottom: 15px;"><strong>1. THE ORIGIN ACCIDENT:</strong><br>
                    This portal was birthed during a high-velocity script layout verification test. A copy of the platform's literal repository code was passed directly into the search bar. Because code syntax fails the vowel-ratio metrics of the Gibberish Roast Engine, the input was flagged as an absolute keyboard smash.</p>
                    
                    <p style="margin-bottom: 15px;"><strong>2. THE CHAIN REACTION:</strong><br>
                    Instead of rendering as flat string text, the engine dropped the raw source code variables directly inside a live innerHTML template. The browser compiled the structural tags instantly—manifesting an identical, operational mirror loop of the website layout inside the insult card, while the hardcoded gibberish routine automatically unleashed an active Zerg Rush script to destroy it.</p>
                    
                    <p style="margin-bottom: 15px;"><strong>3. THE THEME CONTROLS & DISCLAIMER ORIGIN:</strong><br>
                    The theme-injection disclaimer was permanently written into the specs after a developer tried running a massive standalone React + Tailwind YouTube Simulator inside the engine. The browser parsed the simulator's custom stylesheet, completely overrode Loaigle's global layout properties, and instantly hijacked the master viewport background color from dark charcoal to onyx black!</p>
                    
                    <p><strong>4. CURRENT PRODUCTION USECASE:</strong><br>
                    This portal now features dual-routing capability: use the interface window to safely execute and debug live single-file 'index.html' applications without interference, OR use the background engine to permanently save custom CSS code overrides into localStorage to inject custom skins, backgrounds, and custom textures natively into Loaigle's core skin style!</p>
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

// 🎰 Matrix Scrambling & Barrel Roll Logic
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

// 👾 Zerg Rush Link Destroyer Logic
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
                setTimeout(() => {
                    if (targetDiv.parentNode) targetDiv.remove();
                }, 400);
            }, 650);
            
        } else {
            clearInterval(activeZergRush);
            activeZergRush = null;
            
            DefenseDiv.innerHTML = "<p style='color: #ea4335; font-family: monospace; font-size: 20px; font-weight: bold;'>🚨 API not found!</p>";
            
            setTimeout(() => {
                DefenseDiv.innerHTML = "<p style='color: #bdc1c6;'>No results found on Loaigle.</p>";
            }, 1500);
        }
    }, 500);
}
