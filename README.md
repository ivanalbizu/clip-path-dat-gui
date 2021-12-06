## Grid con display Grid

Se coloca tres imágenes una encima de otra mediante display grid

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

## Modificación de puntos clip-path con librería javascript: dat.gui

