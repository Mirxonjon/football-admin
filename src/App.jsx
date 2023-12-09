import './App.scss'
import LayoutMe from './layout/layout'
import 'antd/dist/antd.css'
import useComponent from './hooks/useComponent'
import Login from './components/auth/login'

function App() {
  const { token } = useComponent()
  return <>{token !== '' ? <LayoutMe /> : <Login />}</>
}

export default App
