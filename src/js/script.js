import * as dat from 'dat.gui';

const gui = new dat.GUI();
const banner = document.querySelector('.banner')
const w = {
  'width': 1200,
  '--g': 20,
  '--pi-1-x': 36,
  '--pi-2-x': 80,
  '--pi-3-x': 52,
  '--pi-4-x': 22
}

window.onload = function() {
  const pe1 = getComputedStyle(banner).getPropertyValue('--pe-1');
  console.log('pe1 :>> ', pe1);
  gui.add(w, 'width', 600, 1200).onChange(setValue);
  gui.add(w, '--g', 0, 30).onChange(setValue);
  gui.add(w, '--pi-1-x', 0, 50).onChange(setValue);
  gui.add(w, '--pi-2-x', 55, 99).onChange(setValue);
  gui.add(w, '--pi-3-x', 56, 99).onChange(setValue);
  gui.add(w, '--pi-4-x', 0, 48).onChange(setValue);
};

function setValue() {
  banner.style.width = w.width+"px";
  banner.style.setProperty('--g', w['--g']+"px");
  banner.style.setProperty('--pi-1-x', w['--pi-1-x']+"%");
  banner.style.setProperty('--pi-2-x', w['--pi-2-x']+"%");
  banner.style.setProperty('--pi-3-x', w['--pi-3-x']+"%");
  banner.style.setProperty('--pi-4-x', w['--pi-4-x']+"%");
}