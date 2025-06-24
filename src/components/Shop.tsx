import React, { useState, useEffect, useRef } from "react";
import usePersistentState from "./usePersistentState";
import ResetButton from "./ResetButton";
import "../css/Shop.css";

interface Upgrade {
  id: number;
  name: string;
  price: number;
  multiplierIncrease: number;
  autoClickRate?: number;
}

interface Clone {
  id: number;
  rotation: string;
  xOffset: number;
}

const upgrades: Upgrade[] = [
  { id: 1, name: "Finger Strength", price: 25, multiplierIncrease: 0.3 },
  { id: 2, name: "Iron Fingers", price: 120, multiplierIncrease: 1.5 },
  { id: 3, name: "Robot Hand", price: 600, multiplierIncrease: 5 },
  { id: 4, name: "Advanced Fingers", price: 1800, multiplierIncrease: 8 },
  {
    id: 5,
    name: "Click Bot",
    price: 1500,
    multiplierIncrease: 0,
    autoClickRate: 0.25,
  },
  {
    id: 6,
    name: "Auto Clicker 3000",
    price: 6500,
    multiplierIncrease: 0,
    autoClickRate: 1.5,
  },
  {
    id: 7,
    name: "Mega Click Bot",
    price: 14000,
    multiplierIncrease: 0,
    autoClickRate: 6,
  },
  {
    id: 8,
    name: "Click Factory",
    price: 30000,
    multiplierIncrease: 0,
    autoClickRate: 7,
  },
  {
    id: 9,
    name: "Click Mine",
    price: 80000,
    multiplierIncrease: 0,
    autoClickRate: 30,
  },
  { id: 10, name: "Quantum Finger", price: 200000, multiplierIncrease: 25 },
  { id: 11, name: "Finger Galaxy", price: 750000, multiplierIncrease: 50 },
  {
    id: 12,
    name: "Infinity Clicker",
    price: 1500000,
    multiplierIncrease: 0,
    autoClickRate: 100,
  },
  { id: 13, name: "Fingularity Core", price: 5000000, multiplierIncrease: 150 },
  { id: 14, name: "God Finger", price: 12000000, multiplierIncrease: 300 },
  {
    id: 15,
    name: "Multiversal Bot",
    price: 25000000,
    multiplierIncrease: 0,
    autoClickRate: 500,
  },
  {
    id: 16,
    name: "Singularity Farm",
    price: 60000000,
    multiplierIncrease: 0,
    autoClickRate: 1000,
  },
  {
    id: 17,
    name: "Dark Matter Fingers",
    price: 150000000,
    multiplierIncrease: 1000,
  },
  { id: 18, name: "Fingerverse", price: 500000000, multiplierIncrease: 3000 },
];

