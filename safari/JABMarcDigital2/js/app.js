/* Llista d'imatges */
var imatges = [
  'img/9eMes_SitgesFestaMajor-139.JPG',
  'img/2015NY-535.JPG',
  'img/20170811_204125.jpg',
  'img/20181023_172612.jpg',
  'img/20210330_Neus.jpg',
  'img/20220700 Atenas - DSC02137b.jpg',
  'img/20220700 Atenas - DSC02143.JPG',
  'img/20220700 Atenas - DSC02265.JPG',
  'img/20220700 Atenas - DSC02278.JPG',
  'img/20220700 Atenas - DSC02326.JPG',
  'img/20220700 Atenas - DSC02360.JPG',
  'img/20220700 Helsinki - DSC03225.JPG',
  'img/20220700 Helsinki - DSC03273.JPG',
  'img/20220700 Helsinki - DSC03281.JPG',
  'img/20220700 Oulu - DSC02765.JPG',
  'img/20220700 Oulu - DSC02855.JPG',
  'img/20220700 Oulu - DSC03001.JPG',
  'img/20220700 Oulu - DSC03124_1.JPG',
  'img/20220700 Oulu - IMG_20220719_225831.jpg',
  'img/20220800 Bragança - DSC04050.JPG',
  'img/20220800 Porto - DSC03653.JPG',
  'img/20220800 Porto - DSC03685.JPG',
  'img/20220800 Porto - DSC03687.JPG',
  'img/20220800 Porto - DSC03989.JPG',
  'img/20220800 Porto - DSC03994.JPG',
  'img/20220800 Porto - DSC04021.JPG',
  'img/20220800 Porto - DSC04026.JPG',
  'img/20220800 Porto Far de Felgueiras - DSC03955.JPG',
  'img/20190428144619_IMG_0003.JPG',
  'img/20190501123724_IMG_0073.JPG',
  'img/20190501123931_IMG_0079.JPG',
  'img/20190608104137_IMG_0025.JPG',
  'img/20190810204638_IMG_0022.JPG',
  'img/20240722232652_IMG_0042.JPG',
  'img/20240722232751_IMG_0046.JPG',
  'img/20240722232825_IMG_0047.JPG',
  'img/20240724121614_IMG_0017.JPG',
  'img/20240727200838_IMG_0007.JPG',
  'img/Arfa-83.JPG',
  'img/Badalona_Barques.jpg',
  'img/Ca La Cinta 20210313.jpg',
  'img/DSC00847.JPG',
  'img/DSC00865.JPG',
  'img/DSC01056.JPG',
  'img/DSC01430.JPG',
  'img/DSC01438.JPG',
  'img/DSC01447.JPG',
  'img/DSC02137b.jpg',
  'img/DSC02143.JPG',
  'img/DSC02148.JPG',
  'img/DSC02265.JPG',
  'img/DSC02278.JPG',
  'img/DSC02326.JPG',
  'img/DSC02360.JPG',
  'img/DSC02486.JPG',
  'img/DSC02764.JPG',
  'img/DSC02765.JPG',
  'img/DSC02855.JPG',
  'img/DSC03001.JPG',
  'img/DSC03124_1.JPG',
  'img/DSC03224.JPG',
  'img/DSC03225.JPG',
  'img/DSC03273.JPG',
  'img/DSC03281.JPG',
  'img/DSC04159.JPG',
  'img/DSC04268.JPG',
  'img/DSC04540.JPG',
  'img/DSC04556.JPG',
  'img/DSC04558.JPG',
  'img/DSC04689.JPG',
  'img/DSC04869.JPG',
  'img/DSC05296.JPG',
  'img/DSC05298 (1).JPG',
  'img/DSC05298.JPG',
  'img/DSC05328.JPG',
  'img/DSC05499.JPG',
  'img/DSC05501.JPG',
  'img/DSC05528.JPG',
  'img/DSC05529.JPG',
  'img/DSC05544.JPG',
  'img/DSC05615.JPG',
  'img/DSC05658.JPG',
  'img/DSC05669.JPG',
  'img/DSC05674.JPG',
  'img/DSC05688.JPG',
  'img/DSC05712.JPG',
  'img/DSC05753.JPG',
  'img/DSC05754.JPG',
  'img/DSC05780.JPG',
  'img/DSC05781.JPG',
  'img/DSC05785.JPG',
  'img/DSC05787.JPG',
  'img/DSC05809.JPG',
  'img/DSC05917.JPG',
  'img/DSC05953.JPG',
  'img/DSC05954.JPG',
  'img/IMG_20190729_081224.jpg',
  'img/IMG_20200511_204137-ANIMATION.gif',
  'img/IMG_20200709_123824_290.jpg',
  'img/IMG_20200710_134651_901.jpg',
  'img/IMG_20200721_125915_589.jpg',
  'img/IMG_20200722_210551.jpg',
  'img/IMG_20200723_115555_390.jpg',
  'img/IMG_20200723_122334_338.jpg',
  'img/IMG_20200811_112936.jpg',
  'img/IMG_20200820_125045.jpg',
  'img/IMG_20201014_153113.jpg',
  'img/IMG_20210313_124855.jpg',
  'img/IMG_20210327_153400.jpg',
  'img/IMG_20210401_122004.jpg',
  'img/IMG_20210720_203458.jpg',
  'img/IMG_20210726_000238_172.jpg',
  'img/IMG_20210811_103939.jpg',
  'img/IMG_20210823_095759.jpg',
  'img/IMG_20210919_170606.jpg',
  'img/IMG_20210924_102646.jpg',
  'img/IMG_20210925_154034_247.jpg',
  'img/IMG_20210925_154037_620.jpg',
  'img/IMG_20210925_154040_303.jpg',
  'img/IMG_20210925_154043_327.jpg',
  'img/IMG_20220129_132025.jpg',
  'img/IMG_20220304_184128.jpg',
  'img/IMG_20220404_195307_1.jpg',
  'img/IMG_20220719_225831.jpg',
  'img/IMG_20221030_134703.jpg',
  'img/IMG_20221113_120758.jpg',
  'img/IMG_20221113_120838.jpg',
  'img/IMG_20230211_115256.jpg',
  'img/IMG_20230304_124642.jpg',
  'img/IMG_20230901_093207_728.jpg',
  'img/IMG_20230901_093211_147.jpg',
  'img/IMG_20230923_191323.jpg',
  'img/IMG_20231209_131351581_HDR_AE.jpg',
  'img/IMG_20231209_132432759_PORTRAIT.jpg',
  'img/IMG_20231209_133426543.jpg',
  'img/IMG_20231209_133443746.jpg',
  'img/IMG_20231209_134203793_PORTRAIT.jpg',
  'img/IMG_20231230_182858072.jpg',
  'img/IMG_20240102_170300644.jpg',
  'img/IMG_20240114_134844094_HDR_AE.jpg',
  'img/IMG_20240116_180842378_HDR_AE.jpg',
  'img/IMG_20240320_071336126_HDR_AE.jpg',
  'img/IMG_20240420_134252142_HDR_AE.jpg',
  'img/IMG_20240423_164841934_MF_PORTRAIT.jpg',
  'img/IMG_20240605_093201_842.jpg',
  'img/IMG_20240630_235123858_HDR.jpg',
  'img/IMG_20240701_084707068.jpg',
  'img/IMG_20240703_220651312.jpg',
  'img/IMG_20240703_220734828_HDR.jpg',
  'img/IMG_20240720_114046617_HDR.jpg',
  'img/IMG_20240721_145938958.jpg',
  'img/IMG_20240723_180259325_HDR.jpg',
  'img/IMG_20240723_180342799.jpg',
  'img/IMG_20240723_181506856_HDR.jpg',
  'img/IMG_20240723_181531852_HDR.jpg',
  'img/IMG_20240723_182646075.jpg',
  'img/IMG_20240724_131036986_HDR.jpg',
  'img/IMG_20240724_131236371_HDR.jpg',
  'img/IMG_20240724_134151277_HDR~2.jpg',
  'img/IMG_20240727_214824317.jpg',
  'img/IMG_20240727_214859839.jpg',
  'img/IMG_20240727_215319568.jpg',
  'img/IMG_20240727_215331771.jpg',
  'img/IMG_20240829_132501445.jpg',
  'img/IMG_20240914_152647317_HDR.jpg',
  'img/IMG_20240914_223646954.jpg',
  'img/IMG_20240922_161022580_HDR.jpg',
  'img/IMG_20240922_161025367_HDR (1).jpg',
  'img/IMG_20240922_161025367_HDR.jpg',
  'img/IMG_20241025_221022716_HDR.jpg',
  'img/IMG_20241027_110559895.jpg',
  'img/IMG_20241027_122315919_HDR.jpg',
  'img/IMG_20241027_132856503.jpg',
  'img/IMG_20241109_145926465_HDR.jpg',
  'img/IMG_20241109_163105494.jpg',
  'img/IMG_20241112_170109803.jpg',
  'img/IMG_20241112_174501976.jpg',
  'img/IMG_20250102_180324596.jpg',
  'img/IMG_20250102_183015335_HDR~2.jpg',
  'img/IMG_20250107_143453427_HDR.jpg',
  'img/IMG_20250202_135239116_HDR.jpg',
  'img/IMG_20250207_150011735_HDR.jpg',
  'img/IMG_20250207_155217578.jpg',
  'img/IMG_20250209_181026101.jpg',
  'img/IMG-20240828-WA0008.jpg',
  'img/LondonTaule_019.JPG',
  'img/LondonTaule_054a.JPG',
  'img/original_2d6e9d2b-c0df-4263-8a42-7dcd7a5819d9_IMG_20231113_070219317_HDR_AE.jpg',
  'img/photo_2024-07-08_13-30-50.jpg',
  'img/photo_2024-07-08_13-30-54.jpg',
  'img/photo_2025-05-18 12.56.22.jpeg',
  'img/photo_2025-05-18 12.58.58.jpeg',
  'img/photo_2025-05-18 12.59.07.jpeg',
  'img/photo_2025-05-18 13.02.00.jpeg',
  'img/photo_2025-05-18 13.04.48.jpeg',
  'img/photo_2025-05-18 13.08.25.jpeg',
  'img/photo_2025-05-18 13.09.09.jpeg',
  'img/photo_2025-05-18 13.12.17.jpeg',
  'img/photo_2025-05-18 13.15.46.jpeg',
  'img/photo_2025-05-18 13.16.10.jpeg',
  'img/photo_2025-05-18 13.16.57.jpeg',
  'img/Quadre_Seva.jpg',
  'img/SelvaNegra2016_287.JPG',
  'img/Seva Lluna 20190805215517_IMG_0051_1_1.JPG',
  'img/Seva_ArbresNevats.JPG',
  'img/Seva_Campanar_2.JPG',
  'img/SEVA_CarrerDeBaix_TOMAS.jpg',
  'img/SEVA_Flors_001.jpg',
  'img/SEVA_GiraSol.JPG',
  'img/SEVA_Pati_TOMAS.jpg',
  'img/Seva_quadreCapSantMiquel.jpg',
  'img/SEVA_RellotgeSol.JPG',
  'img/Seva.png',
  'img/Suissa2017 (49).JPG',
  'img/Suissa2017 (56).JPG',
  'img/Suissa2017 (227).JPG',
  'img/Viladrau_2017 (4).JPG'
];

