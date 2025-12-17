const deg = 6;
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");

const setClock = () => {
	let day = new Date();
	let hh = day.getHours() * 30;
	let mm = day.getMinutes() * deg;
	let ss = day.getSeconds() * deg;

	hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
	min.style.transform = `rotateZ(${mm}deg)`;
	sec.style.transform = `rotateZ(${ss}deg)`;
};

setClock();
setInterval(setClock, 1000);

// Control del Switch de Tema
const themeToggle = document.querySelector("#theme-toggle");

const switchTheme = (evt) => {
	if (evt.target.checked) {
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		document.documentElement.setAttribute("data-theme", "light");
	}
};

themeToggle.addEventListener("change", switchTheme, false);

// Configuració inicial (Dark Mode)
let currentTheme = "dark";
document.documentElement.setAttribute("data-theme", currentTheme);
themeToggle.checked = (currentTheme === "dark");