# Marc Digital de Fotos - ARTE 🖼️⏰

Un marc digital de fotos interactiu dissenyat principalment per a tauletes (com iPad) o pantalles dedicades. Mostra una galeria de fotos en pantalla completa amb transicions personalitzables, informació en temps real sobre l'hora, la data i el temps meteorològic de Seva.

---

## 🌟 Característiques Principals

- **Galeria de Fotos Dinàmica:**
  - Carrega i barreja aleatòriament les imatges a cada inici.
  - Canvi automàtic de fotos amb temps configurable (de 0s/fixe fins a 1 hora).
  - Efectes de transició a escollir: **Dissoldre (Fade)**, **Zoom suau** o **Directe (sense efecte)**.

- **Informació en Pantalla (Widget):**
  - **Rellotge Digital:** Hora actual en format gran i llegible.
  - **Data en Català:** Dia de la setmana i mes amb format correcte (ex: *Dimecres, 5 d'Agost*).
  - **Temps a Seva (Open-Meteo API):** Icona del clima i temperatura actualitzada cada 15 minuts.
  - **Color per Temperatura:**
    - 🔵 **Blau** ($\le 12\text{ °C}$): Fred
    - 🟢 **Verd** ($13\text{ °C} - 24\text{ °C}$): Normal / Temperat
    - 🟠 **Taronja** ($25\text{ °C} - 34\text{ °C}$): Calor
    - 🔴 **Vermell** ($\ge 35\text{ °C}$): Molta calor

- **Control de Brillantor i Mode Nit:**
  - Control d'intensitat de la llum manual mitjançant un lliscador de brillantor.
  - **Mode Nit Automàtic:** Atenuació automàtica de la pantalla al 20% de llum entre les **00:00h i les 06:00h**.

- **Interfície Adaptativa i Tàctil (iPad):**
  - **Menu de Configuració Amagat:** La roda dentada ⚙️ apareix en **tocar qualsevol punt de la pantalla** (o moure el ratolí) i s'amaga automàticament passats 4 segons.
  - Responsive per a pantalles horitzontals i verticals (mode *Portrait* i *Landscape*).
  - Disseny d'estil iOS WebApp (pila d'icones i suport per a pantalla completa).

---

## 📁 Estructura del Projecte

```text
marc-digital/
├── index.html         # Estructura HTML5 i modal de configuració
├── css/
│   └── style.css      # Estils, disseny responsive, colors de temp i transicions
├── js/
│   └── app.js         # Llogica del rellotge, clima, galeria, configuració i esdeveniments tàctils
├── img/               # Carpeta amb les imatges de la galeria (.jpg, .png, .gif)
└── README.md          # Documentació del projecte