var indexImatge = 0;
var currentLayer = 1;
var timerCanviFoto = null;
var hideControlsTimer = null;
var preloadedImages = {};

// Elements DOM
var layer1 = document.getElementById('bg-layer-1');
var layer2 = document.getElementById('bg-layer-2');
var clockEl = document.getElementById('clock-digital');
var dateEl = document.getElementById('date-val');
var weatherBox = document.getElementById('weather-box');
var tempEl = document.getElementById('temp-val');
var weatherIconEl = document.getElementById('weather-icon');
var brightnessOverlay = document.getElementById('brightness-overlay');

// Controladors de navegació i configuració
var btnPrev = document.getElementById('btn-prev');
var btnNext = document.getElementById('btn-next');
var btnSettings = document.getElementById('btn-settings');
var modalSettings = document.getElementById('settings-modal');
var btnCloseSettings = document.getElementById('btn-close-settings');

var rangeSpeed = document.getElementById('range-speed');
var speedVal = document.getElementById('speed-val');
var selectTextSize = document.getElementById('select-text-size');
var selectPosition = document.getElementById('select-position');
var selectEffect = document.getElementById('select-effect');
var rangeBrightness = document.getElementById('range-brightness');
var chkClock = document.getElementById('chk-clock');
var chkDate = document.getElementById('chk-date');
var chkWeather = document.getElementById('chk-weather');

