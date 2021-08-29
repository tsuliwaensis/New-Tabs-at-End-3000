
var selectedIndexes = {};

// Move all new tabs to the end, assuming you have fewer than 9,999 tabs open.
chrome.tabs.onCreated.addListener((tab) => {
	chrome.tabs.move(tab.id, { "index": 9999 });
});

// Store the currently selected tab index for each window.
chrome.tabs.onActivated.addListener((objTab) => {
	chrome.tabs.get(objTab.tabId, function(tab) {
		selectedIndexes[objTab.windowId] = tab.index;
	});
});

// When a tab is removed, select the next tab (based on that selectedIndex for that window)
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	if (!removeInfo.isWindowClosing) {
		chrome.tabs.query({}, function(tabs) {

			var windowId = tabs[0].windowId;

			if (!(windowId in selectedIndexes)) {
				selectedIndex = 0;
			} else {
				selectedIndex = selectedIndexes[windowId];
			}

			if (tabs.length <= selectedIndex) {
				chrome.tabs.update(tabs[tabs.length - 1].id, { selected : true });
			}
			else {
				chrome.tabs.update(tabs[selectedIndex].id, { selected : true });
			}
		});
	}
});