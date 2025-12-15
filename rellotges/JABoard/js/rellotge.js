const LAT = 41.3888; // Latitud de Barcelona
const LON = 2.1590; // Longitud de Barcelona
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

async function getTemperaturaBarcelona() {
    // API Open-Meteo (no requereix API Key)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=Europe%2FMadrid`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Error API: ${resposta.status}`);
        }
        const dades = await resposta.json();

        // Extreure la temperatura i el codi
        const temp = Math.round(dades.current.temperature_2m);
        const code = dades.current.weather_code;
        const descripcio = getWeatherDescription(code);

        document.getElementById("temperatura").textContent =
            `${temp} ºC | ${descripcio}`;

        lastWeatherFetch = new Date().getTime();

    } catch (error) {
        console.error("Error obtenint la temperatura:", error);
        document.getElementById("temperatura").textContent = "Error Météo 🚨";
    }
}
function actualitzaRellotge() {
    const ara = new Date(); //

    let hores = ara.getHours(); //
    const minuts = String(ara.getMinutes()).padStart(2, '0'); //
    const segons = String(ara.getSeconds()).padStart(2, '0'); //

    // Format 12h
    const sufix = hores >= 12 ? " PM" : " AM"; //
    hores = hores % 12 || 12; //

    document.getElementById("rellotge").textContent =
        `${String(hores).padStart(2,'0')}:${minuts}:${segons}${sufix}`; //

    const opcionsData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; //
    document.getElementById("data").textContent =
        ara.toLocaleDateString('ca-ES', opcionsData); //

    actualitzaComptadors(ara);
      // Météo: Refrescar si han passat 10 minuts
    if (ara.getTime() - lastWeatherFetch > CACHE_DURATION) {
        getTemperaturaBarcelona();
    }
}

function actualitzaComptadors(ara) {
    // Càlcul de Nadal
    const nadal = new Date(ara.getFullYear(), 11, 25); //
    if (ara > nadal) nadal.setFullYear(nadal.getFullYear() + 1); //
    const diesNadal = Math.ceil((nadal - ara)/(1000*60*60*24)); //
    const comptadorNadalDiv = document.getElementById("comptadorNadal");
    comptadorNadalDiv.textContent =
        `Falten ${diesNadal} dies fins a Nadal 🎄`; //

    // Càlcul de Sant Joan
    const santJoan = new Date(ara.getFullYear(), 5, 24); //
    if (ara > santJoan) santJoan.setFullYear(santJoan.getFullYear() + 1); //
    const diesSantJoan = Math.ceil((santJoan - ara)/(1000*60*60*24)); //
    const comptadorSantJoanDiv = document.getElementById("comptadorSantJoan");
    comptadorSantJoanDiv.textContent =
        `Falten ${diesSantJoan} dies fins a Sant Joan ☀️`; //

    // --- NOU: Lògica de Reordenació dels DIVs ---
    const dashboard = document.getElementById("dashboard");
    const rellotgeCard = document.getElementById("rellotgeCard");

    // Si Sant Joan està més a prop (menys dies)
    if (diesSantJoan < diesNadal) {
        // Mou Sant Joan immediatament després del Rellotge
        // L'ordre serà: [Rellotge, Sant Joan, Nadal]
        dashboard.insertBefore(comptadorSantJoanDiv, rellotgeCard.nextSibling);
    } else {
        // Si Nadal està més a prop o igual
        // Mou Nadal immediatament després del Rellotge
        // L'ordre serà: [Rellotge, Nadal, Sant Joan]
        dashboard.insertBefore(comptadorNadalDiv, rellotgeCard.nextSibling);
    }
    // ---------------------------------------------
}

setInterval(actualitzaRellotge, 1000); //
actualitzaRellotge(); //