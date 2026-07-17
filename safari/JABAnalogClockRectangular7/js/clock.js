var svg = document.getElementById('clock-svg');
var marksG = document.getElementById('marks');
var numsG = document.getElementById('numbers');

var hHand = document.getElementById('h-hand');
var mHand = document.getElementById('m-hand');
var sHand = document.getElementById('s-hand');

var tempEl = document.getElementById('temp');
var dateEl = document.getElementById('date');

/* Geometria el·líptica adaptada al límit rectangular 4:3 de l'iPad */
var RX = 640; // Ampliat per arribar al límit esquerre i dret
var RY = 460; // Ampliat per arribar al límit superior i inferior

function polar(a, rx, ry) {
    return {
        x: Math.sin(a) * rx,
        y: -Math.cos(a) * ry
    };
}

/* Meteo Seva */
function fetchWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true")
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if (data && data.current_weather) {
                tempEl.textContent = Math.round(data.current_weather.temperature) + "°C";
            }
        })
        .catch(function() {
            tempEl.textContent = "--°C";
        });
}

/* Cara del rellotge */
function drawFace() {
    for (var i = 0; i < 60; i++) {
        var a = i * 6 * Math.PI / 180;
        var outer = polar(a, RX, RY);
        // Mantenim la teva mida de marques (40 per a les grans, 20 per a les petites)
        var inner = polar(
            a,
            RX - (i % 5 === 0 ? 40 : 20),
            RY - (i % 5 === 0 ? 40 : 20)
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
        // Ajustem els números perquè se separin proporcionalment seguint la nova el·lipse
        var p = polar(a2, RX - 110, RY - 110);

        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.textContent = j;
        t.setAttribute('x', p.x);
        t.setAttribute('y', p.y);
        t.classList.add('number');

        numsG.appendChild(t);
    }
}

/* Animació contínua */
function updateContinuous() {
    var now = new Date();
    var h = now.getHours() % 12;
    var m = now.getMinutes();
    var s = now.getSeconds() + now.getMilliseconds() / 1000;

    var ah = (h * 30 + m * 0.5) * Math.PI / 180;
    var am = (m * 6 + s * 0.1) * Math.PI / 180;
    var as = s * 6 * Math.PI / 180;

    // Les manetes ara s'estiren automàticament de forma harmònica segons la nova mida RX i RY
    var ph = polar(ah, RX * 0.55, RY * 0.55);
    var pm = polar(am, RX * 0.82, RY * 0.82);
    var ps = polar(as, RX * 0.95, RY * 0.95);

    hHand.setAttribute('x1', 0);
    hHand.setAttribute('y1', 0);
    hHand.setAttribute('x2', ph.x);
    hHand.setAttribute('y2', ph.y);

    mHand.setAttribute('x1', 0);
    mHand.setAttribute('y1', 0);
    mHand.setAttribute('x2', pm.x);
    mHand.setAttribute('y2', pm.y);

    sHand.setAttribute('x1', 0);
    sHand.setAttribute('y1', 0);
    sHand.setAttribute('x2', ps.x);
    sHand.setAttribute('y2', ps.y);

    var hourAngleDeg = (h * 30 + m * 0.5);
    var hourMinute = Math.round(hourAngleDeg / 6) % 60;
    
    var allMarks = document.querySelectorAll('.mark');
    for (var k = 0; k < allMarks.length; k++) {
        var mk = allMarks[k];
        var min = parseInt(mk.getAttribute('data-minute'), 10);
        
        if (min === m || min === hourMinute) {
            mk.classList.add('active');
        } else {
            mk.classList.remove('active');
        }
    }

    var dies = [
        'Diumenge','Dilluns','Dimarts',
        'Dimecres','Dijous','Divendres','Dissabte'
    ];
    dateEl.textContent = dies[now.getDay()] + ' ' + now.getDate();

    requestAnimationFrame(updateContinuous);
}

/* Inicialització */
drawFace();
fetchWeather();
updateContinuous();
setInterval(fetchWeather, 600000);