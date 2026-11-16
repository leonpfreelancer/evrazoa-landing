import { istanbul, tours } from "@/config/content";

// Упрощённый контур Турции (стилизация как в макете)
const outline =
  "120,295 218,160 275,168 355,245 485,260 540,240 620,190 720,170 835,165 925,240 1090,275 1255,267 1330,228 1410,218 1480,252 1505,362 1590,402 1555,630 1590,653 1400,668 1220,670 1215,700 1075,690 955,700 948,760 902,800 895,750 918,720 855,720 790,700 715,760 650,780 588,730 485,692 470,735 398,760 360,720 228,678 215,595 145,547 175,490 128,430 140,375";

export default function TurkeyMap() {
  return (
    <svg viewBox="0 0 1638 900" className="map" role="img" aria-label="Карта туров по Турции из Стамбула">
      <text x="770" y="105" className="map-sea">Чёрное море</text>
      <text x="38" y="638" className="map-sea">Эгейское</text>
      <text x="38" y="680" className="map-sea">море</text>
      <text x="1040" y="845" className="map-sea">Средиземное море</text>

      <polygon points={outline} fill="#1b2e4b" stroke="#b8935a" strokeWidth="3" strokeLinejoin="round" />
      {/* Мраморное море */}
      <polygon points="175,330 265,273 360,272 420,295 362,328 265,333" fill="#13213a" stroke="#b8935a" strokeWidth="2.5" />

      {tours.map((t) => (
        <line
          key={"l" + t.n}
          x1={istanbul.x} y1={istanbul.y} x2={t.x} y2={t.y}
          stroke="#b8935a" strokeWidth="2.5" strokeDasharray="8 7" opacity="0.85"
        />
      ))}

      <circle cx={istanbul.x} cy={istanbul.y} r="14" fill="#f3ede1" stroke="#b8935a" strokeWidth="4" />
      <text x="168" y="240" className="map-city">СТАМБУЛ</text>

      {tours.map((t) => (
        <g key={t.n} className="map-pin">
          <circle cx={t.x} cy={t.y} r="22" fill="#b8935a" stroke="#0f1a2b" strokeWidth="3" />
          <text x={t.x} y={t.y + 7} textAnchor="middle" className="map-num">{t.n}</text>
        </g>
      ))}
    </svg>
  );
}
