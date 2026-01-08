# JABitxu Analog Clock RECTANGULAR 🕒


## 🏆 Estil i Concepte: "Ghost Luxury Rectangular"
**JABitxu Clock** és una peça de programació visual que fusiona l'elegància de la rellotgeria clàssica (estil Tissot o Rolex) amb el minimalisme digital modern. Dissenyat específicament per aprofitar al màxim les pantalles rectangulars (optimitzat per a dispositius com el Samsung Galaxy J7), el projecte fuig de l'esquema circular tradicional per oferir una experiència de pantalla completa.

L'estètica es defineix com a **"Ghost Luxury"**: una interfície neta on els elements visuals innecessaris s'han eliminat per deixar pas a "paraules" i dades que suren. Les manetes no són estàtiques en longitud; tenen vida pròpia, adaptant-se a la forma de la pantalla i respectant sempre l'espai dels números, simulant un mecanisme intel·ligent i sofisticat.

---

## 🛠 Especificacions Tècniques

Aquest projecte ha estat creat des de zero utilitzant **Vanilla JavaScript, CSS3 i HTML5**, sense dependències externes per garantir la màxima lleugeresa i velocitat.

### 1. Geometria de Projecció Rectangular
A diferència d'un rellotge convencional on els números es col·loquen en un radi fix (cercle), el **JABitxu Clock** utilitza un algorisme de **projecció rectangular (Ray-casting)**.
*   **Càlcul:** El codi calcula l'angle de cada hora (30°, 60°, 90°...) i projecta un raig des del centre fins a la intersecció amb les vores del rectangle del navegador.
*   **Resultat:** Els números (1-12) i les 60 marques de minuts s'empenyen automàticament cap als extrems de la pantalla, independentment de si el mòbil està en posició vertical o horitzontal.

### 2. Manetes "Elàstiques" Adaptatives
La característica més complexa és el sistema de manetes surants:
*   **Lògica de Col·lisió:** JavaScript calcula en cada fotograma la distància entre el centre i els números.
*   **Mida Dinàmica:** Mitjançant la funció trigonomètrica `Math.min(limitX / sin, limitY / cos)`, les manetes s'estiren quan apunten a les zones amb més espai (com les 12 o les 6) i s'encullen automàticament quan s'apropen a les zones més estretes (les 3 o les 9).
*   **Efecte Visual:** Això garanteix que les manetes mai arribin a tapar els números, creant un espai buit harmònic al voltant de l'eix central.

### 3. Complicacions de Rellotgeria Real
S'han integrat dues "complicacions" (funcions addicionals) que s'actualitzen en temps real:
*   **Meteo de Seva:** Connexió directa mitjançant l'API d'**Open-Meteo** per mostrar la temperatura actual de Seva (Catalunya). Les dades es refresquen automàticament cada 10 minuts.
*   **Calendari Dinàmic:** Un sistema que tradueix la data del sistema al català, mostrant el dia de la setmana i el número amb un disseny tipogràfic d'alta llegibilitat.

### 4. Gestió de Temes i Persistència
*   **Mode Nit/Dia:** Inclou un selector discret per canviar entre el mode clar (fons blanc/manetes negres) i el mode fosc (fons negre absolut per a pantalles AMOLED).
*   **Estat Guardat:** Utiliza `localStorage` per recordar la preferència de l'usuari la propera vegada que obri l'aplicació.

### 5. Optimització de Rendiment
El rellotge funciona amb un cicle de renderitzat d'**1 FPS (frames per segon)** per minimitzar el consum de bateria, mentre que els càlculs de la cara del rellotge només es tornen a executar si l'usuari canvia l'orientació del dispositiu o la mida de la finestra.

---
### Dissenyat per JABITXU
*Cuinat amb la col·laboració d'IA Gemini per a l'excel·lència en el càlcul geomètric.*