import useStart from '../../hooks/useStart'
import './header.scss'
import sun from '../../img/icon-sun.svg'
import hum from '../../img/bx_menu-alt-left.svg'

function HeaderMe() {
  const {
    head,
    vaqt,
    setLang,
    lang,
    dark,
    setDark,
    soat,
    setMenubar,
    menubar,
  } = useStart()

  const change = (evt) => {
    setLang(evt.target.value)
  }

  let quyosh = () => {
    if (dark) {
      setDark(false)
    } else {
      setDark(true)
    }
  }

  return (
    <header
      className={dark ? 'header_father-dark header_father' : 'header_father'}
    >
      <img
        onClick={() => setMenubar(!menubar)}
        className="hum"
        src={hum}
        alt="hum"
      />
      <h1 className="header_h11">{head}</h1>
      <span className="header_data">{vaqt}</span>
      <span className="header_data soat">{soat}</span>
      <div className="rigth">
        <select defaultValue={lang} onChange={change} className="header-til">
          <option value="uz">Uz</option>
          <option value="ru">Ru</option>
          <option value="en">En</option>
        </select>
        <div onClick={quyosh} className="sun">
          <img onClick={quyosh} className="sun-img" src={sun} alt="sun" />
        </div>
      </div>
    </header>
  )
}

export default HeaderMe
