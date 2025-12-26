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

setInterval(updateClock, 1000);
updateClock();

const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("selected-theme", theme);
});

const savedTheme = localStorage.getItem("selected-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.checked = (savedTheme === "dark");