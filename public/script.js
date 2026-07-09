async function search() {
    // Force the browser to read the absolute latest value from the input field
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim();
    if (!query) return;

    const dictionaryDiv = document.getElementById("dictionary-box");
    const resultsDiv = document.getElementById("results");
    
    // Clear the UI completely so old content can't hang
    dictionaryDiv.innerHTML = "";
    resultsDiv.innerHTML = "<p style='color: #bdc1c6;'>Searching Loaigle...</p>";

    const triggerPhrases = [
        "do a barrel roll", "do a barrel roll please", 
        "can you do a barrel roll", "barrel roll", 
        "do a flip", "spin the screen", "make it spin"
    ];
    const isBarrelRoll = triggerPhrases.includes(query.toLowerCase());

    // 📖 1. Dictionary Lookup
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

    // 📰 2. News Search (Adding a cache-busting timestamp so the first click never uses stale data)
    try {
        const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
        const timestamp = new Date().getTime();
        const rss2json = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsUrl)}&_cb=${timestamp}`;
        
        const res = await fetch(rss2json);
        if (!res.ok) throw new Error("Network response failed");
        
        const data = await res.json();

        // Wipe the "Searching Loaigle..." loader text
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

            if (isBarrelRoll) {
                triggerChaosAnimation();
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
