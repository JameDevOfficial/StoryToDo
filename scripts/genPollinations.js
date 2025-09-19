export function genImage(
    prompt,
    width = "1024",
    height = "1024",
    seed = "42",
    model = "flux",
) {
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
    return imageUrl;
}

export async function generatePrivateText(aiPrompt, model = "openai") {
    console.log("test");
    const url = `https://text.pollinations.ai/${encodeURIComponent(aiPrompt)}`;
    const fetchResponse = await fetch(url);
    const responseText = await fetchResponse.text();
    const sponsorSeparator = "\n---\n";
    const sponsorIndex = responseText.indexOf(sponsorSeparator);
    if (sponsorIndex !== -1) {
        const cleanedResponse = responseText.substring(0, sponsorIndex).trim();
        console.log(cleanedResponse);
        console.log("Removed Sponsor!");
        return cleanedResponse;
    }
    console.log(responseText);
    return responseText;
}
