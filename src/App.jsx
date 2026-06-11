import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [usageData, setUsageData] = useState({});
  const [blockedSites, setBlockedSites] = useState([]);
  const [site, setSite] = useState("");

  const defaultBlockedSites = [
    "youtube.com",
    "facebook.com",
    "instagram.com",
    "twitter.com",
    "x.com"
  ];

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["usageData", "blockedSites"], (result) => {
        setUsageData(result.usageData || {});
        setBlockedSites(result.blockedSites || defaultBlockedSites);
      });
    }
  }, []);

  const addBlockedSite = () => {
    if (!site.trim()) return;

    const updatedSites = [...blockedSites, site.trim()];

    setBlockedSites(updatedSites);
    setSite("");

    chrome.storage.local.set({
      blockedSites: updatedSites
    });
  };

  const removeBlockedSite = (siteName) => {
    const updatedSites = blockedSites.filter((s) => s !== siteName);

    setBlockedSites(updatedSites);

    chrome.storage.local.set({
      blockedSites: updatedSites
    });
  };

  const clearData = () => {
    chrome.storage.local.set({ usageData: {} });
    setUsageData({});
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    if (min === 0) return `${sec}s`;
    return `${min}m ${sec}s`;
  };

  const totalTime = Object.values(usageData).reduce(
    (sum, time) => sum + time,
    0
  );

  const distractingTime = Object.entries(usageData).reduce(
    (sum, [domain, time]) => {
      const isDistracting = blockedSites.some((site) =>
        domain.includes(site)
      );

      return isDistracting ? sum + time : sum;
    },
    0
  );

  const productiveTime = totalTime - distractingTime;

  return (
    <div className="app">
      <header>
        <h1>FocusTrack</h1>
        <p>Productivity Manager</p>
      </header>

      <div className="summary">
        <div>
          <h3>Total</h3>
          <p>{formatTime(totalTime)}</p>
        </div>

        <div>
          <h3>Productive</h3>
          <p>{formatTime(productiveTime)}</p>
        </div>

        <div>
          <h3>Distracting</h3>
          <p>{formatTime(distractingTime)}</p>
        </div>
      </div>

      <section>
        <h2>Website Usage</h2>

        {Object.keys(usageData).length === 0 ? (
          <p className="empty">No usage tracked yet.</p>
        ) : (
          Object.entries(usageData).map(([domain, time]) => (
            <div className="usage-card" key={domain}>
              <span>{domain}</span>
              <strong>{formatTime(time)}</strong>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Blocked Sites</h2>

        <div className="input-box">
          <input
            type="text"
            placeholder="example.com"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />

          <button onClick={addBlockedSite}>Add</button>
        </div>

        {blockedSites.map((item) => (
          <div className="blocked-card" key={item}>
            <span>{item}</span>
            <button onClick={() => removeBlockedSite(item)}>Remove</button>
          </div>
        ))}
      </section>

      <button className="clear-btn" onClick={clearData}>
        Clear Report
      </button>
    </div>
  );
}

export default App;