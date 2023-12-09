import { useContext } from 'react'
import { State } from '../content/start'

function useStart() {
  const {
    head,
    setHead,
    vaqt,
    setVaqt,
    lang,
    setLang,
    nav,
    setNav,
    son,
    setSon,
    dark,
    setDark,
    soat,
    setSoat,
    collapsed,
    setCollapsed,
    menubar,
    setMenubar,
  } = useContext(State)
  return {
    head,
    setHead,
    vaqt,
    setVaqt,
    lang,
    setLang,
    nav,
    setNav,
    son,
    setSon,
    dark,
    setDark,
    soat,
    setSoat,
    collapsed,
    setCollapsed,
    menubar,
    setMenubar,
  }
}

export default useStart
