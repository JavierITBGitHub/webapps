var svg = document.getElementById('clock-svg');
var marksG = document.getElementById('marks');
var numsG = document.getElementById('numbers');

var hHandGroup = document.getElementById('h-hand-group');
var mHandGroup = document.getElementById('m-hand-group');
var sHand = document.getElementById('s-hand');

var tempEl = document.getElementById('temp');
var dateEl = document.getElementById('date');

/* Geometria el·líptica del rellotge adaptada a la ràtio 4:3 de la pantalla de l'iPad */
var RX = 630; 
var RY = 450; 

function polar(a, rx, ry) {
    return {
        x: Math.sin(a) * rx,
        y: -Math.cos(a) * ry
    };
}

/* Meteo Seva amb rangs dinàmics de color per a la temperatura */
function fetchWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true")
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if (data && data.current_weather) {
                var t = Math.round(data.current_weather.temperature);
                tempEl.textContent = t + "°C";
                
                // Netejar classes prèvies de temperatura
                tempEl.removeAttribute('class');
                
                // Assignació d'estils de color segons la temperatura de la teva altra versió
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
        });
}

/* Cara del rellotge */
function drawFace() {
    marksG.innerHTML = "";
    numsG.innerHTML = "";

    // Dibuix de les marques el·líptiques exteriors
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

    // Posicionament circular pur dels números perquè conservin el format original sense estirar-se
    for (var j = 1; j <= 12; j++) {
        var a2 = j * 30 * Math.PI / 180;
        // Fem servir un radi proporcional uniforme perquè conservin l'alineació perfecta
        var p = polar(a2, RX - 110, RY - 105);

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

    // Càlcul de graus de rotació per a les manetes de polígons fixes
    var degH = (h * 30) + (m * 0.5);
    var degM = (m * 6) + (s * 0.1);
    var degS = s * 6;

    // Rotació de grups de manetes natius sense deformar la seva punta estructural
    hHandGroup.setAttribute('transform', 'rotate(' + degH + ')');
    mHandGroup.setAttribute('transform', 'rotate(' + degM + ')');
    sHand.setAttribute('transform', 'rotate(' + degS + ')');

    // Il·luminació activa exclusiva del MINUT ACTUAL (S'elimina la marca de la maneta de l'hora)
    var allMarks = document.querySelectorAll('.mark');
    for (var k = 0; k < allMarks.length; k++) {
        var mk = allMarks[k];
        var min = parseInt(mk.getAttribute('data-minute'), 10);
        
        if (min === m) {
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