import { EVENTS, BUTTON } from '../utils/consts'

export function navigate(href) {
  window.history.pushState({}, '', href)
  // crear un evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
  const handleClick = e => {
    const isMainEvent = e.button === BUTTON.primary // primary key
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
    const isManagableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManagableEvent && !isModifiedEvent) {
      e.preventDefault()
      navigate(to) // SPA navigation
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
