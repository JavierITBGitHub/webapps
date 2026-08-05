# 🖼️ Marc Digital de Fotos (Seva)

**Versió:** 2.1  
**Data d'actualització:** 5 d'agost de 2026  

Un marc de fotos digital modern, elegant i personalitzable dissenyat principalment per a tauletes (com iPad) o pantalles dedicades. Inclou la visualització de fotos de manera aleatòria, informació en temps real (rellotge, data i temps meteo) i un panell de configuració accessible al tocar la pantalla.

---

## ✨ Funcionalitats Principals

### 📸 Visualitzador de Fotos
* **Barreja Aleatòria (Shuffle):** Cada cop que s'inicia l'aplicació, la llista d'imatges es barreja automàticament.
* **Transició Creuada Suau:** Canvi de foto sense fons en blanc ni parpellejos.
* **Efectes de Transició Configurables:** Permet triar entre diferents estils visuals (*Fade*, *Zoom suau* o *Canvi directe*).
* **Temporitzador Ajustable per Lliscador:** Interval personalitzable de 0 (Fixe) a 3600 segons (1 hora), establert per defecte en 120 segons (2 minuts).

### 🕒 Widget d'Informació en Temps Real
* **Rellotge Digital:** Hora actualitzada segon a segon en format gran i llegible.
* **Data i Dia:** Data en català amb el mes en majúscula (*ex: Dimecres, 5 d'Agost*).
* **Informació Meteo (Open-Meteo API):** Temperatura actual i icona del temps en temps real basats en les coordenades geogràfiques de Seva.

### ⚙️ Panell de Configuració Interactiu
* **Accés Tàctil (Roda Dentada):** En tocar qualsevol punt de la pantalla, apareix un botó de configuració (⚙️) que s'amaga automàticament al cap de 4 segons d'inactivitat.
* **Control de Brillantor / Intensitat de Llum:** Regulació de la brillantor de la pantalla mitjançant un lliscador (*slider*).
* **Personalització d'Elements Visuals:** Selector per mostrar o amagar de forma independent:
  * ⏰ Hora digital
  * 📅 Data i dia de la setmana
  * 🌡️ Temperatura i temps
* **Persistència de Dades:** Tota la configuració es desa automàticament al navegador (`localStorage`).