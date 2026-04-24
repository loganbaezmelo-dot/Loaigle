async function search() {
    const query = document.getElementById("searchInput").value;

    const res = await fetch("/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();

    console.log("API RESPONSE:", data); // 🔥 IMPORTANT DEBUG

    // 🧠 FIX: prevent undefined crash
    document.getElementById("summary").innerText =
        data.summary || "No summary available";

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!data.results || data.results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
        return;
    }

    data.results.forEach(r => {
        const div = document.createElement("div");

        div.innerHTML = `
            <a href="${r.link}" target="_blank">
                ${r.title || "No title"}
            </a>
            <p>${r.snippet || ""}</p>
        `;

        resultsDiv.appendChild(div);
    });
}
