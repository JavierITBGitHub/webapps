const hourHand = document.querySelector(".hour");
const minHand = document.querySelector(".min");
const secHand = document.querySelector(".sec");
const clock = document.getElementById("clock");
const tempElement = document.getElementById("temp");

async function getWeather() {
    try {
        const lat = 41.837;
        const lon = 2.270;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        tempElement.innerText = `${temp}°C`;
    } catch (error) {
        tempElement.innerText = "N/A";
    }
}

const buildClockFace = () => {
    // Netegem números i marques previs
    document.querySelectorAll('.number, .marker').forEach(el => el.remove());

    const w = window.innerWidth / 2;
    const h = window.innerHeight / 2;

    // 1. DIBUIXAR LES 60 RATLLES (MARQUES)
    const markerPaddingX = 15; // Molt a prop de la vora
    const markerPaddingY = 15;

    for (let i = 0; i < 60; i++) {
        const angle = (i * 6) * (Math.PI / 180);
        const sin = Math.sin(angle);
        const cos = -Math.cos(angle);

        const scale = Math.min((w - markerPaddingX) / Math.abs(sin), (h - markerPaddingY) / Math.abs(cos));
        const x = w + sin * scale;
        const y = h + cos * scale;

        const mark = document.createElement("div");
        mark.className = (i % 5 === 0) ? "marker hour-mark" : "marker";
        mark.style.left = `${x}px`;
        mark.style.top = `${y}px`;

        // Rotem la ratlla perquè apunti al centre
        mark.style.transform = `translate(-50%, -50%) rotate(${i * 6}deg)`;
        clock.appendChild(mark);
    }

    // 2. DIBUIXAR ELS 12 NÚMEROS
    const numPaddingX = 65; // Més cap a l'interior per no tapar ratlles
    const numPaddingY = 85;

    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30) * (Math.PI / 180);
        const sin = Math.sin(angle);
        const cos = -Math.cos(angle);

        const scale = Math.min((w - numPaddingX) / Math.abs(sin), (h - numPaddingY) / Math.abs(cos));
        const x = w + sin * scale;
        const y = h + cos * scale;

        const numDiv = document.createElement("div");
        numDiv.className = "number";
        numDiv.innerText = i;
        numDiv.style.left = `${x - 30}px`;
        numDiv.style.top = `${y - 30}px`;
        clock.appendChild(numDiv);
    }
};

const updateClock = () => {
    const now = new Date();
    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();

    const sDeg = s * 6;
    const mDeg = m * 6 + (s * 0.1);
    const hDeg = (h % 12) * 30 + (m * 0.5);

    secHand.style.transform = `rotate(${sDeg}deg)`;
    minHand.style.transform = `rotate(${mDeg}deg)`;
    hourHand.style.transform = `rotate(${hDeg}deg)`;
};

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("jab-theme", theme);
});

const savedTheme = localStorage.getItem("jab-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.checked = (savedTheme === "dark");

window.addEventListener('resize', buildClockFace);

buildClockFace();
updateClock();
getWeather();

setInterval(updateClock, 1000);
setInterval(getWeather, 900000);