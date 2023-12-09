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
  const description_MasterClass = useRef()
  const description_MasterClass_ru = useRef()
  const image = useRef()


  const sent = async () => {
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const description_MasterClassValue = description_MasterClass.current.value
    const description_MasterClass_ruValue = description_MasterClass_ru.current.value
    const fileImageValue = image.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    
    if (titleValue  && description_MasterClassValue && description_MasterClass_ruValue  && fileImageValue) {
      const formData = new FormData()
    formData.append('image', fileImageValue)
      formData.append('title', titleValue)
      formData.append('title_ru', title_ruValue)
      formData.append('title_descrioption', description_MasterClassValue)
      formData.append('title_descrioption_ru', description_MasterClass_ruValue)
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      await FT_API.post('MasterclassCategory/create', formData ,config ).then(data => {
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
      <h1>Yangi Master-klass guruhi qo'shish</h1>
      <ul>
        <li>
          <span>Sarlavha</span>
          <input ref={title} type='text' placeholder='Sarlavha' />
        </li>
        <li>
          <span>Sarlavha rus tilida</span>
          <input ref={title_ru} type='title_ru' placeholder='Sarlavha' />
        </li>
        <li>
          <span>Master-klass haqida qisqacha ma’lumot </span>
          <input ref={description_MasterClass} type='text' placeholder='Kurs haqida qisqacha ' />
        </li>
        <li>
          <span>Master-klass haqida qisqacha ma’lumot  rus tilida</span>
          <input ref={description_MasterClass_ru} type='text' placeholder='Kurs haqida qisqacha rus tilida ' />
        </li>
        <li className='rasm'>
          <span>Rasm</span>
          <label htmlFor='Master_class_categfory_photo'>
            <i>Yuklash</i>
            <img src={yukla} alt='yukla' />
          </label>
          <input id='Master_class_categfory_photo' ref={image} className='none' type='file' />
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>Yuborish</button>
    </div>
  )
}

export default InputsCourse
