chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            // Probably a bit hacky, but prevented me from having to google how to do it the `right` way.
            // Basically just activates the extension on any pages running port 80 / 443
            // If there you know of a better way to filter which pages the extension will work for, PR's are welcome.
            ports: [80, 443],
          }
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