const Shop: React.FC = () => {
  const [clicks, setClicks] = usePersistentState<number>("clicks", 0);
  const [multiplier, setMultiplier] = usePersistentState<number>(
    "multiplier",
    1
  );
  const [owned, setOwned] = usePersistentState<Record<number, number>>(
    "owned",
    {}
  );
  const [clones, setClones] = useState<Clone[]>([]);
  const [, setManualClicksTimestamps] = useState<number[]>([]);

  const clickSound = useRef<HTMLAudioElement | null>(null);
  const upgradeSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/sounds/button_004.mp3");
    clickSound.current.volume = 0.1;

    upgradeSound.current = new Audio("/sounds/button_005.mp3");
    upgradeSound.current.volume = 0.2;
  }, []);

  const totalAutoClickRate = upgrades.reduce((acc, upg) => {
    const count = owned[upg.id] || 0;
    return acc + (upg.autoClickRate ? upg.autoClickRate * count : 0);
  }, 0);

  const totalAutoClickRateRef = useRef(totalAutoClickRate);
  totalAutoClickRateRef.current = totalAutoClickRate;

  useEffect(() => {
    if (totalAutoClickRate === 0) return;

    const interval = setInterval(() => {
      setClicks((prev) => prev + totalAutoClickRateRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalAutoClickRate]);

  const [manualCPS, setManualCPS] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setManualClicksTimestamps((timestamps) => {
        const filtered = timestamps.filter((ts) => now - ts <= 1000);
        setManualCPS(filtered.length * multiplier);
        return filtered;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [multiplier]);

  const combinedCPS = manualCPS + totalAutoClickRate;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch((e) => console.warn("Sound error:", e));
    }

    setClicks((c) => c + multiplier);
    const buttonWidth = buttonRef.current?.offsetWidth || -150;
    const rotation = (Math.random() * 60 - 30).toFixed(1);
    const xOffset = Math.random() * (buttonWidth * 0.8);
    const id = Date.now();

    setClones((old) => [...old, { id, rotation, xOffset }]);
    setTimeout(() => {
      setClones((old) => old.filter((clone) => clone.id !== id));
    }, 800);
    setManualClicksTimestamps((old) => [...old, Date.now()]);
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const count = owned[upgrade.id] || 0;
    const price = Math.floor(upgrade.price * 1.15 ** count);
    if (clicks >= price) {
      if (upgradeSound.current) {
        upgradeSound.current.currentTime = 0;
        upgradeSound.current
          .play()
          .catch((e) => console.warn("Upgrade sound error:", e));
      }

      setClicks((c) => c - price);
      setMultiplier((m) => m + upgrade.multiplierIncrease);
      setOwned((o) => ({ ...o, [upgrade.id]: count + 1 }));
    } else {
      alert("Not enough clicks!");
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-sidebar">
        <h3>Upgrades</h3>
        <ul className="shop-upgrades-list">
          {upgrades.map((upg) => {
            const count = owned[upg.id] || 0;
            const price = Math.floor(upg.price * 1.15 ** count);
            const affordable = clicks >= price;

            return (
              <li key={upg.id} className="shop-upgrade-item">
                <button
                  className="shop-upgrade-button"
                  disabled={!affordable}
                  onClick={() => affordable && buyUpgrade(upg)}
                >
                  Buy {upg.name}{" "}
                  {upg.multiplierIncrease > 0 &&
                    `( +${upg.multiplierIncrease} per click )`}
                  {upg.autoClickRate && `( +${upg.autoClickRate} clicks/sec )`}{" "}
                  — {price} clicks {count > 0 && `(Owned: ${count})`}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shop-center">
        <h2>Clicks: {clicks.toFixed(2)}</h2>
        <div className={`shop-clicks ${combinedCPS > 0 ? "active" : ""}`}>
          Clicks per second: <strong>{combinedCPS.toFixed(2)}</strong>{" "}
          <span style={{ fontSize: "0.7rem", color: "#aaa" }}>
            (Auto: {totalAutoClickRate.toFixed(2)} + Manual:{" "}
            {manualCPS.toFixed(2)})
          </span>
        </div>

        <div style={{ position: "relative", display: "inline-block" }}>
          <button className="shop-click-button btn" onClick={handleClick}>
            Click me (+{multiplier.toFixed(2)})
          </button>
          {clones.map(({ id, rotation, xOffset }) => (
            <span
              key={id}
              className="pop clone"
              aria-hidden="true"
              style={
                {
                  "--xOffset": `${xOffset}px`,
                  "--rotation": `${rotation}deg`,
                  animation: "popFall 1s ease forwards",
                } as React.CSSProperties
              }
            >
              +{multiplier.toFixed(2)}
            </span>
          ))}

          <ResetButton
            className="reset-button desktop-only"
            onReset={() => {
              setClicks(0);
              setMultiplier(1);
              setOwned({});
            }}
          />

          <ResetButton
            className="reset-button mobile-only"
            onReset={() => {
              setClicks(0);
              setMultiplier(1);
              setOwned({});
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
