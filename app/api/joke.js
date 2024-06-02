export default async function handler(req, res) {
    try {
        const apiUrl = "https://v2.jokeapi.dev/joke/Any";
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const joke = data.type === 'single' ? data.joke : `${data.setup}\n\n${data.delivery}`;
            res.status(200).json({ joke });
        } else {
            res.status(response.status).json({ error: `Failed to fetch joke. Status: ${response.status}` });
        }
    } catch (error) {
        console.error(`Error fetching joke: ${error}`);
        res.status(500).json({ error: "Failed to fetch joke. An unexpected error occurred." });
    }
}
