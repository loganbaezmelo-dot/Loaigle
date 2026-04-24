export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { query } = req.body;

    try {
        // 🔍 Placeholder search results
        const results = [
            {
                title: "Welcome to Loaigle",
                link: "https://example.com",
                snippet: "This is a sample search result."
            },
            {
                title: "Build your own search engine",
                link: "https://example.com",
                snippet: "Learn how Loaigle works step by step."
            }
        ];

        // 🧠 AI summary (placeholder for Gemini/OpenAI)
        let summary = `Loaigle AI summary for "${query}". This will become smarter soon.`;

        // 🔥 Easter Eggs
        const q = query.toLowerCase();

        if (q === "6 7") {
            summary = "Massive.";
        }

        if (q.includes("who is the best")) {
            summary = "Probably you.";
        }

        if (q.includes("loaigle vs google")) {
            summary = "Loaigle: built by Logan. Google: built by thousands. Still, we rise.";
        }

        res.status(200).json({
            summary,
            results
        });

    } catch (err) {
        res.status(500).json({ error: "Search failed" });
    }
}
