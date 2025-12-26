const clock = document.getElementById('clock');
const hHand = document.getElementById('h-hand');
const mHand = document.getElementById('m-hand');
const sHand = document.getElementById('s-hand');
const tempEl = document.getElementById('temp');
const dateEl = document.getElementById('date');

// 1. Obtenir temperatura de Seva
async function fetchWeather() {
    try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true");
        const data = await res.json();
        tempEl.innerText = Math.round(data.current_weather.temperature) + "°C";
    } catch (e) { tempEl.innerText = "--°C"; }
}

// 2. Dibuixar marques i números
function drawFace() {
    document.querySelectorAll('.num, .mark').forEach(e => e.remove());
    const W = window.innerWidth / 2;
    const H = window.innerHeight / 2;

    // Marques minuts
    for (let i = 0; i < 60; i++) {
        const rad = (i * 6) * (Math.PI / 180);
        const s = Math.sin(rad), c = Math.cos(rad);
        const dist = Math.min((W - 15) / Math.abs(s || 0.001), (H - 15) / Math.abs(c || 0.001));
        const m = document.createElement('div');
        m.className = 'mark';
        m.style.width = (i % 5 === 0) ? '4px' : '2px';
        m.style.height = (i % 5 === 0) ? '20px' : '10px';
        m.style.left = (W + s * dist) + 'px';
        m.style.top = (H - c * dist) + 'px';
        m.style.transform = `translate(-50%, -50%) rotate(${i * 6}deg)`;
        clock.appendChild(m);
    }

    // Números
    for (let i = 1; i <= 12; i++) {
        const rad = (i * 30) * (Math.PI / 180);
        const s = Math.sin(rad), c = Math.cos(rad);
        const dist = Math.min((W - 70) / Math.abs(s || 0.001), (H - 90) / Math.abs(c || 0.001));
        const n = document.createElement('div');
        n.className = 'num';
        n.innerText = i;
        n.style.left = (W + s * dist - 30) + 'px';
        n.style.top = (H - c * dist - 30) + 'px';
        clock.appendChild(n);
    }
}

// 3. Actualitzar manetes amb longitud elàstica
function update() {
    const now = new Date();
    const s = now.getSeconds(), m = now.getMinutes(), h = now.getHours();
    const W = window.innerWidth / 2, H = window.innerHeight / 2;

    const angles = [
        (h % 12 * 30) + (m * 0.5), // hores
        (m * 6) + (s * 0.1),        // minuts
        (s * 6)                    // segons
    ];

    const hands = [hHand, mHand, sHand];
    const factors = [0.55, 0.82, 0.95]; // proporció de llargada
    const widths = [5, 3, 1]; // meitat de l'amplada per centrar

    angles.forEach((deg, i) => {
        const rad = deg * (Math.PI / 180);
        const sVal = Math.abs(Math.sin(rad)), cVal = Math.abs(Math.cos(rad));
        // Llargada màxima sense tocar números (marges seguretat 120 i 140)
        const len = Math.min((W - 120) / (sVal || 0.001), (H - 140) / (cVal || 0.001)) * factors[i];

        hands[i].style.height = len + 'px';
        hands[i].style.transform = `translateX(-50%) rotate(${deg}deg)`;
        // El margin-left de -50% i el translateX centren les manetes perfectament
    });

    const dies = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'];
    dateEl.innerText = `${dies[now.getDay()]} ${now.getDate()}`;
}

// 4. Tema i Events
document.getElementById('theme-toggle').onclick = (e) => {
    const t = e.target.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', t);
};

window.onresize = () => { drawFace(); update(); };
drawFace();
update();
fetchWeather();
setInterval(update, 1000);
setInterval(fetchWeather, 600000);