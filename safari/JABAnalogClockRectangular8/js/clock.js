var svg = document.getElementById('clock-svg');
var marksG = document.getElementById('marks');
var numsG = document.getElementById('numbers');

var hHandGroup = document.getElementById('h-hand-group');
var mHandGroup = document.getElementById('m-hand-group');
var sHand = document.getElementById('s-hand');

var tempEl = document.getElementById('temp');
var dateEl = document.getElementById('date');
var weatherIcon = document.getElementById('weather-icon');
var moonGroup = document.getElementById('moon-group');

var RX = 630; 
var RY = 450; 
var currentBrightness = 1.0;

function polar(a, rx, ry) {
    return {
        x: Math.sin(a) * rx,
        y: -Math.cos(a) * ry
    };
}

function ajustarMidesDispositiu() {
    var isVertical = window.orientation === 0 || window.orientation === 180;
    
    if (window.orientation === undefined) {
        isVertical = window.innerHeight > window.innerWidth;
    }

    if (isVertical) {
        RX = 460; 
        RY = 630;
        svg.setAttribute('viewBox', '-500 -666.5 1000 1333');
        
        document.getElementById('brand').setAttribute('y', '-180');
        moonGroup.setAttribute('transform', 'translate(0, -260)');
        tempEl.setAttribute('y', '220');
        dateEl.setAttribute('y', '310');
    } else {
        RX = 630; 
        RY = 450;
        svg.setAttribute('viewBox', '-666.5 -500 1333 1000');
        
        document.getElementById('brand').setAttribute('y', '-120');
        moonGroup.setAttribute('transform', 'translate(0, -180)');
        tempEl.setAttribute('y', '180');
        dateEl.setAttribute('y', '250');
    }

    drawFace();
}

/* 1. ICONES METEO SVG (WMO Codes) */
function setWeatherIcon(code, tempY) {
    // Posicionem la icona a la meitat esquerra del text de la temperatura
    var iconX = -130;
    var iconY = tempY - 30;
    
    var path = "";
    if (code === 0) { // Sol / Net
        path = "M " + (iconX+20) + " " + (iconY+5) + " A 15 15 0 1 1 " + (iconX+20) + " " + (iconY+35) + " A 15 15 0 1 1 " + (iconX+20) + " " + (iconY+5);
    } else if (code >= 1 && code <= 3) { // Núpols
        path = "M " + iconX + " " + (iconY+25) + " a 10 10 0 0 1 18 -5 a 12 12 0 0 1 20 2 a 8 8 0 0 1 10 11 z";
    } else if (code >= 51 && code <= 67) { // Pluja
        path = "M " + iconX + " " + (iconY+20) + " a 10 10 0 0 1 18 -5 a 12 12 0 0 1 20 2 z M " + (iconX+10) + " " + (iconY+28) + " l -4 10 M " + (iconX+22) + " " + (iconY+28) + " l -4 10";
    } else if (code >= 71 && code <= 77) { // Neu
        path = "M " + (iconX+15) + " " + (iconY+10) + " l 0 16 M " + (iconX+7) + " " + (iconY+18) + " l 16 0";
    } else { // Altres / Defecte
        path = "";
    }
    weatherIcon.setAttribute('d', path);
}

/* Meteo Seva amb Icona */
function fetchWeather() {
    if (navigator.onLine === false) {
        tempEl.textContent = "--°C";
        tempEl.removeAttribute('class');
        weatherIcon.setAttribute('d', '');
        return;
    }

    var url = "https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true";

    var timeoutPromise = new Promise(function(_, reject) {
        setTimeout(function() { reject(new Error("Timeout")); }, 5000);
    });

    Promise.race([fetch(url), timeoutPromise])
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data && data.current_weather) {
            var t = Math.round(data.current_weather.temperature);
            var code = data.current_weather.weathercode;
            
            tempEl.textContent = t + "°C";
            tempEl.removeAttribute('class');
            
            if (t <= 0) tempEl.classList.add('temp-glaç');
            else if (t > 0 && t <= 12) tempEl.classList.add('temp-fred');
            else if (t > 12 && t <= 23) tempEl.classList.add('temp-suau');
            else if (t > 23 && t <= 32) tempEl.classList.add('temp-calor');
            else if (t > 32) tempEl.classList.add('temp-extrem');

            var currentTempY = parseInt(tempEl.getAttribute('y'), 10);
            setWeatherIcon(code, currentTempY);
        }
    })
    .catch(function() {
        tempEl.textContent = "--°C";
        tempEl.removeAttribute('class');
        weatherIcon.setAttribute('d', '');
    });
}

