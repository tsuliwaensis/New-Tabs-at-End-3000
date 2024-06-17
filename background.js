
var tabIndex = {};

console.log("Waiting 3 seconds to enable New Tabs at End 3000...");

function addListeners() {
  console.log("Adding listeners for New Tabs at End 3000...");

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
}

// Delay loading by 3 seconds before adding listeners
setTimeout(() => {
  addListeners();
}, 3000);



// When a tab is removed, select the tab to its left
/*chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	if (!removeInfo.isWindowClosing) {
		chrome.tabs.query({}, function(objTabs) {
		try{
			// Sometimes closing the last tab / window doesn't set isWindowClosing to true
			if (typeof objTabs === "undefined") {
				console.log(removeInfo);
				return;
			}

			// Get the active Chrome window's id. This is the property of tab index
			var activeWindowId = objTabs[0].windowId;
			var selectedTab = 0;

			console.log("OnRemoved: ");
			console.log(objTabs);
			console.log(tabIndex);

			if (activeWindowId in tabIndex) {
				selectedTab = tabIndex[activeWindowId];
			}
			console.log("selectedTab: " + selectedTab);
			console.log("tab length: " + objTabs.length);
			//if (objTabs.length <= selectedTab) {
			if (objTabs.length >= 2) {
				chrome.tabs.update(objTabs[objTabs.length - 1].id, { selected: true });
			} else {
				chrome.tabs.update(objTabs[0].id, { selected: true });
			}
		} catch(e) {
			console.log("error");
			console.log(e);
			console.log(objTabs);
		}
		});
	}
}
});*/
