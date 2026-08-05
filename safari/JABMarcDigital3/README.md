# Marc Digital de Fotos -- ARTE 🖼️⏰

Un marc digital de fotos interactiu dissenyat per a tauletes (com iPad) o pantalles dedicades. Mostra una galeria de fotos en pantalla completa amb transicions fluides, precàrrega d'imatges i informació en temps real sobre l'hora, la data i el temps meteorològic de Seva.

---

## 🌟 Novetats i Característiques Principals

- **Galeria de Fotos i Precàrrega Fluida:**
  - **Precàrrega de 3 fotos:** Les imatges es carreguen en segon pla per garantir transicions immediates i sense galledes en blanc.
  - **Navegació Tàctil Manual:** En tocar la pantalla, apareixen les fletes `<` i `>` centrades verticalment als costats per canviar a la foto següent o anterior.
  - **Temps en Minuts Senders:** Canvi automàtic configurable exclusivament en minuts (des de 0 minuts/fixe fins a 60 minuts).

- **Disseny i Alineació de Text:**
  - **Alineat a la dreta:** L'hora, la data i la temperatura estan alineats a la dreta.
  - **Mida de Data i Temperatura +25%:** Augmentada la visibilitat de la data i el temps.
  - **Personalització de Mida i Posició:** Opció des del menú de configuració per canviar la mida del text (*Normal, Gran, Molt gran*) i la posició del widget (*Abaix Dreta, Abaix Esquerra, Dalt Dreta, Dalt Esquerra*).

- **Informació del Temps (Seva - Open-Meteo API):**
  - Icona i temperatura actualitzades cada 15 minuts amb indicació de colors segons la temperatura:
    - 🔵 **Blau** ($\le 12\text{ °C}$): Fred
    - 🟢 **Verd** ($13\text{ °C} - 24\text{ °C}$): Normal / Temperat
    - 🟠 **Taronja** ($25\text{ °C} - 34\text{ °C}$): Calor
    - 🔴 **Vermell** ($\ge 35\text{ °C}$): Molta calor

- **Mode Nit Automàtic i Brillantor:**
  - Reducció automàtica de la brillantor al 20% de llum entre les **00:00h i les 06:00h**.
  - Lliscador per ajustar la brillantor manualment.

---

## 📁 Estructura del Projecte

```text
marc-digital-arte/
├── index.html         # Estructura HTML5 i finestra de configuració
├── css/
│   └── style.css      # Estils visuals, escalat de text i posicionament
├── js/
│   └── app.js         # Precàrrega, temporitzadors en minuts i control tàctil
├── img/               # Fons de pantalla i fotografies (.jpg, .png, .gif)
└── README.md          # Documentació del projecte
