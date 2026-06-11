let currentDomain = null;
let timer = null;

const distractingSites = [
  "youtube.com",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "x.com",
];

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

function saveOneSecond(domain) {
  if (!domain) return;

  chrome.storage.local.get(["usageData"], (result) => {
    const usageData = result.usageData || {};
    usageData[domain] = (usageData[domain] || 0) + 1;
    chrome.storage.local.set({ usageData });
  });
}

function startTracking(domain) {
  if (!domain) return;

  currentDomain = domain;

  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    saveOneSecond(currentDomain);
  }, 1000);
}

function checkBlockedSite(tabId, url) {
  const domain = getDomain(url);

  chrome.storage.local.get(["blockedSites"], (result) => {
    const blockedSites = result.blockedSites || distractingSites;

    if (domain && blockedSites.some((site) => domain.includes(site))) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL("blocked.html"),
      });
    }
  });
}

function updateActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!tab || !tab.url) return;

    const domain = getDomain(tab.url);

    startTracking(domain);
    checkBlockedSite(tab.id, tab.url);
  });
}

chrome.tabs.onActivated.addListener(() => {
  updateActiveTab();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active && tab.url) {
    const domain = getDomain(tab.url);
    startTracking(domain);
    checkBlockedSite(tabId, tab.url);
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    if (timer) clearInterval(timer);
    return;
  }

  updateActiveTab();
});

chrome.runtime.onInstalled.addListener(() => {
  updateActiveTab();
});

chrome.runtime.onStartup.addListener(() => {
  updateActiveTab();
});