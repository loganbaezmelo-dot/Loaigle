export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { query } = req.body;

    try {
        const response = await fetch(
            `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`
        );

        const html = await response.text();

        // 🧠 Extract results using simple regex
        const matches = [...html.matchAll(/<a rel="nofollow" class="result-link" href="(.*?)">(.*?)<\/a>/g)];

        const results = matches.slice(0, 5).map(m => ({
            title: m[2].replace(/<.*?>/g, ""),
            link: m[1],
            snippet: "Result from DuckDuckGo"
        }));

        let summary = `Top results for "${query}"`;

        // 🔥 Easter eggs
        const q = query.toLowerCase();
        if (q === "6 7") summary = "Massive.";
        if (q.includes("who is the best")) summary = "Probably you.";

        res.status(200).json({
            summary,
            results
        });

    } catch (err) {
        res.status(500).json({ error: "Search failed" });
    }
}        
