
var tabIndex = {};

// Move all new tabs to the end, assuming you have fewer than 9,999 tabs open
chrome.tabs.onCreated.addListener((newTab) => {
	chrome.tabs.move(newTab.id, { "index": 9999 });
});

// Store the position of the selected tab in the tab index
// Use the active Chrome window's id as the index key property
chrome.tabs.onActivated.addListener((objWin) => {
	chrome.tabs.get(objWin.tabId, function(selectedTab) {
		tabIndex[objWin.windowId] = selectedTab.index;
	});
});