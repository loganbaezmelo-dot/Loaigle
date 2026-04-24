async function search() {
    const query = document.getElementById("searchInput").value;

    if (!query) return;

    const res = await fetch("/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();

    // 🧠 AI Summary
    document.getElementById("summary").innerText = data.summary;

    // 🔍 Results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    data.results.forEach(r => {
        const div = document.createElement("div");
        div.className = "result";

        div.innerHTML = `
            <a href="${r.link}" target="_blank">${r.title}</a>
            <p>${r.snippet}</p>
        `;

        resultsDiv.appendChild(div);
    });
}
