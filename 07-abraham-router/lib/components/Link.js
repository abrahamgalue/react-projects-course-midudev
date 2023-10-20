import{jsx as _jsx}from"react/jsx-runtime";import{EVENTS,BUTTON}from"../utils/consts";export function navigate(href){window.history.pushState({},"",href);const navigationEvent=new Event(EVENTS.PUSHSTATE);window.dispatchEvent(navigationEvent)}export function Link({target,to,...props}){const handleClick=e=>{const isMainEvent=e.button===BUTTON.primary;const isModifiedEvent=e.metaKey||e.altKey||e.ctrlKey||e.shiftKey;const isManagableEvent=target===undefined||target==="_self";if(isMainEvent&&isManagableEvent&&!isModifiedEvent){e.preventDefault();navigate(to)}};return _jsx("a",{onClick:handleClick,href:to,target:target,...props})}