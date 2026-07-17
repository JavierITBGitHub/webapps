var svg = document.getElementById('clock-svg');
var marksG = document.getElementById('marks');
var numsG = document.getElementById('numbers');

var hHandGroup = document.getElementById('h-hand-group');
var mHandGroup = document.getElementById('m-hand-group');
var sHand = document.getElementById('s-hand');

var tempEl = document.getElementById('temp');
var dateEl = document.getElementById('date');

/* Radis dinàmics globals */
var RX = 630; 
var RY = 450; 

function polar(a, rx, ry) {
    return {
        x: Math.sin(a) * rx,
        y: -Math.cos(a) * ry
    };
}

/* Funció clau: Detecta si l'iPad està en vertical o horitzontal i recalcula l'el·lipse */
function ajustarMidesDispositiu() {
    var ampladaFinestra = window.innerWidth;
    var alçadaFinestra = window.innerHeight;

    if (ampladaFinestra < alçadaFinestra) {
        // Mode Vertical (Portrait): l'el·lipse s'estira cap amunt i avall
        RX = 460; 
        RY = 630;
        // Ajustem el viewBox de l'SVG dinàmicament per a la proporció vertical (3:4)
        svg.setAttribute('viewBox', '-500 -666.5 1000 1333');
        
        // Reposicionem els textos al fons perquè no es trepitgin en vertical
        document.getElementById('brand').setAttribute('y', '-160');
        tempEl.setAttribute('y', '220');
        dateEl.setAttribute('y', '310');
    } else {
        // Mode Horitzontal (Landscape): el teu mode perfecte original (4:3)
        RX = 630; 
        RY = 450;
        svg.setAttribute('viewBox', '-666.5 -500 1333 1000');
        
        document.getElementById('brand').setAttribute('y', '-120');
        tempEl.setAttribute('y', '180');
        dateEl.setAttribute('y', '250');
    }

    // Cada vegada que canvia la mida, redibuixem l'esfera perquè les marques i números vagin al seu lloc real
    drawFace();
}

/* Meteo Seva */
function fetchWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.83&longitude=2.27&current_weather=true")
        .then(function(res) {
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
        });
}

/* Cara del rellotge */
function drawFace() {
    // Netegem les marques i números anteriors abans de redibuixar
    marksG.innerHTML = "";
    numsG.innerHTML = "";

    // Dibuix de les marques el·líptiques exteriors adaptades
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

    // Posicionament intel·ligent dels números segons la posició de l'el·lipse actual
    for (var j = 1; j <= 12; j++) {
        var a2 = j * 30 * Math.PI / 180;
        // Restem una distància proporcional perquè els números acompanyin la vora sense sortir de la pantalla
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

    var degH = (h * 30) + (m * 0.5);
    var degM = (m * 6) + (s * 0.1);
    var degS = s * 6;

    hHandGroup.setAttribute('transform', 'rotate(' + degH + ')');
    mHandGroup.setAttribute('transform', 'rotate(' + degM + ')');
    sHand.setAttribute('transform', 'rotate(' + degS + ')');

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

/* Escoltadors d'esdeveniments per quan es giri l'iPad (S'usa resize i orientationchange per a navegadors de 2018) */
window.addEventListener('resize', ajustarMidesDispositiu);
window.addEventListener('orientationchange', ajustarMidesDispositiu);

/* Inicialització ordenada */
ajustarMidesDispositiu(); // Primer calcula l'orientació i dibuixa la cara
fetchWeather();
updateContinuous();
setInterval(fetchWeather, 600000);
