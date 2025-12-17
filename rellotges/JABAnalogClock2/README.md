# JABitxu Analog Clock 🕒

A minimalist, high-performance analog clock web application. This project features a fluid UI, real-time synchronization, and a fully responsive design tailored for any device or orientation.



## 🌟 Key Features

* **Dynamic Theme Toggle:** A sleek slider switch to alternate between **Dark** and **Light** modes.
* **Adaptive UI (Responsive):** Built using `vmin` units and Flexbox, ensuring the clock scales perfectly on mobile, tablets, and desktops.
* **Centered "Flex-Balance" Header:** The title "JABitxu Clock" remains perfectly centered on the screen, while the theme toggle is anchored to the right, maintaining visual symmetry.
* **Real-time Precision:** Smoothly animated hands calculated via Vanilla JavaScript for accurate timekeeping.
* **Modern Aesthetics:** Minimalist design with CSS custom variables for seamless theme transitions and 3D depth effects via box-shadows.

## 🛠️ Technical Deep Dive

### 1. The "VMIN" Scaling Strategy
To ensure the clock never overflows the screen (especially on mobile landscape mode), we used the `vmin` unit. This ensures the clock's diameter is always 75% of the **smallest** dimension of the viewport.

```css
.clock {
    width: 75vmin;
    height: 75vmin;
}
```

###  2. Perfect Centering Logic
The header uses a "three-column" flex strategy to solve the common issue of centering text when an element only exists on one side:

Spacer (Left): Occupies equal space to the switch.

Title (Center): Takes the remaining space with centered text.

Switch (Right): Aligned to the far right.

### 3. Smart Theme Management
Instead of hard-coding colors, the project uses CSS Custom Properties. Switching themes is as simple as changing the data-theme attribute on the <html> tag via JavaScript.
```CSS

/* Example of variable-based styling */
.slider {
    border: 1px solid var(--main-text-color);
}
```
### 📁 Project Structure

* 📂 **`index.html`** — Optimized HTML5 structure using semantic tags for better SEO and accessibility.
* 🎨 **`css/style.css`** — Responsive styles, dynamic theme definitions (Dark/Light), and fluid hand animations.
* ⚡ **`js/clock.js`** — Core JavaScript logic for real-time calculations and theme state management.
* 🖼️ **`img/`** — High-quality SVG/PNG assets for branding, logos, and developer credits.
### 👨‍💻 Credits & Collaboration
Concept & Design: JABITXU.

Development Partners: This project was refined and optimized with the assistance of ChatGPT and Gemini.

### 📝 License
This project is open-source. Feel free to fork, modify, and use it for your own creative clock projects!