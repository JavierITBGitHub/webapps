# Crear un enllaç a l'escriptori per a PyCharm

Aquest document explica com crear un **enllaç a l'escriptori** per executar PyCharm des del directori:

```
/home/javier.amaya/Documents/pycharm-2025.2.3/
```

Les instruccions estan pensades per a **Linux (entorns GNOME / KDE)**.

---

## Opció 1: Crear un fitxer `.desktop` manualment (recomanat)

### 1. Crear el fitxer d'enllaç

Crea un fitxer nou a l'escriptori:

```bash
gedit  ~/Escriptori/pycharm.desktop
```
o
```bash
nano ~/Desktop/pycharm.desktop
```
### 2. Contingut del fitxer

Copia i enganxa aquest contingut:

```ini
[Desktop Entry]
Version=1.0
Type=Application
Name=PyCharm
Comment=IDE de Python
Exec=/home/javier.amaya/Documents/pycharm-2025.3/bin/pycharm.sh
Icon=/home/javier.amaya/Documents/pycharm-2025.3/bin/pycharm.png
Terminal=false
Categories=Development;IDE;
```

Desa el fitxer (`Ctrl + O`) i surt (`Ctrl + X`).

### 3. Donar permisos d'execució

```bash
chmod +x  ~/Escriptori/pycharm.desktop
```

### 4. Permetre l'execució (GNOME)

Fes **clic dret** sobre l'enllaç i selecciona:

> ✅ *Permetre l'execució*

Ara ja pots obrir PyCharm directament des de l'escriptori.

---

## Opció 2: Crear l'enllaç amb arrossegar i deixar anar

1. Ves al directori:
   ```bash
   /home/javier.amaya/Documents/pycharm-2025.2.3/bin/
   ```
2. Arrossega el fitxer `pycharm.sh` a l'escriptori
3. Quan et pregunti, selecciona **Crear enllaç**

> ⚠️ Aquesta opció pot no crear una icona correcta en alguns entorns.

---

## Notes importants

- Si actualitzes PyCharm i canvia la carpeta (`pycharm-2025.x.x`), hauràs d'actualitzar el camí `Exec` i `Icon`.
- Aquest mètode també funciona per a altres IDEs de JetBrains.

---

## Autor

Creat per **JABITXU** 🛠️