/* 2. CÀLCUL DE LA FASE LUNAR (Astronòmic Offline) */
function updateMoonPhase() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    if (month < 3) { year--; month += 12; }
    var c = 365.25 * year;
    var e = 30.6 * month;
    var jd = c + e + day - 694039.09; // Dies des de la Lluna Nova de referència
    jd /= 29.5305882; // Cicle sinòdic
    var b = parseInt(jd, 10);
    var phase = (jd - b); // Valor de 0.0 a 1.0 (0=Nova, 0.5=Plena)

    var r = 18;
    var path = "";
    
    // Dibuix vectorial de la part il·luminada
    if (phase < 0.5) { // Creixent
        var x = r - (phase * 4 * r);
        path = "M 0 " + (-r) + " A " + r + " " + r + " 0 0 1 0 " + r + " A " + Math.abs(x) + " " + r + " 0 0 " + (x>0?1:0) + " 0 " + (-r);
    } else { // Minvant
        var x = (phase - 0.5) * 4 * r - r;
        path = "M 0 " + (-r) + " A " + r + " " + r + " 0 0 0 0 " + r + " A " + Math.abs(x) + " " + r + " 0 0 " + (x>0?0:1) + " 0 " + (-r);
    }
    
    document.getElementById('moon-phase').setAttribute('d', path);
}

function drawFace() {
    marksG.innerHTML = "";
    numsG.innerHTML = "";

    for (var i = 0; i < 60; i++) {
        var a = i * 6 * Math.PI / 180;
        var outer = polar(a, RX, RY);
        var inner = polar(a, RX - (i % 5 === 0 ? 42 : 22), RY - (i % 5 === 0 ? 42 : 22));

        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', inner.x);
        line.setAttribute('y1', inner.y);
        line.setAttribute('x2', outer.x);
        line.setAttribute('y2', outer.y);
        line.classList.add('mark', i % 5 === 0 ? 'major' : 'minor');
        line.setAttribute('data-minute', i);

        marksG.appendChild(line);
    }

    for (var j = 1; j <= 12; j++) {
        var a2 = j * 30 * Math.PI / 180;
        var p = polar(a2, RX - 110, RY - 105);

        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.textContent = j;
        t.setAttribute('x', p.x);
        t.setAttribute('y', p.y);
        t.classList.add('number');
        t.setAttribute('data-hour', j);

        numsG.appendChild(t);
    }
}

function updateContinuous() {
    var now = new Date();
    var hoursReal = now.getHours();
    var hRaw = hoursReal % 12;
    var h = (hRaw === 0) ? 12 : hRaw; 
    var m = now.getMinutes();
    var s = now.getSeconds() + now.getMilliseconds() / 1000;

    // 3. MODE NIT AUTOMÀTIC (Entre les 22:00h i les 07:00h)
    if (hoursReal >= 22 || hoursReal < 7) {
        document.body.classList.add('night-mode');
    } else {
        document.body.classList.remove('night-mode');
    }

    var degH = (hRaw * 30) + (m * 0.5);
    var degM = (m * 6) + (s * 0.1);
    var degS = s * 6;

    hHandGroup.setAttribute('transform', 'rotate(' + degH + ')');
    mHandGroup.setAttribute('transform', 'rotate(' + degM + ')');
    sHand.setAttribute('transform', 'rotate(' + degS + ')');

    var horaActualMarca = h * 5;
    if (horaActualMarca === 60) { horaActualMarca = 0; }

    var allMarks = document.querySelectorAll('.mark');
    for (var k = 0; k < allMarks.length; k++) {
        var mk = allMarks[k];
        var minMark = parseInt(mk.getAttribute('data-minute'), 10);
        if (minMark === horaActualMarca) mk.classList.add('active');
        else mk.classList.remove('active');
    }

    var allNumbers = document.querySelectorAll('.number');
    for (var n = 0; n < allNumbers.length; n++) {
        var numEl = allNumbers[n];
        var numHora = parseInt(numEl.getAttribute('data-hour'), 10);
        if (m === 0 && numHora === h) numEl.classList.add('active-num');
        else numEl.classList.remove('active-num');
    }

    var dies = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];
    dateEl.textContent = dies[now.getDay()] + ' ' + now.getDate();

    requestAnimationFrame(updateContinuous);
}

/* 4. CONTROL DE BRILLANTOR TÀCTIL (Lliscar amunt/avall) */
var touchStartY = 0;
window.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
        var currentY = e.touches[0].clientY;
        var diffY = touchStartY - currentY; // Positiu = amunt, Negatiu = avall
        
        // Calculem la nova brillantor en un rang de 0.15 a 1.0
        var delta = diffY / window.innerHeight;
        var newBrightness = Math.min(Math.max(currentBrightness + delta, 0.15), 1.0);
        
        svg.style.opacity = newBrightness;
    }
}, { passive: true });

window.addEventListener('touchend', function(e) {
    // Guardem el valor de brillantor final
    currentBrightness = parseFloat(svg.style.opacity) || currentBrightness;
});

/* Esdeveniments */
window.addEventListener('resize', ajustarMidesDispositiu);
window.addEventListener('orientationchange', function() {
    setTimeout(ajustarMidesDispositiu, 200);
});

window.addEventListener('online', fetchWeather);
window.addEventListener('offline', function() {
    tempEl.textContent = "--°C";
    tempEl.removeAttribute('class');
    weatherIcon.setAttribute('d', '');
});

/* Inicialització */
ajustarMidesDispositiu();
fetchWeather();
updateMoonPhase();
updateContinuous();

setInterval(fetchWeather, 600000);
setInterval(updateMoonPhase, 3600000); // Actualitza la lluna cada hora