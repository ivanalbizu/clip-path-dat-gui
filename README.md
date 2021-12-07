## Arrancar proyecto con ParcelJS

Sobre la raiz del proyecto, con ParcelJS instalado (Yo tengo instalada la versión 1.12.5)

```bash
parcel index.html
```

## Grid con display Grid

Se colocan tres imágenes una encima de otra mediante <code>display grid</code>

```css
.banner {
  display: grid;
  width: 1200px;
  max-width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0;
  margin: auto;
  .left,
  .center,
  .right {
    grid-area: 1 / 1 / 2 / 2;
  }
}
```

Se modifica su visibilidad actuando sobre <code>clip-path</code> de manera que la parte no visible de una imagen será la parte visible de las otras dos imágenes. La definición de <code>clip-path</code> consta de 4 puntos, todas definidas mediante variables CSS ya que algunos de los puntos de una pueden ser comúnes para las otras imágenes

```css
.banner {
  --pe-1: 0% 0%;
  --pe-2: 100% 0%;
  --pe-3: 100% 100%;
  --pe-4: 0% 100%;
  --g: 20px;
  --gutter: calc(var(--g) / 2);
  --pi-1-x: 36%;
  --pi-2-x: 80%;
  --pi-3-x: 52%;
  --pi-4-x: 22%;
  --pi-1-y: 0%;
  --pi-2-y: 0%;
  --pi-3-y: 100%;
  --pi-4-y: 100%;
}

.left {
  clip-path: polygon(
    var(--pe-1),
    calc(var(--pi-1-x) - var(--gutter)) var(--pi-1-y),
    calc(var(--pi-4-x) - var(--gutter)) var(--pi-4-y),
    var(--pe-4)
  );
}
.center {
  clip-path: polygon(
    calc(var(--pi-1-x) + var(--gutter)) var(--pi-1-y),
    calc(var(--pi-2-x) - var(--gutter)) var(--pi-2-y),
    calc(var(--pi-3-x) - var(--gutter)) var(--pi-3-y),
    calc(var(--pi-4-x) + var(--gutter)) var(--pi-4-y)
  );
}
.right {
  clip-path: polygon(
    calc(var(--pi-2-x) + var(--gutter)) var(--pi-2-y),
    var(--pe-2),
    var(--pe-3),
    calc(var(--pi-3-x) +  var(--gutter)) var(--pi-3-y)
  );
}
```

Realmente lo que más tiempo lleva es definir y tener claro como se realiza el sistema de coordenadas. Lo dibuje en papel, pero pongo aquí una imagen. Defino 4 puntos exteriores (--pe) que están fijos en los extremos, y puntos interiores y comunes entre imágenes (--pi) que divido en ejes X e Y

![Sistema de coordenadas](banner-coords.jpg)

## Modificación de puntos clip-path con librería javascript: dat.gui

Se crea una instancia de la librería <code>dat.GUI</code>

```javascript
const gui = new dat.GUI()
```

Se crea un objeto para guardar los valores iniciales del <code>banner</code> que más adelante serán actualizados con <code>dat.GUI</code>

```javascript
const settings = {
  'width': 1200,
  '--g': 20,
  '--pi-1-x': 36,
  '--pi-2-x': 80,
  '--pi-3-x': 52,
  '--pi-4-x': 22
}
```

La función <code>const setValue = banner => {}</code> será usada para cambiar los estilos CSS cuando se produzcan cambios por el usuario mediante el panel <code>dat.GUI</code>

```javascript
const setValue = banner => {
  banner.style.width = settings.width+"px"
  banner.style.setProperty('--g', settings['--g']+"px")
  banner.style.setProperty('--pi-1-x', settings['--pi-1-x']+"%")
  banner.style.setProperty('--pi-2-x', settings['--pi-2-x']+"%")
  banner.style.setProperty('--pi-3-x', settings['--pi-3-x']+"%")
  banner.style.setProperty('--pi-4-x', settings['--pi-4-x']+"%")
}
```

Para usar <code>dat.GUI</code> usamos el método <code>add</code> al que le pasamos 4 parámetros

<ol>
  <li>Objeto con las <code>settings</code></li>
  <li>Propiedad CSS que queremos escuchar cambios</li>
  <li>Valor mínimo permitido</li>
  <li>Valor máximo permitido</li>
</ol>

Si se producen cambios en los atributos CSS, entonces llamamos a la función <code>setValue.bind(null, banner)</code> en la que pasamos el banner como parámetro

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.banner')

  gui.add(settings, 'width', 600, 1200).onChange(setValue.bind(null, banner))
  gui.add(settings, '--g', 0, 30).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-1-x', 0, 50).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-2-x', 55, 99).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-3-x', 56, 99).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-4-x', 0, 48).onChange(setValue.bind(null, banner))
})
```