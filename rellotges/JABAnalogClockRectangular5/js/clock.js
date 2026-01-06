const clock = document.getElementById('clock');
const hHand = document.getElementById('h-hand');
const mHand = document.getElementById('m-hand');
const sHand = document.getElementById('s-hand');
const tempEl = document.getElementById('temp');
const dateEl = document.getElementById('date');

const GEOM = {
    marks:   { x: 8,  y: 8  },
    numbers: { x: 35, y: 35 },
    hands: [
        { x: 40, y: 60 },
        { x: 30, y: 45 },
        { x: 20, y: 30 }
    ]
};

function ellipseDist(sin, cos, a, b) {
    return (a * b) / Math.sqrt((b * sin) * (b * sin) + (a * cos) * (a * cos));
}

async function fetchWeather() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true"
        );
        const data = await res.json();
        const temp = Math.round(data.current_weather.temperature);
        tempEl.innerText = temp + "°C";

        // Colors suaus i lluminosos
        if (temp <= 4) {
            tempEl.style.color = "#4d7cfe"; // Blau suau
        } else if (temp >= 30) {
            tempEl.style.color = "#ff6b6b"; // Vermell suau/coral
        } else {
            tempEl.style.color = "var(--text)";
        }
    } catch {
        tempEl.innerText = "--°C";
    }
}

function drawFace() {
    document.querySelectorAll('.num, .mark').forEach(e => e.remove());
    const W = window.innerWidth / 2;
    const H = window.innerHeight / 2;

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

    for (let i = 1; i <= 12; i++) {
        const rad = i * 30 * Math.PI / 180;
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);
        const a = W - GEOM.numbers.x;
        const b = H - GEOM.numbers.y;
        const dist = ellipseDist(sin, cos, a, b);

        const n = document.createElement('div');
        n.className = 'num';
        n.id = `num-${i}`;
        n.innerText = i;
        n.style.left = (W + sin * dist - 30) + 'px';
        n.style.top = (H - cos * dist - 30) + 'px';
        clock.appendChild(n);
    }
}

function update() {
    const now = new Date();
    const W = window.innerWidth / 2;
    const H = window.innerHeight / 2;

    const ms = now.getMilliseconds();
    const mins = now.getMinutes();
    const hours = now.getHours();

    // Moviment suau continu
    const smoothSec = now.getSeconds() + ms / 1000;
    const smoothMin = mins + smoothSec / 60;
    const smoothHour = (hours % 12) + smoothMin / 60;

    const angles = [smoothHour * 30, smoothMin * 6, smoothSec * 6];
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

    // Lògica número de l'hora en vermell quan és l'hora en punt
    const currentHourLabel = (hours % 12) || 12;
    document.querySelectorAll('.num').forEach(n => {
        if (mins === 0 && n.id === `num-${currentHourLabel}`) {
            n.style.color = "var(--accent)";
        } else {
            n.style.color = "var(--text)";
        }
    });

    const dies = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];
    dateEl.innerText = `${dies[now.getDay()]} ${now.getDate()}`;
}

window.onresize = () => { drawFace(); update(); };
drawFace();
update();
fetchWeather();

setInterval(update, 16); // 60 fps per a moviment suau
setInterval(fetchWeather, 900000); // 15 minuts

let lastTap = 0;
clock.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen();
        }
    }
    lastTap = now;
});