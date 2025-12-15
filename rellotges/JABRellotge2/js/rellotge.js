// --- Configuració de Localitzacions ---
const BARCELONA = {
    LAT: 41.3888,
    LON: 2.1590,
    TIMEZONE: 'Europe/Madrid',
    IDS: { rellotge: 'rellotge', data: 'data', temperatura: 'temperatura' }
};

const VIC = {
    // Coordenades de Vic (aproximadament 41º50'05''N - 2º16'26''E)
    LAT: 41.8347,
    LON: 2.2739,
    TIMEZONE: 'Europe/Madrid',
    IDS: { rellotge: 'rellotgeVic', data: 'dataVic', temperatura: 'temperaturaVic' }
};

const LOCACIONS = [BARCELONA, VIC];

const CACHE_DURATION = 10 * 60 * 1000; // Refrescar la temperatura cada 10 minuts
let lastWeatherFetch = 0;

function getWeatherDescription(code) {
    // Mapeig simplificat del Codi Meteorològic WMO
    if (code >= 0 && code <= 1) return "Cel Net ☀️";
    if (code >= 2 && code <= 3) return "Parcialment Ennuvolat 🌤️";
    if (code >= 51 && code <= 65) return "Pluja 🌧️";
    if (code >= 71 && code <= 75) return "Neu ❄️";
    if (code >= 95) return "Tempesta ⛈️";
    return "Variable ☁️";
}

async function getTemperatura(loc) {
    // API Open-Meteo (no requereix API Key)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.LAT}&longitude=${loc.LON}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=${loc.TIMEZONE}`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Error API: ${resposta.status}`);
        }
        const dades = await resposta.json();

        const temp = Math.round(dades.current.temperature_2m);
        const code = dades.current.weather_code;
        const descripcio = getWeatherDescription(code);

        document.getElementById(loc.IDS.temperatura).textContent =
            `${temp} ºC  ${descripcio}`;

    } catch (error) {
        console.error(`Error obtenint la temperatura per (${loc.LAT}, ${loc.LON}):`, error);
        document.getElementById(loc.IDS.temperatura).textContent = "Error Météo 🚨";
    }
}

function actualitzaRellotge() {
    const ara = new Date();

    const opcionsData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Actualització per a totes les localitzacions
    LOCACIONS.forEach(loc => {
        // Hores i minuts sense segons (Format 24h)
        const opcionsHora = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: loc.TIMEZONE };
        const horaMinuts = ara.toLocaleTimeString('ca-ES', opcionsHora);

        document.getElementById(loc.IDS.rellotge).textContent = horaMinuts;
        document.getElementById(loc.IDS.data).textContent =
            ara.toLocaleDateString('ca-ES', opcionsData);
    });

    // Météo: Refrescar si han passat 10 minuts
    if (ara.getTime() - lastWeatherFetch > CACHE_DURATION) {
        LOCACIONS.forEach(getTemperatura); // Crida a la funció per cada localització
        lastWeatherFetch = ara.getTime();
    }
}

// Eliminem la funció actualitzaComptadors(ara) i les seves crides

setInterval(actualitzaRellotge, 1000);
// Inicialització immediata
LOCACIONS.forEach(getTemperatura);
actualitzaRellotge();