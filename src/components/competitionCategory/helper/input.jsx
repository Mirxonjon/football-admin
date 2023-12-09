import { useRef } from 'react'
import { message } from 'antd'
import { host } from '../../../utils/api'
import useComponent from '../../../hooks/useComponent'
import yukla from '../../../img/bx_download.svg'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import axios from 'axios'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'


function InputsCourse () {
  const navigate = useNavigate()
  // const { lang } = useStart()
  const { token, setCount, count ,setToken  } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const title = useRef()
  const title_ru = useRef()
  const image = useRef()

  const sent = async () => {
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value

    // const ageValue = age.current.value
    const fileImageValue = image.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    
    if (titleValue  && fileImageValue) {
      const formData = new FormData()
      formData.append('image', fileImageValue)
      formData.append('title', titleValue)
      formData.append('title_ru', title_ruValue)
    
      // formData.append('traning_for_age', ageValue)
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      await FT_API.post('competitionCategories/create', formData ,config ).then(data => {
        if(data.status == 201) {
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 2
            })
            setCount(count + 1)
          }, 1000)
        }  else {
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'error',
              content: 'Loaded!',
              duration: 2
            })
          }, 1000)
        }
       })
      .catch(e=>{
        if(e.response.data.status == 401) {
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'error',
              content: 'Loaded!',
              duration: 2
            })
            setToken('')
            localStorage.setItem('admin_token', JSON.stringify(''))
            navigate('/')
          }, 1000)
        } else {
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'error',
              content: `Eror! ${e.response.data.message}` ,
              duration: 2
            })
          }, 1000)
        }
      })

    } else {
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'error',
          content: 'Loaded!',
          duration: 2
        })
      }, 1000)
    }
  }

  return (
    <div className='inputs_course'>
      <h1>Musobaqalar guruhlari</h1>

      
      <ul>
        <li>
          <span>Sarlavha</span>
          <input ref={title} type='text' placeholder='Sarlavha' />
        </li>
        <li>
          <span>Sarlavha rus tilida</span>
          <input ref={title_ru} type='title_ru' placeholder='Sarlavha' />
        </li>
        <li className='rasm'>
          <span>Rasm</span>
          <label htmlFor='rasm'>
            <i>Yuklash</i>
            <img src={yukla} alt='yukla' />
          </label>
          <input id='rasm' ref={image} className='none' type='file' />
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>Yuborish</button>
    </div>
  )
}

export default InputsCourse
