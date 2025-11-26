import React, { useEffect, useState } from "react";
import "./Game.css";

// resim objesi
interface GorselTipi {
  id: number;
  link: string;
  ai: boolean;
}

const Game = () => {

  const [mod, setMod] = useState("menu"); 
  const [gorseller, setGorseller] = useState<GorselTipi[]>([]);
  const [mesaj, setMesaj] = useState<string | null>(null);
  const [ipucu, setIpucu] = useState<string | null>(null);
  const [hak, setHak] = useState(0);
  const [sure, setSure] = useState(10);
  const [sayacAcik, setSayacAcik] = useState(false);

  console.log("mod:", mod, "mesaj:", mesaj, "hak:", hak);

  // resimleri yükleme
  const resimleriGetir = () => {
    const yeni = [
      { id: 1, link: "https://picsum.photos/250?rnd=" + Math.random(), ai: false },
      { id: 2, link: "https://picsum.photos/250?rnd=" + Math.random(), ai: false },
      { id: 3, link: "https://thispersondoesnotexist.com/?t=" + Math.random(), ai: true }
    ];
    setGorseller(yeni);
  };

  // mod açıldığında oyunu sıfırla
  useEffect(() => {
    if (mod === "classic" || mod === "timed") {
      resimleriGetir();
      setMesaj(null);
      setIpucu(null);
      setHak(0);
      setSure(10);
      setSayacAcik(mod === "timed");
    }
  }, [mod]);

  // süre sayacı
  useEffect(() => {
    if (!sayacAcik || mesaj) return;

    let zamanlayici = setInterval(() => {
      setSure((kalan) => {
        if (kalan <= 1) {
          clearInterval(zamanlayici);
          setMesaj("Süre bitti! Kaybettin.");
          return 0;
        }
        return kalan - 1;
      });
    }, 1000);

    return () => clearInterval(zamanlayici);
  }, [sayacAcik, mesaj]);

  // resim seçildiğinde
  const secimYap = (aiMi: boolean) => {
    if (mesaj) return; // oyun bitmişse tıklama kapansın

    if (hak === 0) {
      if (aiMi) {
        setMesaj("Tebrikler, ilk denemede bildin");
      } else {
        setIpucu("İpucu: yüz oranlarına biraz bakabilirsin.");
        setHak(1);
      }
      return;
    }

    if (hak === 1) {
      if (aiMi) {
        setMesaj("İkinci denemede doğruyu buldun!");
      } else {
        setMesaj("Olmadı... Oyun bitti");
      }
      setIpucu(null);
      setHak(2);
    }
  };

  const yenidenBaslat = () => {
    resimleriGetir();
    setMesaj(null);
    setIpucu(null);
    setHak(0);
    setSure(10);
    setSayacAcik(mod === "timed");
  };

  // ----------------- EKRAN -----------------------

  if (mod === "menu") {
    return (
      <div className="menu-container">
        <h1>Oyun Modu Seç</h1>
        <button onClick={() => setMod("classic")} className="menu-btn">Klasik Mod</button>
        <button onClick={() => setMod("timed")} className="menu-btn">Süreli Mod</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2>Hangisi Yapay Zeka Üretimi?</h2>

      {mod === "timed" && !mesaj && (
        <div className="timer-gosterge">
          Kalan Süre: <b>{sure}</b> sn
        </div>
      )}

      <div className="image-grid">
        {gorseller.map((g) => (
          <img
            key={g.id}
            src={g.link}
            onClick={() => secimYap(g.ai)}
            className="game-img"
          />
        ))}
      </div>

      {ipucu && <div className="hint">{ipucu}</div>}
      {mesaj && <div className="sonuc">{mesaj}</div>}

      {mesaj && (
        <button className="restart-btn" onClick={yenidenBaslat}>
          Tekrar Oyna
        </button>
      )}

      <button className="geri-btn" onClick={() => setMod("menu")}>Menüye Dön</button>
    </div>
  );
};

export default Game;
