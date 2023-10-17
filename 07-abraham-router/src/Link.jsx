import { EVENTS } from './consts'

export function navigate(href) {
  window.history.pushState({}, '', href)
  // crear un evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = e => {
    const isMainEvent = e.button === 0 // primary key
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
    const isManagableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManagableEvent && !isModifiedEvent) {
      e.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props}></a>
}
