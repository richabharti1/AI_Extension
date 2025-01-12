const openaiKey = process.env.OPEN_API_KEY;

chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
        id: 'send-to-chatgpt', // Unique ID for the menu item
        title: 'Describe Image', // Text shown in the context menu
        contexts: ['image'], // Show only when text is selected
    });
});

// Handle clicks on the context menu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'send-to-chatgpt' && info.mediaType === 'image') {
        await getImageDescription(info.srcUrl);
    }
});

async function getImageDescription(imageUrl) {

    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    'role': 'user',
                    'content': [
                        {'type': 'text', 'text': 'Describe the image'},
                        {
                            'type': 'image_url',
                            'image_url': {
                                'url': imageUrl,
                            },
                        },
                    ],
                },
            ],
        }),
    });

    const data = await response.json();
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                content: 'imageDescription',
                description: data.choices[0].message.content,
            });
        }
    });
    return;
}
