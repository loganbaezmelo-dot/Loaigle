export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { query } = req.body;

    try {
        const response = await fetch(
            `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
        );

        const data = await response.json();

        // 🧠 Summary
        const summary =
            data.AbstractText ||
            data.Answer ||
            `No instant summary for "${query}".`;

        // 🔍 FIXED results handling (IMPORTANT CHANGE)
        let results = [];

        if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
            data.RelatedTopics.forEach(item => {
                if (item.Text && item.FirstURL) {
                    results.push({
                        title: item.Text,
                        link: item.FirstURL,
                        snippet: item.Text
                    });
                }

                // sometimes nested
                if (item.Topics) {
                    item.Topics.forEach(sub => {
                        if (sub.Text && sub.FirstURL) {
                            results.push({
                                title: sub.Text,
                                link: sub.FirstURL,
                                snippet: sub.Text
                            });
                        }
                    });
                }
            });
        }

        // limit results
        results = results.slice(0, 5);

        res.status(200).json({
            summary,
            results
        });

    } catch (err) {
        res.status(500).json({ error: "Search failed" });
    }
}
