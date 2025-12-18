const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");

const updateClock = () => {
    const now = new Date();
    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();

    const sDeg = s * 6;
    const mDeg = m * 6 + s * 0.1;
    const hDeg = h * 30 + m * 0.5;

    sec.style.transform = `rotateZ(${sDeg}deg)`;
    min.style.transform = `rotateZ(${mDeg}deg)`;
    hour.style.transform = `rotateZ(${hDeg}deg)`;
};

// Activar rellotge
setInterval(updateClock, 1000);
updateClock();

// Gestió de Tema (Switch)
const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
});

// Estat inicial: Dark Mode
document.documentElement.setAttribute("data-theme", "dark");
themeToggle.checked = true;