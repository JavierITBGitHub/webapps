const clock = document.getElementById('clock');
const hHand = document.getElementById('h-hand');
const mHand = document.getElementById('m-hand');
const sHand = document.getElementById('s-hand');
const tempEl = document.getElementById('temp');
const dateEl = document.getElementById('date');

/* ─────────────────────────────
   GEOMETRIA EL·LÍPTICA COMUNA
───────────────────────────── */

const GEOM = {
    marks:   { x: 40,  y: 60  },
    numbers: { x: 70,  y: 110 },
    hands: [
        { x: 130, y: 200 }, // hores
        { x: 105, y: 175 }, // minuts
        { x: 90,  y: 160 }  // segons
    ]
};

// ─────── UTILITAT EL·LÍPTICA ───────
function ellipseDist(sin, cos, a, b) {
    return (a * b) / Math.sqrt(
        (b * sin) * (b * sin) +
        (a * cos) * (a * cos)
    );
}

// ─────── TEMPERATURA ───────
async function fetchWeather() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true"
        );
        const data = await res.json();
        tempEl.innerText = Math.round(data.current_weather.temperature) + "°C";
    } catch {
        tempEl.innerText = "--°C";
    }
}

// ─────── DIBUIX CARA ───────
function drawFace() {
    document.querySelectorAll('.num, .mark').forEach(e => e.remove());

    const W = window.innerWidth / 2;
    const H = window.innerHeight / 2;

    // Marques
    for (let i = 0; i < 60; i++) {
        const rad = i * 6 * Math.PI / 180;
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);

        const a = W - GEOM.marks.x;
        const b = H - GEOM.marks.y;
        const dist = ellipseDist(sin, cos, a, b);

        const m = document.createElement('div');
        m.className = 'mark';
        m.style.width = i % 5 === 0 ? '4px' : '2px';
        m.style.height = i % 5 === 0 ? '20px' : '10px';
        m.style.left = (W + sin * dist) + 'px';
        m.style.top = (H - cos * dist) + 'px';
        m.style.transform = `translate(-50%, -50%) rotate(${i * 6}deg)`;

        clock.appendChild(m);
    }

    // Números
    for (let i = 1; i <= 12; i++) {
        const rad = i * 30 * Math.PI / 180;
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);

        const a = W - GEOM.numbers.x;
        const b = H - GEOM.numbers.y;
        const dist = ellipseDist(sin, cos, a, b);

        const n = document.createElement('div');
        n.className = 'num';
        n.innerText = i;
        n.style.left = (W + sin * dist - 30) + 'px';
        n.style.top = (H - cos * dist - 30) + 'px';

        clock.appendChild(n);
    }
}

// ─────── MANETES ───────
function update() {
    const now = new Date();
    const W = window.innerWidth / 2;
    const H = window.innerHeight / 2;

    const angles = [
        (now.getHours() % 12) * 30 + now.getMinutes() * 0.5,
        now.getMinutes() * 6 + now.getSeconds() * 0.1,
        now.getSeconds() * 6
    ];

    const hands = [hHand, mHand, sHand];
    const factors = [0.55, 0.82, 0.95];

    angles.forEach((deg, i) => {
        const rad = deg * Math.PI / 180;
        const sin = Math.abs(Math.sin(rad));
        const cos = Math.abs(Math.cos(rad));
        const g = GEOM.hands[i];

        const a = W - g.x;
        const b = H - g.y;
        const len = ellipseDist(sin, cos, a, b) * factors[i];

        hands[i].style.height = len + 'px';
        hands[i].style.transform = `translateX(-50%) rotate(${deg}deg)`;
    });

    const dies = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];
    dateEl.innerText = `${dies[now.getDay()]} ${now.getDate()}`;
}

// ─────── EVENTS ───────
document.getElementById('theme-toggle').onclick = e =>
    document.body.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');

window.onresize = () => { drawFace(); update(); };

drawFace();
update();
fetchWeather();
setInterval(update, 1000);
setInterval(fetchWeather, 600000);
