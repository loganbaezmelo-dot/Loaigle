// Keep track of any active Zerg Rush intervals so they don't stack up
let activeZergRush = null;

async function search() {
    // Force the browser to read the absolute latest value from the input field
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim();
    if (!query) return;

    // Clear any running Zerg Rush loops from previous searches
    if (activeZergRush) {
        clearInterval(activeZergRush);
        activeZergRush = null;
    }

    const dictionaryDiv = document.getElementById("dictionary-box");
    const resultsDiv = document.getElementById("results");
    
    // Clear the UI completely so old content can't hang
    dictionaryDiv.innerHTML = "";
    resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>Searching Loaigle...</p>";

    // 🌀 1. Check for Triggers
    const lowerQuery = query.toLowerCase();
    
    const barrelRollPhrases = [
        "do a barrel roll", "do a barrel roll please", 
        "can you do a barrel roll", "barrel roll", 
        "do a flip", "spin the screen", "make it spin"
    ];
    const tiltPhrases = ["askew", "tilt", "67", "wobble"];
    const zergPhrases = ["zerg rush", "destroy my page", "virus"];

    const isBarrelRoll = barrelRollPhrases.includes(lowerQuery);
    const isTilt = tiltPhrases.includes(lowerQuery);
    const isZergRush = zergPhrases.includes(lowerQuery);

    // Reset tilt/wobble from previous searches if this is a normal search
    document.body.classList.remove("tilt-animation", "wobble-animation");

    // 📖 2. Dictionary Lookup
    const isSingleWord = query.split(" ").length === 1;
    if (isSingleWord && !isZergRush) { // Don't show dictionary if we are destroying the page
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

    // 📰 3. News Search
    try {
        const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
        const timestamp = new Date().getTime();
        const rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}&_cb=${timestamp}`;
        
        const res = await fetch(rss2json);
        if (!res.ok) throw new Error("Network response failed");
        
        const data = await res.json();

        // Wipe the loader text
        resultsDiv.innerHTML = "";

        if (data.items && data.items.length > 0) {
            const articles = data.items.slice(0, 10);
            
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
                    <span class="source-tag">Toogle News</span>
                    <a href="${item.link}" class="result-link" target="_blank">${item.title}</a>
                    <p class="result-snippet">${cleanSnippet}</p>
                `;
                resultsDiv.appendChild(div);
            });

            // Trigger corresponding Easter Egg mechanics
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

        } else {
            resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>No results found on Loaigle.</p>";
        }
    } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>Error fetching results. Try clicking search again.</p>";
    }
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
        const currentResults = document.querySelectorAll(".result");
        
        if (currentResults.length > 0) {
            // Pick a random result div that is still standing
            const targetIndex = Math.floor(Math.random() * currentResults.length);
            const targetDiv = currentResults[targetIndex];
            
            // Create a falling "o" element right over it
            const bug = document.createElement("span");
            bug.innerText = Math.random() > 0.5 ? "o" : "O";
            bug.style.position = "absolute";
            bug.style.color = Math.random() > 0.5 ? "#ea4335" : "#fbbc05"; // Red or Yellow
            bug.style.fontWeight = "bold";
            bug.style.fontSize = "20px";
            bug.style.left = `${Math.random() * 80 + 10}%`;
            bug.style.animation = "fall 0.5s ease-in forwards";
            
            targetDiv.appendChild(bug);
            
            // Delete the result block after the bug hits it
            setTimeout(() => {
                targetDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                targetDiv.style.opacity = "0";
                targetDiv.style.transform = "scale(0.8)";
                setTimeout(() => {
                    if (targetDiv.parentNode) targetDiv.remove();
                }, 300);
            }, 500);
            
        } else {
            // 🚨 PANIC STATE: All links are wiped completely out of the DOM
            clearInterval(activeZergRush);
            activeZergRush = null;
            
            resultsDiv.innerHTML = "<p style='color: #ea4335; font-family: monospace; font-size: 20px; font-weight: bold;'>🚨 API not found!</p>";
            
            // Wait exactly 1.5 seconds, then flash back to the standard empty text
            setTimeout(() => {
                resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>No results found on Loaigle.</p>";
            }, 1500);
        }
    }, 400); // Spawns a bug and eats a link every 400ms
}
