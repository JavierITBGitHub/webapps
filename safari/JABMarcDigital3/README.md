# Marc Digital v3.0

Un projecte complet d'aplicació web per transformar qualsevol tauleta (iPad, Android) o pantalla en un marc digital de fotos elegant, adaptable i funcional.

---

## 🚀 Novetats a la Versió 3.0

* **Detecció d'Orientació d'Imatges (Vertical vs Horitzontal):** Les fotografies verticals es detecten automàticament i s'ajusten (`background-size: contain`) sobre un fons fosc suau per evitar retalls agressius o que es vegin "tombades".
* **Adaptació Responsive per a Pantalla Vertical (`@media portrait`):** Si es gira la tauleta de posició horitzontal a vertical, la mida del text (rellotge, data i temps) i els marges s'adapten dinàmicament per no trepitjar la imatge ni el centre de la pantalla.
* **Tractament d'Errors en Càrrega d'Imatges:** Si un fitxer d'imatge s'ha esborrat o té un nom incorrecte al codi, l'aplicació l'omet automàticament i salta a la següent sense mostrar una pantalla en negre.
* **Navegació per Gestos Tàctils (Swipe):** Glissa el dit cap a la dreta o cap a l'esquerra en qualsevol punt de la pantalla per canviar de foto sense haver d'utilitzar els botons.
* **Mode Pantalla Completa (Fullscreen API):** Afegit un botó dedicat al menú de configuració per ocultar la interfície del navegador i aconseguir una experiència 100% de marc digital.

---

## ⚡ Característiques Principals

1. **Galeria i Transicions:**
   * Barreja aleatòria (*Shuffle*) automàtica de les fotos en iniciar.
   * Precàrrega en segon pla (*preloading*) per a transicions fluides.
   * Efectes de transició configurables: *Fade* (suau), *Zoom* (Ken Burns) o directat (*none*).
   * Interval de canvi programable (de 1 a 120 minuts, o imatge fixa).

2. **Widget d'Informació:**
   * Rellotge digital de gran format amb tipografia optimitzada.
   * Data en català formatada correctament.
   * Informació meteorològica en temps real (mitjançant l'API gratuïta d'Open-Meteo per a Seva/Osona) amb icona i color segons la temperatura.
   * Posició del widget configurable (qualsevol de les 4 cantonades).
   * Mides de font ajustables (Normal, Gran, Molt gran).

3. **Control de Brillantor i Mode Nit:**
   * Lliscador de brillantor manual des del menú de configuració.
   * Atenuació nocturna automàtica entre les 00:00h i les 06:00h per no molestar a les fosques.

4. **Interfície i Usabilitat:**
   * Ocultació automàtica dels controls tàctils (fletxes i roda de configuració) al cap de 4 segons d'inactivitat.
   * Guardat de totes les preferències de l'usuari en el navegador via `localStorage`.

---

## 📁 Estructura del Projecte

```text
marc-digital/
├── index.html         # Estructura principal de l'aplicació i modal de configuració
├── css/
│   └── style.css      # Estils visuals, animacions, media queries i adaptabilitat
├── js/
│   └── app.js         # Llista de fotos, lògica de transició, meteo, temps i gestos
└── img/               # Carpeta amb la col·lecció de fotografies (.jpg, .png, .gif)