async function search() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const dictionaryDiv = document.getElementById("dictionary-box");
    const resultsDiv = document.getElementById("results");
    
    dictionaryDiv.innerHTML = "";
    resultsDiv.innerHTML = "";

    // 🌀 1. Trigger the Barrel Roll Chaos if they type the secret phrases
    const triggerPhrases = [
        "do a barrel roll", "do a barrel roll please", 
        "can you do a barrel roll", "barrel roll", 
        "do a flip", "spin the screen", "make it spin"
    ];

    const isBarrelRoll = triggerPhrases.includes(query.toLowerCase());

    // 📖 2. Fetch Word Dictionary box if it's a single word
    const isSingleWord = query.split(" ").length === 1;
    if (isSingleWord) {
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

    // 📰 3. Fetch Real News Layout (Using a free RSS to JSON converter for Google News)
    try {
        const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
        const rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}`;
        
        const res = await fetch(rss2json);
        const data = await res.json();

        if (data.items && data.items.length > 0) {
            // Take top 10 articles
            const articles = data.items.slice(0, 10);
            
            articles.forEach((item, index) => {
                const div = document.createElement("div");
                div.className = "result";
                
                // Track original texts and links for the scrambling mechanic
                div.dataset.originalTitle = item.title;
                div.dataset.originalLink = item.link;
                div.dataset.originalSnippet = item.description || "Click to view the full coverage on Google News.";

                div.innerHTML = `
                    <span class="source-tag">Toogle News</span>
                    <a href="${item.link}" class="result-link" target="_blank">${item.title}</a>
                    <p class="result-snippet">${div.dataset.originalSnippet}</p>
                `;
                resultsDiv.appendChild(div);
            });

            // If it's a barrel roll query, unleash the hell functions
            if (isBarrelRoll) {
                triggerChaosAnimation();
            }

        } else {
            resultsDiv.innerHTML = "<p>No results found on Loaigle.</p>";
        }
    } catch (err) {
        resultsDiv.innerHTML = "<p>Error fetching results. Try again!</p>";
    }
}

// 🎰 Matrix Scrambling & Barrel Roll Logic
function triggerChaosAnimation() {
    // Add the spin class to the whole page
    document.body.classList.add("spin-animation");
    
    // Remove the spin class after 1 second so they can do it again
    setTimeout(() => {
        document.body.classList.remove("spin-animation");
    }, 1000);

    const results = document.querySelectorAll(".result");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    results.forEach(result => {
        const linkElement = result.querySelector(".result-link");
        const snippetElement = result.querySelector(".result-snippet");
        
        const origTitle = result.dataset.originalTitle;
        const origSnippet = result.dataset.originalSnippet;
        const origLink = result.dataset.originalLink;

        // 1. Instantly turn links into broken gibberish text AND rewrite href attributes
        let scrambledTitle = "";
        let scrambledSnippet = "";
        for(let i=0; i<origTitle.length; i++) scrambledTitle += chars[Math.floor(Math.random() * chars.length)];
        for(let i=0; i<origSnippet.length; i++) scrambledSnippet += chars[Math.floor(Math.random() * chars.length)];
        
        linkElement.innerText = scrambledTitle;
        snippetElement.innerText = scrambledSnippet;
        
        // Roulette: Clicking right now goes to literal gibberish URL strings
        linkElement.href = `https://${scrambledTitle.substring(0,8)}.com/error-broken-link`;

        // 2. Slow terminal Matrix correction effect
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
                // Restore functionality fully
                linkElement.innerText = origTitle;
                snippetElement.innerText = origSnippet;
                linkElement.href = origLink;
            }
        }, 30);
    });
}
