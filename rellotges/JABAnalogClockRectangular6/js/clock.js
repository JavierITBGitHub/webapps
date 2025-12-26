const svg = document.getElementById('clock-svg');
const marksG = document.getElementById('marks');
const numsG = document.getElementById('numbers');

const hHand = document.getElementById('h-hand');
const mHand = document.getElementById('m-hand');
const sHand = document.getElementById('s-hand');

const tempEl = document.getElementById('temp');
const dateEl = document.getElementById('date');

/* Geometria el·líptica */
const RX = 480;
const RY = 420;

function polar(a, rx, ry) {
    return {
        x: Math.sin(a) * rx,
        y: -Math.cos(a) * ry
    };
}

/* Meteo Seva */
async function fetchWeather() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true"
        );
        const data = await res.json();
        tempEl.textContent =
            Math.round(data.current_weather.temperature) + "°C";
    } catch {
        tempEl.textContent = "--°C";
    }
}

/* Cara del rellotge */
function drawFace() {
    for (let i = 0; i < 60; i++) {
        const a = i * 6 * Math.PI / 180;
        const outer = polar(a, RX, RY);
        const inner = polar(
            a,
            RX - (i % 5 === 0 ? 40 : 20),
            RY - (i % 5 === 0 ? 40 : 20)
        );

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', inner.x);
        line.setAttribute('y1', inner.y);
        line.setAttribute('x2', outer.x);
        line.setAttribute('y2', outer.y);
        line.classList.add('mark', i % 5 === 0 ? 'major' : 'minor');
        line.dataset.minute = i;

        marksG.appendChild(line);
    }

    for (let i = 1; i <= 12; i++) {
        const a = i * 30 * Math.PI / 180;
        const p = polar(a, RX - 100, RY - 100);

        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.textContent = i;
        t.setAttribute('x', p.x);
        t.setAttribute('y', p.y);
        t.classList.add('number');

        numsG.appendChild(t);
    }
}

/* Animació contínua */
function updateContinuous() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;

    const ah = (h * 30 + m * 0.5) * Math.PI / 180;
    const am = (m * 6 + s * 0.1) * Math.PI / 180;
    const as = s * 6 * Math.PI / 180;

    const ph = polar(ah, RX * 0.55, RY * 0.55);
    const pm = polar(am, RX * 0.82, RY * 0.82);
    const ps = polar(as, RX * 0.95, RY * 0.95);

    hHand.setAttribute('x1', 0);
    hHand.setAttribute('y1', 0);
    hHand.setAttribute('x2', ph.x);
    hHand.setAttribute('y2', ph.y);

    mHand.setAttribute('x1', 0);
    mHand.setAttribute('y1', 0);
    mHand.setAttribute('x2', pm.x);
    mHand.setAttribute('y2', pm.y);

    sHand.setAttribute('x1', 0);
    sHand.setAttribute('y1', 0);
    sHand.setAttribute('x2', ps.x);
    sHand.setAttribute('y2', ps.y);

    /* Ratlla hora + minut */
    const hourAngleDeg = (h * 30 + m * 0.5);
    const hourMinute = Math.round(hourAngleDeg / 6) % 60;

    document.querySelectorAll('.mark').forEach(mk => {
        const min = +mk.dataset.minute;
        mk.classList.toggle(
            'active',
            min === m || min === hourMinute
        );
    });

    const dies = [
        'Diumenge','Dilluns','Dimarts',
        'Dimecres','Dijous','Divendres','Dissabte'
    ];
    dateEl.textContent = `${dies[now.getDay()]} ${now.getDate()}`;

    requestAnimationFrame(updateContinuous);
}

/* Fullscreen doble toc */
let lastTap = 0;
svg.addEventListener('click', () => {
    const t = Date.now();
    if (t - lastTap < 300) {
        document.fullscreenElement
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen();
    }
    lastTap = t;
});

/* Init */
drawFace();
fetchWeather();
updateContinuous();
setInterval(fetchWeather, 600000);
