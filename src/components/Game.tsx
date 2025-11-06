import React, { useState, useEffect } from "react";
import "./Game.css";

interface ImageData {
  id: number;
  url: string;
  isAI: boolean;
}

const Game: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const newImages: ImageData[] = [
      {
        id: 1,
        url: `https://picsum.photos/250?random=${Math.floor(Math.random() * 1000)}`,
        isAI: false,
      },
      {
        id: 2,
        url: `https://picsum.photos/250?random=${Math.floor(Math.random() * 1000)}`,
        isAI: false,
      },
      {
        id: 3,
        url: "https://thispersondoesnotexist.com/",
        isAI: true,
      },
    ];
    setImages(newImages);
  }, []);

  const handleSelect = (isAI: boolean) => {
    setResult(isAI ? "Doğru bildin 🎉" : "Yanlış tahmin 😅");
  };

  return (
    <div className="game-container">
      <h2>Hangisi Yapay Zekâ Tarafından Üretildi?</h2>

      <div className="image-grid">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt="görsel"
            className="game-image"
            onClick={() => handleSelect(img.isAI)}
          />
        ))}
      </div>

      {result && <p className="result-text">{result}</p>}
    </div>
  );
};

export default Game;
