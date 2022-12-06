const ready = new Promise<void>((resolve) => {
  if (document.readyState === 'interactive') {
    return resolve()
  }
  document.addEventListener('readystatechange', (event) => {
    if (document.readyState === 'interactive') {
      resolve()
    }
  })
})

ready.then(onTheme).then(onTableResponsive)

function onTheme() {
  const matched = matchMedia('(prefers-color-scheme: dark)')

  matched.addEventListener('change', setTheme)

  setTheme(matched)

  function setTheme(event: { matches: boolean }) {
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'
  }
}

function onTableResponsive() {
  const content = document.querySelector('.content')
  if (content === null) return
  for (let element of content.getElementsByTagName('table')) {
    const responsive = document.createElement('section')
    responsive.className = 'table-responsive'
    responsive.append(element.cloneNode(true))
    element.replaceWith(responsive)
  }
}
