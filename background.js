var tabIndex = {};

chrome.tabs.onCreated.addListener((newTab) => {
  // Use -1 to represent the last position
  chrome.tabs.move(newTab.id, { index: -1 });
});

// Store the position of the selected tab in the tab index.
// Use the active Chrome window's id as the index key property.
chrome.tabs.onActivated.addListener((activeInfo) => {
  // Use chrome.tabs.get with a callback to handle potential errors.
  chrome.tabs.get(activeInfo.tabId, (selectedTab) => {
    // Check if the tab exists before accessing its properties.
    if (chrome.runtime.lastError) {
      console.error("Error getting tab:", chrome.runtime.lastError);
      return;
    }

    if (selectedTab) {
      tabIndex[activeInfo.windowId] = selectedTab.index;
    } else {
      // Handle cases where the tab might have been closed.
      console.warn("Tab with ID", activeInfo.tabId, "not found.");
      delete tabIndex[activeInfo.windowId];
    }
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // If a window is closed, removeInfo.windowId will be available
    if (removeInfo.windowId && tabIndex.hasOwnProperty(removeInfo.windowId)) {
        //If the whole window is being closed, delete the entry
        if (removeInfo.isWindowClosing) {
            delete tabIndex[removeInfo.windowId];
        }
    }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (tabIndex.hasOwnProperty(windowId)) {
    delete tabIndex[windowId];
  }
});
