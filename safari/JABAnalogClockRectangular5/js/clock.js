var svg = document.getElementById('clock-svg');
var marksG = document.getElementById('marks');
var numsG = document.getElementById('numbers');

var hHandGroup = document.getElementById('h-hand-group');
var mHandGroup = document.getElementById('m-hand-group');
var sHand = document.getElementById('s-hand');

var tempEl = document.getElementById('temp');
var dateEl = document.getElementById('date');

/* Radis dinàmics globals controlats per orientació */
var RX = 630; 
var RY = 450; 

function polar(a, rx, ry) {
    return {
        x: Math.sin(a) * rx,
        y: -Math.cos(a) * ry
    };
}

/* Funció adaptativa 100% compatible amb els girs i pantalles a iOS antic */
function ajustarMidesDispositiu() {
    var isVertical = window.orientation === 0 || window.orientation === 180;
    
    if (window.orientation === undefined) {
        isVertical = window.innerHeight > window.innerWidth;
    }

    if (isVertical) {
        // Mode Vertical (Portrait): S'estira cap amunt i avall (Proporció 3:4)
        RX = 460; 
        RY = 630;
        svg.setAttribute('viewBox', '-500 -666.5 1000 1333');
        
        document.getElementById('brand').setAttribute('y', '-160');
        tempEl.setAttribute('y', '220');
        dateEl.setAttribute('y', '310');
    } else {
        // Mode Horitzontal (Landscape): Mode rectangular complet (Proporció 4:3)
        RX = 630; 
        RY = 450;
        svg.setAttribute('viewBox', '-666.5 -500 1333 1000');
        
        document.getElementById('brand').setAttribute('y', '-120');
        tempEl.setAttribute('y', '180');
        dateEl.setAttribute('y', '250');
    }

    drawFace();
}

/* Meteo Seva tolerant a fallades de xarxa/offline */
function fetchWeather() {
    if (navigator.onLine === false) {
        tempEl.textContent = "--°C";
        tempEl.removeAttribute('class');
        return;
    }

    var controller = new AbortController();
    var timeoutId = setTimeout(function() {
        controller.abort();
    }, 5000);

    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true", {
        signal: controller.signal
    })
    .then(function(res) {
        clearTimeout(timeoutId);
        return res.json();
    })
    .then(function(data) {
        if (data && data.current_weather) {
            var t = Math.round(data.current_weather.temperature);
            tempEl.textContent = t + "°C";
            
            tempEl.removeAttribute('class');
            
            if (t <= 0) {
                tempEl.classList.add('temp-glaç');
            } else if (t > 0 && t <= 12) {
                tempEl.classList.add('temp-fred');
            } else if (t > 12 && t <= 23) {
                tempEl.classList.add('temp-suau');
            } else if (t > 23 && t <= 32) {
                tempEl.classList.add('temp-calor');
            } else if (t > 32) {
                tempEl.classList.add('temp-extrem');
            }
        }
    })
    .catch(function() {
        tempEl.textContent = "--°C";
        tempEl.removeAttribute('class');
    });
}

/* Dibuix de l'esfera */
function drawFace() {
    marksG.innerHTML = "";
    numsG.innerHTML = "";

    for (var i = 0; i < 60; i++) {
        var a = i * 6 * Math.PI / 180;
        var outer = polar(a, RX, RY);
        var inner = polar(
            a,
            RX - (i % 5 === 0 ? 42 : 22),
            RY - (i % 5 === 0 ? 42 : 22)
        );

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

/* Animació de manetes i colors */
function updateContinuous() {
    var now = new Date();
    var hRaw = now.getHours() % 12;
    var h = (hRaw === 0) ? 12 : hRaw; 
    var m = now.getMinutes();
    var s = now.getSeconds() + now.getMilliseconds() / 1000;

    var degH = (hRaw * 30) + (m * 0.5);
    var degM = (m * 6) + (s * 0.1);
    var degS = s * 6;

    hHandGroup.setAttribute('transform', 'rotate(' + degH + ')');
    mHandGroup.setAttribute('transform', 'rotate(' + degM + ')');
    sHand.setAttribute('transform', 'rotate(' + degS + ')');

    // 1. Marca de fons de l'hora corrent en vermell
    var horaActualMarca = h * 5;
    if (horaActualMarca === 60) { horaActualMarca = 0; }

    var allMarks = document.querySelectorAll('.mark');
    for (var k = 0; k < allMarks.length; k++) {
        var mk = allMarks[k];
        var minMark = parseInt(mk.getAttribute('data-minute'), 10);
        
        if (minMark === horaActualMarca) {
            mk.classList.add('active');
        } else {
            mk.classList.remove('active');
        }
    }

    // 2. Número vermell en l'hora en punt durant 60s
    var allNumbers = document.querySelectorAll('.number');
    for (var n = 0; n < allNumbers.length; n++) {
        var numEl = allNumbers[n];
        var numHora = parseInt(numEl.getAttribute('data-hour'), 10);

        if (m === 0 && numHora === h) {
            numEl.classList.add('active-num');
        } else {
            numEl.classList.remove('active-num');
        }
    }

    var dies = [
        'Diumenge','Dilluns','Dimarts',
        'Dimecres','Dijous','Divendres','Dissabte'
    ];
    dateEl.textContent = dies[now.getDay()] + ' ' + now.getDate();

    requestAnimationFrame(updateContinuous);
}

/* Esdeveniments de xarxa i orientació */
window.addEventListener('resize', ajustarMidesDispositiu);
window.addEventListener('orientationchange', function() {
    setTimeout(ajustarMidesDispositiu, 200);
});

window.addEventListener('online', fetchWeather);
window.addEventListener('offline', function() {
    tempEl.textContent = "--°C";
    tempEl.removeAttribute('class');
});

/* Inicialització */
ajustarMidesDispositiu();
fetchWeather();
updateContinuous();
setInterval(fetchWeather, 600000);