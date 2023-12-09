import { createContext, useEffect, useState } from 'react'

export const State = createContext()

export const StatePriveder = ({ children }) => {
  let xisob = JSON.parse(localStorage.getItem('xisobos'))
  let header_Nav = JSON.parse(localStorage.getItem('head'))
  let til = JSON.parse(localStorage.getItem('til'))
  let keyslar = JSON.parse(localStorage.getItem('son'))
  let darks = JSON.parse(localStorage.getItem('dark'))
  let nol = (data) => {
    if (data.toString().split('').length === 1) {
      return `0${data}`
    }
    return data
  }

  const [soat, setSoat] = useState(
    `${nol(new Date().getHours())}:${nol(new Date().getMinutes())}:${nol(
      new Date().getSeconds(),
    )}`,
  )

  useEffect(() => {
    setInterval(() => {
      setSoat(
        `${nol(new Date().getHours())}:${nol(new Date().getMinutes())}:${nol(
          new Date().getSeconds(),
        )}`,
      )
    }, 1000)
  }, [soat])

  const [head, setHead] = useState(header_Nav || 'Xisobod')
  const [lang, setLang] = useState(til || 'uz')
  const [vaqt, setVaqt] = useState(
    `${nol(new Date().getDate())}.${nol(new Date().getMonth() + 1)}.${nol(
      new Date().getFullYear(),
    )}`,
  )
  const [nav, setNav] = useState(xisob || 'Xisobod')
  const [son, setSon] = useState(keyslar || '1')
  const [dark, setDark] = useState(darks || false)
  const [menubar, setMenubar] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setVaqt(
        `${nol(new Date().getDate())}.${nol(new Date().getMonth() + 1)}.${nol(
          new Date().getFullYear(),
        )}`,
      )
    }, 1000)
  }, [vaqt])

  const data = {
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
    menubar,
    setMenubar,
  }

  return <State.Provider value={data}>{children}</State.Provider>
}
