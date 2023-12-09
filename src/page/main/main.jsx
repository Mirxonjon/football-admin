import useStart from '../../hooks/useStart'
import Routerr from '../../routes/router'
import './main.scss'

function MainMe() {
  const { dark } = useStart()

  return (
    <div className={dark ? 'main_dark' : 'main'}>
      <Routerr />
    </div>
  )
}

export default MainMe
