import { useState, useEffect } from "react";

export default function Home() {
  const [driver, setDriver] = useState("");
  const [route, setRoute] = useState("");
  const [data, setData] = useState([]);

  async function send(status) {
    await fetch("/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driver, route, status })
    });

    load();
  }

  async function load() {
    const res = await fetch("/api/route");
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🚌 Bus Driver Dashboard</h1>

      <input
        placeholder="Driver name"
        onChange={(e) => setDriver(e.target.value)}
      />

      <input
        placeholder="Route number"
        onChange={(e) => setRoute(e.target.value)}
      />

      <br /><br />

      <button onClick={() => send("Started Route")}>🟢 Start Route</button>
      <button onClick={() => send("Ended Route")}>🔴 End Route</button>

      <h2>Live Logs</h2>

      {data.map((r, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          🧑 {r.driver} | 🚌 Route {r.route} | {r.status} | ⏰ {r.time}
        </div>
      ))}
    </div>
  );
}
