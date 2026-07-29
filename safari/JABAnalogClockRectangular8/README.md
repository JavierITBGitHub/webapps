```

---

## 🚀 Instruccions d'Instal·lació i Ús

### 1. Instal·lació en un servidor web
Puja tots els arxius de la carpeta del projecte al teu servidor web o hosting (per exemple, via FTP, GitHub Pages, Netlify o Vercel).

> **Nota sobre HTTPS:** Els *Service Workers* requereixen que la web se serveixi sota protocol segur (`https://`) per poder emmagatzemar la memòria cau a l'iPad.

### 2. Afegir a la pantalla d'inici de l'iPad (Mode PWA)
Per a una experiència de pantalla sencera sense barra de navegació de Safari:

1. Obre **Safari** a l'iPad i entra a la URL on has pujat el rellotge.
2. Toca la icona de **Compartir** (el quadrat amb la fletxa cap amunt).
3. Selecciona l'opció **"Afegeix a la pantalla d'inici"**.
4. Posa-li el nom que vulguis (ex: *JABitxu Clock*) i prem **Afegir**.
5. Obre l'aplicació directament des de la nova icona de l'escriptori. S'obrirà a **pantalla sencera**.

---

## 🎮 Instruccions de Funcionament i Gestos

| Acció / Gest | Resultat |
| :--- | :--- |
| **Girar l'iPad (Horitzontal ↔ Vertical)** | El rellotge redibuixa l'el·lipse i recol·loca els textos automàticament sense deformar-se. |
| **Lliscar el dit cap amunt** | Incrementa la brillantor de la pantalla. |
| **Lliscar el dit cap avall** | Redueix la brillantor de la pantalla (ideal per a la nit). |
| **Arribar a les 22:00h** | S'activa automàticament el **Mode Nit** (tons vermells foscos atenuats). |
| **Arribar a les 07:00h** | S'activa el **Mode Dia** normal. |
| **Desconnexió d'Internet** | El rellotge, la data i la lluna continuen funcionant. La temperatura mostra `--°C`. |

---

## 🛠️ Tecnologies Utilitzades

* **HTML5 / SVG:** Gràfics vectorials escalables per a una nitidesa perfecta en pantalles Retina.
* **CSS3:** Variables d'entorn (`var(--accent)`), Flexbox i filtres de brillantor.
* **JavaScript (ES5/ES6):** Manipulació de DOM vectorial, càlculs trigonomètrics de posició polar i càlculs astronòmics de la fase lunar.
* **Open-Meteo API:** Servei de previsió meteorològica gratuït i sense clau API.
* **Service Workers API:** Gestió de memòria cau local per al suport Offline.