/* Configuració per defecte (Minuts sensers) */
var config = {
  speedMinutes: 2,
  textSize: 'normal',
  position: 'bottom-right',
  effect: 'fade',
  brightness: 100,
  showClock: true,
  showDate: true,
  showWeather: true
};

/* Format text minuts */
function formatMinutsText(minuts) {
  minuts = parseInt(minuts, 10);
  if (minuts === 0) return "Fixe (sense canvi)";
  if (minuts === 1) return "1 minut";
  return minuts + " minuts";
}

/* Precàrrega de 3 imatges a memòria */
function precarrregarImatges() {
  if (!imatges || imatges.length === 0) return;
  
  for (var offset = 0; offset < 3; offset++) {
    var idx = (indexImatge + offset) % imatges.length;
    var url = imatges[idx];
    if (!preloadedImages[url]) {
      var img = new Image();
      img.src = encodeURI(url);
      preloadedImages[url] = img;
    }
  }
}

/* Carregar Configuració des de LocalStorage */
function carregarConfiguracio() {
  var savedConfig = localStorage.getItem('marc_digital_arte_config');
  if (savedConfig) {
    try {
      config = Object.assign(config, JSON.parse(savedConfig));
    } catch(e){}
  }

  // Actualitzar valors UI
  rangeSpeed.value = config.speedMinutes;
  speedVal.textContent = formatMinutsText(config.speedMinutes);
  selectTextSize.value = config.textSize;
  selectPosition.value = config.position;
  selectEffect.value = config.effect;
  rangeBrightness.value = config.brightness;
  chkClock.checked = config.showClock;
  chkDate.checked = config.showDate;
  chkWeather.checked = config.showWeather;

  aplicarConfiguracio();
}

