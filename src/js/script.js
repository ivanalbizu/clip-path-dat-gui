import * as dat from 'dat.gui'
const gui = new dat.GUI()

const settings = {
  'width': 1200,
  '--g': 20,
  '--pi-1-x': 36,
  '--pi-2-x': 80,
  '--pi-3-x': 52,
  '--pi-4-x': 22
}

const setValue = banner => {
  banner.style.width = settings.width+"px"
  banner.style.setProperty('--g', settings['--g']+"px")
  banner.style.setProperty('--pi-1-x', settings['--pi-1-x']+"%")
  banner.style.setProperty('--pi-2-x', settings['--pi-2-x']+"%")
  banner.style.setProperty('--pi-3-x', settings['--pi-3-x']+"%")
  banner.style.setProperty('--pi-4-x', settings['--pi-4-x']+"%")
}

window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.banner')

  gui.add(settings, 'width', 600, 1200).onChange(setValue.bind(null, banner))
  gui.add(settings, '--g', 0, 30).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-1-x', 0, 50).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-2-x', 55, 99).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-3-x', 56, 99).onChange(setValue.bind(null, banner))
  gui.add(settings, '--pi-4-x', 0, 48).onChange(setValue.bind(null, banner))
})
