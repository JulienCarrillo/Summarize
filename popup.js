chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let apiKey = null;
    let maxTokens = null;
    let langue = null;
    
    chrome.storage.local.get(['api_key', 'max_tokens', 'langue'], function(data) {
        apiKey = data.api_key;
        maxTokens = parseInt(data.max_tokens);
        langue = data.langue;
    });
    
    const url = tabs[0].url;
    const form = document.getElementById('api-form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("Clé API : " + apiKey);
        console.log("Max Tokens : " + maxTokens);
        console.log("Langue : " + langue);
        console.log(typeof(maxTokens))

        switch (langue) {
            case "fr":
                contentLanguage = "Résumez la page suivante : ";
              break;
            case "en":
                contentLanguage = "Summarize the next page : ";
              break;
            case "es":
                contentLanguage = "Resumir la página siguiente : ";
              break;
            default:
                contentLanguage = "Summarize the next page : ";
             
        }
        fetch("https://api.openai.com/v1/chat/completions", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            },
            "body": JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: contentLanguage + url}],
                max_tokens: maxTokens,
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.choices && data.choices.length > 0) {
                const summary = data.choices[0].message.content;
                console.log(summary);
                document.getElementById("summary").textContent = summary;
            } else {
                console.error("Aucune réponse disponible");
            }
        })
        .catch(error => console.error(error));
    });
});