rangeSpeed.addEventListener('input', function() {
  speedVal.textContent = formatMinutsText(this.value);
});

/* Aplicar la configuració */
function aplicarConfiguracio() {
  // 1. Mostrar/Amagar elements
  clockEl.style.display = config.showClock ? 'block' : 'none';
  dateEl.style.display = config.showDate ? 'block' : 'none';
  weatherBox.style.display = config.showWeather ? 'flex' : 'none';

  // 2. Mida del Text i Posició
  document.body.className = 'pos-' + config.position + ' size-' + config.textSize + ' effect-' + config.effect;

  // 3. Mode Nit (00:00h - 06:00h) o Brillantor
  var ara = new Date();
  var hora = ara.getHours();
  var esModeNit = hora >= 0 && hora < 6;

  if (esModeNit) {
    brightnessOverlay.style.opacity = 0.80;
  } else {
    var opacitatFosca = (100 - config.brightness) / 100;
    brightnessOverlay.style.opacity = opacitatFosca;
  }

  // 4. Temporitzador de canvi de foto
  iniciarTemporitzador();

  // Desar
  localStorage.setItem('marc_digital_arte_config', JSON.stringify(config));
}

function iniciarTemporitzador() {
  if (timerCanviFoto) clearInterval(timerCanviFoto);
  
  var minuts = parseInt(config.speedMinutes, 10);
  if (minuts > 0) {
    timerCanviFoto = setInterval(function() {
      canviarImatgeFons(1);
    }, minuts * 60 * 1000);
  }
}

/* Barrejar Fotos */
function barrejarFotos(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/* Transició de fotos (Direcció: +1 següent, -1 anterior) */
function canviarImatgeFons(direccio) {
  if (!imatges || imatges.length === 0) return;
  if (!direccio) direccio = 1;

  indexImatge = (indexImatge + direccio + imatges.length) % imatges.length;
  var nextImgUrl = imatges[indexImatge];

  precarrregarImatges();

  if (currentLayer === 1) {
    layer2.style.backgroundImage = "url('" + encodeURI(nextImgUrl) + "')";
    layer2.classList.add('active');
    layer1.classList.remove('active');
    currentLayer = 2;
  } else {
    layer1.style.backgroundImage = "url('" + encodeURI(nextImgUrl) + "')";
    layer1.classList.add('active');
    layer2.classList.remove('active');
    currentLayer = 1;
  }
}

/* Formatar la data catalana */
function formatarDataCatalana(data) {
  var dies = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'];
  var mesos = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
  
  var diaSetmana = dies[data.getDay()];
  var diaMes = data.getDate();
  var mesNom = mesos[data.getMonth()];
  
  var preposicio = (mesNom.startsWith('A') || mesNom.startsWith('O')) ? "d'" : "de ";
  
  return diaSetmana + ", " + diaMes + " " + preposicio + mesNom;
}

function actualitzaRellotge() {
  var ara = new Date();
  var h = ara.getHours();
  var m = ara.getMinutes();
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  clockEl.textContent = h + ':' + m;

  dateEl.textContent = formatarDataCatalana(ara);
  
  aplicarConfiguracio();
}

function getIconaTemps(code) {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95) return '⛈️';
  return '🌡️';
}

