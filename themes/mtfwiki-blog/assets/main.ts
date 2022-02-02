const matched = matchMedia('(prefers-color-scheme: dark)')

setTheme(matched.matches)
matched.addEventListener('change', (event) => setTheme(event.matches))

function setTheme(matches: boolean) {
  document.documentElement.dataset.theme = matches ? 'dark' : 'light'
}
