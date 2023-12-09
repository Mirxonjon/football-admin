import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SendOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import logo from '../../img/lincor.svg'
import useComponent from '../../hooks/useComponent'
import { host } from '../../utils/api'
import './login.scss'
import FT_API from '../../utils/api/api'

function Login () {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [parol, setParol] = useState(
    JSON.parse(localStorage.getItem('loginParol')) || false
  )
  const [sekunt, setSekunt] = useState(
    JSON.parse(localStorage.getItem('loginParol')) || '4:00'
  )
  const { setToken } = useComponent()
  const emailInput = useRef()
  const [finish, setFinish] = useState(false)
  const passwordInput = useRef()
  const [loadings, setLoadings] = useState([])
  const [api, contextHolder] = notification.useNotification()
  const inputParol = useRef()

  const enterLoading = index => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 6000)
  }

  const login = async () => {
    const email = emailInput.current.value
    const password = passwordInput.current.value

    if(email && password) {

      const data = await FT_API.post('Auth/signIn', {gmail:email ,password})
      if(data.status == 200) {

      setToken(data.data.token)
      localStorage.clear()
      localStorage.setItem('admin_token', JSON.stringify(data.data.token))
      navigate('/')

    } else {
      api.open({
        message: 'Error Title',
        description: 'Malumotlaringiz togri ekanligiga ishonch hosil qiling!!!',
        icon: (
          <SmileOutlined
            style={{
              color: '#FF0000'
            }}
          />
        )
      })
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 1000)
    }
    
    }
    else {
      api.open({
        message: 'Error Title',
        description: 'Malumotlaringiz togri ekanligiga ishonch hosil qiling!!!',
        icon: (
          <SmileOutlined
            style={{
              color: '#FF0000'
            }}
          />
        )
      })
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 1000)
    }

    // enterLoading(2)
    // if (email && password) {
    //   fetch(host + '/users/admin/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       password,
    //       email
    //     })
    //   })
    //     .then(re => re.json())
    //     .then(data => {
    //       if (data.status === 200) {
    //         setParol(true)
    //         localStorage.setItem('loginParol', JSON.stringify('4:00'))
    //         api.open({
    //           message: 'Error Title',
    //           description:
    //             'Siz kiritgan Email pochtangizga kod jonatdik shuni kiriting!!!',
    //           icon: (
    //             <SmileOutlined
    //               style={{
    //                 color: '#108ee9'
    //               }}
    //             />
    //           )
    //         })
    //       } else {
    //         api.open({
    //           message: 'Error Title',
    //           description:
    //             'Malumotlaringiz togri ekanligiga ishonch hosil qiling!!!',
    //           icon: (
    //             <SmileOutlined
    //               style={{
    //                 color: '#FF0000'
    //               }}
    //             />
    //           )
    //         })
    //       }
    //     })
    // } else {
    //   api.open({
    //     message: 'Error Title',
    //     description: 'Malumotlaringiz togri ekanligiga ishonch hosil qiling!!!',
    //     icon: (
    //       <SmileOutlined
    //         style={{
    //           color: '#FF0000'
    //         }}
    //       />
    //     )
    //   })
    //   setError(true)

    //   setTimeout(() => {
    //     setError(false)
    //   }, 1000)
    // }
  }

  if (parol) {
    setTimeout(() => {
      let one = sekunt.split(':')[0]
      let two = sekunt.split(':')[1]
      let result = one + ':' + two

      if (two === '00') {
        result = `${Number(one) - 1}:59`
      } else if (two < '10') {
        result = `${one}:0${Number(two.split('')[1]) - 1}`
      } else if (two === '10') {
        result = `${one}:0${Number(two) - 1}`
      } else {
        result = `${one}:${Number(two) - 1}`
      }

      if (one === '0' && two <= 10) {
        console.log(true)
        setFinish(true)
      }
      if (one === '0' && two === '00') {
        setParol(false)
        setSekunt('4:00')
        result = '4:00'
        localStorage.clear()
      }

      localStorage.setItem('loginParol', JSON.stringify(result))
      setSekunt(result)
    }, 1000)
  }

  const emailParol = () => {
    const input = inputParol.current.value
    if (!input.length || !Number(input)) {
      return api.open({
        message: 'Error Title',
        description: 'Parol 5 xonali son jonatilgan togri kiriting!!!',
        icon: (
          <SmileOutlined
            style={{
              color: '#FF0000'
            }}
          />
        )
      })
    }

    fetch(host + '/users/admin/login/email/' + input)
      .then(re => re.json())
      .then(data => {
        if (data.status === 200) {
          setToken(data.token)
          localStorage.clear()
          localStorage.setItem('admin_token', JSON.stringify(data.token))
          navigate('/')
        } else {
          api.open({
            message: 'Error Title',
            description: 'Parol hato!!!',
            icon: (
              <SmileOutlined
                style={{
                  color: '#FF0000'
                }}
              />
            )
          })
        }
      })
  }

  return (
    <div className='login'>
      <div className='left'>
        <img src={logo} alt='' />
      </div>
      <div className='right'>
        <h1 className='signIn'>Sign In</h1>
        <div className={parol ? 'disablet' : 'divInput'}>
          <input
            disabled={parol}
            className={error ? 'error' : ''}
            ref={emailInput}
            type='text'
            placeholder='@gmail.com'
          />
          <input
            disabled={parol}
            className={error ? 'error' : ''}
            ref={passwordInput}
            type='text'
            placeholder='Password'
          />
        </div>
        <div className={parol ? 'parol' : 'none'}>
          <span className={finish ? 'finish' : ''}>{'0' + sekunt}</span>
          <input ref={inputParol} type='number' placeholder='12345' />
        </div>
        {contextHolder}
        <Button
          className='sendButton'
          type='primary'
          loading={loadings[2]}
          icon={<SendOutlined />}
          onClick={parol ? emailParol : login}
        >
          Sing In
        </Button>
      </div>
    </div>
  )
}

export default Login