function aplicarColorTemperatura(temp) {
  tempEl.classList.remove('temp-cold', 'temp-normal', 'temp-hot', 'temp-extreme-hot');
  
  if (temp <= 12) {
    tempEl.classList.add('temp-cold');
  } else if (temp >= 35) {
    tempEl.classList.add('temp-extreme-hot');
  } else if (temp >= 25) {
    tempEl.classList.add('temp-hot');
  } else {
    tempEl.classList.add('temp-normal');
  }
}

function carregarTempsSeva() {
  var url = "https://api.open-meteo.com/v1/forecast?latitude=41.8386&longitude=2.2743&current_weather=true";

  fetch(url)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      if (data && data.current_weather) {
        var temp = Math.round(data.current_weather.temperature);
        var weatherCode = data.current_weather.weathercode;
        tempEl.textContent = temp + "°C";
        weatherIconEl.textContent = getIconaTemps(weatherCode);
        aplicarColorTemperatura(temp);
      }
    }).catch(function(err){});
}

/* Gestió dels controls visuals en tocar la pantalla (<, > i ⚙️) */
function mostrarControlsUI() {
  btnSettings.classList.add('visible');
  btnPrev.classList.add('visible');
  btnNext.classList.add('visible');
  
  if (hideControlsTimer) clearTimeout(hideControlsTimer);
  
  hideControlsTimer = setTimeout(function() {
    if (modalSettings.classList.contains('hidden')) {
      btnSettings.classList.remove('visible');
      btnPrev.classList.remove('visible');
      btnNext.classList.remove('visible');
    }
  }, 4000);
}

function onPantallaTocada(e) {
  if (!modalSettings.contains(e.target) && 
      !btnSettings.contains(e.target) && 
      !btnPrev.contains(e.target) && 
      !btnNext.contains(e.target)) {
    mostrarControlsUI();
  }
}

document.body.addEventListener('touchstart', onPantallaTocada, { passive: true });
document.body.addEventListener('click', onPantallaTocada);

// Navegació Manual
btnPrev.addEventListener('click', function(e) {
  e.stopPropagation();
  canviarImatgeFons(-1);
  iniciarTemporitzador();
});

btnNext.addEventListener('click', function(e) {
  e.stopPropagation();
  canviarImatgeFons(1);
  iniciarTemporitzador();
});

// Modal Configuració
function obrirModal(e) {
  if (e) e.stopPropagation();
  modalSettings.classList.remove('hidden');
}

btnSettings.addEventListener('click', obrirModal);

function tancarModal() {
  config.speedMinutes = rangeSpeed.value;
  config.textSize = selectTextSize.value;
  config.position = selectPosition.value;
  config.effect = selectEffect.value;
  config.brightness = rangeBrightness.value;
  config.showClock = chkClock.checked;
  config.showDate = chkDate.checked;
  config.showWeather = chkWeather.checked;

  aplicarConfiguracio();
  modalSettings.classList.add('hidden');
  btnSettings.classList.remove('visible');
  btnPrev.classList.remove('visible');
  btnNext.classList.remove('visible');
}

btnCloseSettings.addEventListener('click', tancarModal);

/* Inicialització */
barrejarFotos(imatges);
precarrregarImatges();
canviarImatgeFons(0);
actualitzaRellotge();
carregarTempsSeva();
carregarConfiguracio();

setInterval(actualitzaRellotge, 1000);
setInterval(carregarTempsSeva, 900000);
