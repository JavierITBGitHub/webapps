var svg = document.getElementById('clock-svg');
var marksG = document.getElementById('marks');
var numsG = document.getElementById('numbers');

var hHandGroup = document.getElementById('h-hand-group');
var mHandGroup = document.getElementById('m-hand-group');
var sHand = document.getElementById('s-hand');

var tempEl = document.getElementById('temp');
var dateEl = document.getElementById('date');
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
        
        moonGroup.setAttribute('transform', 'translate(0, -260)');
        document.getElementById('brand').setAttribute('y', '-180');
        tempEl.setAttribute('y', '220');
        dateEl.setAttribute('y', '310');
    } else {
        RX = 630; 
        RY = 450;
        svg.setAttribute('viewBox', '-666.5 -500 1333 1000');
        
        moonGroup.setAttribute('transform', 'translate(0, -200)');
        document.getElementById('brand').setAttribute('y', '-130');
        tempEl.setAttribute('y', '180');
        dateEl.setAttribute('y', '250');
    }

    drawFace();
}

/* Previsió Meteorològica de Seva */
function fetchWeather() {
    if (navigator.onLine === false) {
        tempEl.textContent = "--°C";
        tempEl.removeAttribute('class');
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
            
            tempEl.textContent = t + "°C";
            tempEl.removeAttribute('class');
            
            if (t <= 0) tempEl.classList.add('temp-glaç');
            else if (t > 0 && t <= 12) tempEl.classList.add('temp-fred');
            else if (t > 12 && t <= 23) tempEl.classList.add('temp-suau');
            else if (t > 23 && t <= 32) tempEl.classList.add('temp-calor');
            else if (t > 32) tempEl.classList.add('temp-extrem');
        }
    })
    .catch(function() {
        tempEl.textContent = "--°C";
        tempEl.removeAttribute('class');
    });
}

/* Càlcul astronòmic de la Lluna (0.5 = Lluna Plena / Pleniluni) */
function updateMoonPhase() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    if (month < 3) { year--; month += 12; }
    
    var a = Math.floor(year / 100);
    var b = Math.floor(a / 4);
    var c = 2 - a + b;
    var e = Math.floor(365.25 * (year + 4716));
    var f = Math.floor(30.6001 * (month + 1));
    
    var jd = c + day + e + f - 1524.5;
    
    var daysSinceNew = (jd - 2451549.5) % 29.53058867;
    if (daysSinceNew < 0) daysSinceNew += 29.53058867;
    
    var phase = daysSinceNew / 29.53058867; // 0.0 = Nova, 0.5 = Plena

    var r = 22.5; // Radi un 25% més gran
    var path = "";
    var moonPhaseEl = document.getElementById('moon-phase');

    // 1. LLUNA PLENA (al voltant de 0.5) -> Deixa veure la base 100% blanca
    if (phase >= 0.43 && phase <= 0.57) {
        path = ""; 
    } 
    // 2. LLUNA NOVA (al voltant de 0.0 o 1.0) -> Tapada de negre completament
    else if (phase < 0.07 || phase > 0.93) {
        path = "M 0 " + (-r) + " A " + r + " " + r + " 0 1 1 0 " + r + " A " + r + " " + r + " 0 1 1 0 " + (-r);
    } 
    // 3. QUART CREIXENT -> Ombra a l'esquerra
    else if (phase < 0.43) {
        var x = r - (phase * 4 * r);
        path = "M 0 " + (-r) + " A " + r + " " + r + " 0 0 0 0 " + r + " A " + Math.abs(x) + " " + r + " 0 0 " + (x > 0 ? 1 : 0) + " 0 " + (-r);
    } 
    // 4. QUART MINVANT -> Ombra a la dreta
    else {
        var x = ((phase - 0.5) * 4 * r) - r;
        path = "M 0 " + (-r) + " A " + r + " " + r + " 0 0 1 0 " + r + " A " + Math.abs(x) + " " + r + " 0 0 " + (x > 0 ? 0 : 1) + " 0 " + (-r);
    }
    
    if (moonPhaseEl) {
        moonPhaseEl.setAttribute('d', path);
    }
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

    // Mode Nit (22:00h a 07:00h)
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

/* Control de brillantor tàctil */
var touchStartY = 0;
window.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
        var currentY = e.touches[0].clientY;
        var diffY = touchStartY - currentY;
        var delta = diffY / window.innerHeight;
        var newBrightness = Math.min(Math.max(currentBrightness + delta, 0.15), 1.0);
        
        svg.style.opacity = newBrightness;
    }
}, { passive: true });

window.addEventListener('touchend', function(e) {
    currentBrightness = parseFloat(svg.style.opacity) || currentBrightness;
});

window.addEventListener('resize', ajustarMidesDispositiu);
window.addEventListener('orientationchange', function() {
    setTimeout(ajustarMidesDispositiu, 200);
});

window.addEventListener('online', fetchWeather);
window.addEventListener('offline', function() {
    tempEl.textContent = "--°C";
    tempEl.removeAttribute('class');
});

ajustarMidesDispositiu();
fetchWeather();
updateMoonPhase();
updateContinuous();

setInterval(fetchWeather, 600000);
setInterval(updateMoonPhase, 3600000);