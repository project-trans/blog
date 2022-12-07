const ready = new Promise<void>((resolve) => {
  if (document.readyState === 'interactive') return resolve()
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') resolve()
  })
})

document.currentScript!.remove()

ready.then(onTheme).then(onTableResponsive).then(onRestoreEmailAddress)

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

function onRestoreEmailAddress() {
  const content = document.querySelector('article.content')
  if (!content) return
  const links = content.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]')
  for (const link of links) {
    const address = atob(link.pathname)
    link.href = `mailto:${address}`
    if (link.textContent === '') {
      link.textContent = address
    }
  }
}
