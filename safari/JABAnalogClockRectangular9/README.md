# JABAnalogClockRectangular9 (v9.0)

Aplicació Web Progressiva (PWA) de rellotge analògic personalitzat, dissenyada específicament per a pantalles iPad en orientació horitzontal i vertical.

---

## 📱 Captura de Pantalla / Vista Prèvia

![JABitxu Clock en execució a l'iPad](./img/JABAnalogClockRectangular8_v13.20260730.jpeg)

*Exemple del rellotge en funcionament en un iPad (Mode Vertical).*[cite: 1]

---

## 🚀 Característiques Principals

* **Disseny Adaptatiu (Responsive):** Reorganitza automàticament els elements en mode Horitzontal (`viewBox="-666.5 -500 1333 1000"`) o Vertical (`viewBox="-500 -666.5 1000 1333"`).[cite: 1]
* **Fase Lunar Astronòmica Proporcional:** Dibuix vectorial continu calculat a partir del percentatge exacte d'il·luminació real. En entrar en lluna menguant, l'ombra comença des d'una línia prima mostrant la lluna gairebé tota pintada.
* **Informació Meteorològica Integrada:** Previsió de temperatura en temps real per a Seva (Osona) mitjançant l'API d'Open-Meteo, amb codificació de colors segons el rang tèrmic.[cite: 1]
* **Gestió Intel·ligent de Brillantor (Mode Nit/Dia):**
  * **Mode Dia (06:00h - 00:00h):** Brillantor ajustada al **60%** (`0.60`) per a una visualització confortable i elegant en interiors.[cite: 1]
  * **Mode Nit (00:00h - 06:00h):** Atenuació automàtica al **20%** (`0.20`) d'opacitat per evitar molèsties a la foscor.[cite: 1]
  * **Control Tàctil:** Permet ajustar la brillantor manualment fent gliscar un dit verticalment per la pantalla (`touchmove`).[cite: 1]
* **Suport Offline (PWA / Service Worker):** Memòria cau d'actius (`v9.0`) per funcionar de manera fluida com a aplicació independent d'iOS/iPadOS sense barra de navegació.[cite: 1]

---

## 📁 Estructura del Projecte

| Fitxer | Descripció |
| :--- | :--- |
| `index.html` | Estructura principal en SVG vectorial i configuració PWA per a iPadOS. |[cite: 1]
| `css/style.css` | Estils visuals, escalat de text, fonts i colors de temperatura. |[cite: 1]
| `js/clock.js` | Lògica contínua del rellotge, càlcul astronòmic de la lluna proporcional, API temps i brillantor. |
| `js/sw.js` | Service Worker amb gestió de memòria cau versió `v9.0`. |
| `img/icona-ipad.png` | Icona de l'aplicació per a la pantalla d'inici d'iPad. |[cite: 1]
| `img/JABAnalogClockRectangular8_v13.20260730.jpeg` | Imatge d'exemple d'execució real a l'iPad. |[cite: 1]

---

## 📋 Historial de Versions

* **`v9.0` (JABAnalogClockRectangular9)**: Fase lunar dibuixada en proporció 100% contínua i real al percentatge d'ombrat. Brillantor automàtica al 60% (dia) i 20% (nit).