chrome.storage.local.get(['api_key', 'max_tokens', 'langue'], function(data) {
    document.getElementById('api-key').value = data.api_key;
    document.getElementById('max-tokens').value = data.max_tokens;
    document.getElementById('langue').value = data.langue;
});

// Récupération des boutons d'info
const apiKeyInfoButton = document.getElementById('info-api-key');
const maxTokensInfoButton = document.getElementById('info-max-tokens');
const languageInfoButton = document.getElementById('info-langue');

// Ajout des écouteurs d'événements sur les boutons d'info
apiKeyInfoButton.addEventListener('click', function() {
  alert('API Key is a secret code that identifies your OpenAI account. You can find it on your OpenAI dashboard.');
});

maxTokensInfoButton.addEventListener('click', function() {
  alert('Max Tokens is the maximum number of tokens that can be used in the text generation model. This setting affects the quality of the generated text.');
});

languageInfoButton.addEventListener('click', function() {
  alert('Language is the language used in the text generation model. This setting affects the quality of the generated text.');
});



document.getElementById('save-button').addEventListener('click', function() {
    var apiKey = document.getElementById('api-key').value;
    var maxtoken = document.getElementById('max-tokens').value;
    var langue = document.getElementById('langue').value;
    if (apiKey && maxtoken && langue) {
        chrome.storage.local.set({
            'api_key': apiKey,
            'max_tokens': maxtoken,
            'langue': langue
        }, function() {
            alert('Settings saved!');
        });
    }else{
        alert('fill all inputs')
    }
});
