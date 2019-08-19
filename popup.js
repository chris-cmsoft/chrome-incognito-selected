let incognito = document.getElementById('incognito');

incognito.onclick = function(element) {
  chrome.windows.getCurrent(function(window){
    chrome.tabs.query({highlighted: true, windowId: window.id}, function(tabs){
      var tabUrls = [];
      var tabIds = [];
      for (i=0; i< tabs.length; i++) {
        tabUrls.push(tabs[i].url);
        tabIds.push(tabs[i].id);
      }
      chrome.tabs.remove(tabIds);
      var hasIncognitoWindow = false;
      chrome.windows.getAll(function(windows){
        var incognitoWindow = false;
        /**
         * Check whether there is already a incognito window open.
         * Prevents the exntension from opening multiple windows. 
         * To make this work you have to activate the extension for incognito mode as well in extension settings.
         */
        windows.forEach(function(window){
          if (window.incognito) {
            incognitoWindow = window.id;
          }
        })
        /**
         * Open tabs in existing incognito window. Else create one.
         * Probably hacky if statement, but this is a `as little effort as possible` extension
         */
        if (incognitoWindow != null && incognitoWindow != undefined) {
          tabUrls.forEach(function(url) {
            chrome.tabs.create({windowId: incognitoWindow, url: url})
          });
          chrome.windows.update(incognitoWindow, {focused: true})
        } else {
          chrome.windows.create({
            incognito: true,
            url: tabUrls,
          }, function(window) {
            chrome.windows.update(window.id, {focused: true})
          })
        }
      })
    })
  })
}
