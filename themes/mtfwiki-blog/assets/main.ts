const ready = new Promise<void>((resolve) => {
  if (document.readyState === 'interactive') return resolve()
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') resolve()
  })
})

document.currentScript!.remove()

ready.then(onTableResponsive).then(onRestoreEmailAddress)

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
  const links = content.querySelectorAll<HTMLAnchorElement>('a[data-mailto]')
  for (const link of links) {
    const address = atob(link.dataset.mailto!)
    link.href = `mailto:${address}`
    if (link.textContent === '') {
      link.textContent = address
    }
  }
}
