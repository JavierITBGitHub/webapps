# 🖼️ Marc Digital de Fotos (Seva)

**Versió:** 2.0  
**Data d'actualització:** 5 d'agost de 2026  

Un marc de fotos digital modern, elegant i personalitzable dissenyat principalment per a tauletes (com iPad) o pantalles dedicades. Inclou la visualització de fotos de manera aleatòria, informació en temps real (rellotge, data i temps meteo) i un panell de configuració accessible al tocar la pantalla.

---

## ✨ Funcionalitats Principals

### 📸 Visualitzador de Fotos
* **Barreja Aleatòria (Shuffle):** Cada cop que s'inicia l'aplicació, la llista de 161+ imatges es barreja automàticament.
* **Transició Creuada Suau:** Canvi de foto sense fons en blanc ni parpellejos.
* **Efectes de Transició Configurables:** Permet triar entre diferents estils visuals (*Fade*, *Zoom suau* o *Canvi directe*).
* **Temporitzador Ajustable:** Interval de canvi de foto personalitzable (entre 5 i 30 segons).

### 🕒 Widget d'Informació en Temps Real
* **Rellotge Digital:** Hora actualitzada segon a segon en format gran i llegible.
* **Data i Dia:** Data completa en català amb format automàtic (*ex: Dimecres, 5 d'agost*).
* **Informació Meteo (Open-Meteo API):** Temperatura actual i icona del temps en temps real basats en les coordenades geogràfiques de Seva.

### ⚙️ Panell de Configuració Interactiu
* **Accés Tàctil (Roda Dentada):** En tocar qualsevol punt de la pantalla, apareix un botó de configuració (⚙️) que s'amaga automàticament al cap de 4 segons d'inactivitat.
* **Control de Brillantor / Intensitat de Llum:** Regulació de la brillantor de la pantalla mitjançant un lliscador (*slider*), ideal per reduir la llum durant la nit.
* **Personalització d'Elements Visuals:** Selector per mostrar o amagar de forma independent:
  * ⏰ Hora digital
  * 📅 Data i dia de la setmana
  * 🌡️ Temperatura i icona del temps
* **Persistència de Dades:** Tota la configuració es desa automàticament al navegador (`localStorage`), mantenint els teus ajustos tot i reiniciar el dispositiu.

### 📱 Disseny Adaptatiu (Responsive & PWA Ready)
* **Orientació Horizontal i Vertical:** S'adapta automàticament al girar la pantalla (*Landscape* o *Portrait*).
* **Mode Web App (PWA):** Configurat amb etiquetes d'Apple per funcionar a pantalla completa sense barres de navegació quan s'afegeix a la pantalla d'inici de l'iPad (`apple-mobile-web-app-capable`).

---

## 🛠️ Tecnologies Utilitzades

* **HTML5:** Estructura semàntica i control de capes.
* **CSS3:** Disseny fluid (*flexbox*, *keyframes*, filtres visuals i *backdrop-filter*).
* **JavaScript (Vanilla):** Gestió d'esdeveniments, temporitzadors i integració amb APIs sense dependències externes.
* **API Open-Meteo:** Consulta meteorològica gratuïta sense necessitat de clau d'API.

---

## 🚀 Com Utilitzar-lo

1. Clona o descarrega aquest repositori al teu ordinador o servidor local/web.
2. Assegura't de tenir les imatges a la carpeta `img/` respectant els noms especificats a `js/app.js`.
3. Obre el fitxer `index.html` en qualsevol navegador modern.
4. Per a una millor experiència en un iPad:
   * Obre la pàgina a Safari.
   * Clica la icona de compartir i selecciona **"Afegir a la pantalla d'inici"**.
   * Obre l'aplicació des de l'icona creada per gaudir-ne a pantalla completa.