// Keep track of any active Zerg Rush intervals so they don't stack up
let activeZergRush = null;

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
    const isZergRush = zergPhrases.includes(lowerQuery);
    const isGoogleSearch = googlePhrases.some(phrase => lowerQuery.includes(phrase));

    document.body.classList.remove("tilt-animation", "wobble-animation");

    // 🕵️‍♂️ GIBBERISH DETECTION ENGINE
    function checkIsGibberish(str) {
        const words = str.split(" ");
        // If it's multiple words, let's look closer at individual chunks
        for (let word of words) {
            if (word.length > 4) {
                const vowels = (word.match(/[aeiouy]/gi) || []).length;
                const consonants = word.length - vowels;
                
                // Real words rarely have 0 vowels or a 5+ consonant pileup
                if (vowels === 0 && word.length > 3) return true;
                if (/(?![aeiouy])[a-z]{5,}/i.test(word)) return true; 
            }
        }
        return false;
    }

    const isGibberish = checkIsGibberish(lowerQuery);

    // If it's absolute keyboard smash, deploy the automated Roast Engine
    if (isGibberish) {
        resultsDiv.innerHTML = `
            <div class="result roast-box">
                <h2 style="color: #ea4335; font-size: 24px; margin-bottom: 8px;">"${query}" is gibberish! Learn English!</h2>
                <p class="result-snippet" style="color: #9aa0a6; font-style: italic; font-size: 13px; margin-top: 15px;">
                    Disclaimer: If you didn't type gibberish, you might have triggered another error.
                </p>
            </div>
        `;
        // Execute immediate self-destruction via Zerg Rush
        triggerZergRush();
        return; // Halt all network requests completely!
    }

    // 📖 1. Dictionary Lookup (Only for clean single words)
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

    // 📰 2. News Search (Optimized path routing for regular long sentences)
    const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
    const timestamp = new Date().getTime();
    let articles = [];

    // --- ROUTE 1: Primary Proxy ---
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

    // --- ROUTE 2: Backup Proxy (Fixes sentence hang-ups) ---
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

    // --- ROUTE 3: Genuine System Error Fallback (Safe from gibberish triggers) ---
    if (articles.length === 0) {
        articles = [
            {
                title: "Loaigle Search Connection Gateway Timed Out",
                link: "#",
                description: "The structural formatting for this complex sentence query caused an off-site proxy delay. Click search again to reload live data."
            }
        ];
    }

    // Clear loading indicator
    resultsDiv.innerHTML = "";

    // 📰 3. Render Results
    const sourceTag = isGoogleSearch ? "Toogle News" : "Google News";

    if (isGoogleSearch) {
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

    if (isBarrelRoll) {
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
    alert(
        "📜 THE LORE OF TOOGLE:\n\n" +
        "This was not an intentional tech feature. While the lead engineer was rapidly deploying code from a tiny, chaotic mobile interface, their thumb struck the 'T' key instead of the 'G' key.\n\n" +
        "Vercel built it instantly. The internet witnessed it. The blinding white layout collapsed under its power. Instead of fixing the mistake silently, it was immortalized forever into the source code as a feature.\n\n" +
        "Long live Toogle News! 💀😭"
    );
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
    const resultsDiv = document.getElementById("results");
    
    activeZergRush = setInterval(() => {
        // Target whatever blocks exist (normal results OR the new roast container)
        const currentResults = document.querySelectorAll(".result");
        
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
            
            resultsDiv.innerHTML = "<p style='color: #ea4335; font-family: monospace; font-size: 20px; font-weight: bold;'>🚨 API not found!</p>";
            
            setTimeout(() => {
                resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>No results found on Loaigle.</p>";
            }, 1500);
        }
    }, 500);
}
