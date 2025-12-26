const hourHand = document.querySelector(".hour");
const minHand = document.querySelector(".min");
const secHand = document.querySelector(".sec");
const clock = document.getElementById("clock");

const placeNumbers = () => {
    // Netegem només els números previs
    document.querySelectorAll('.number').forEach(n => n.remove());

    const w = window.innerWidth / 2;
    const h = window.innerHeight / 2;

    const paddingX = 40;
    const paddingY = 50;

    for (let i = 1; i <= 12; i++) {
        const angle = (i * 30) * (Math.PI / 180);
        const sin = Math.sin(angle);
        const cos = -Math.cos(angle);

        const x_factor = sin;
        const y_factor = cos;

        const scale = Math.min(
            (w - paddingX) / Math.abs(x_factor),
            (h - paddingY) / Math.abs(y_factor)
        );

        const x = w + x_factor * scale;
        const y = h + y_factor * scale;

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

window.addEventListener('resize', placeNumbers);
placeNumbers();
setInterval(updateClock, 1000);
updateClock();