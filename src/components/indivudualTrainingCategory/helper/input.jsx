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
  const description_training = useRef()
  const description_training_ru = useRef()
  const image = useRef()
  const category = useRef()

  const sent = async () => {
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const description_trainingValue = description_training.current.value
    const description_training_ruValue = description_training_ru.current.value
    const categoryValue = category.current.value
    const fileImageValue = image.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    
    if (titleValue  && description_trainingValue && description_training_ruValue && categoryValue && fileImageValue) {
      const formData = new FormData()
    formData.append('image', fileImageValue)
      formData.append('title', titleValue)
      formData.append('title_ru', title_ruValue)
      formData.append('description_training', description_trainingValue)
      formData.append('description_training_ru', description_training_ruValue)
      formData.append('traning_for_indivudual', categoryValue)
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      await FT_API.post('IndividualtrainingCategories/create', formData ,config ).then(data => {
        if(data.status == 201) {
          setCount(count + 1)
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 2
            })
            
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
      <h1>Mashg'ulotlar katta gruppasi</h1>
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
          <span>Yo'nalishi</span>
          <select  ref={category} defaultValue={'5-8'} name="age" id="">
          <option  value="texnika">Texnika</option>
          <option value="taktika">Taktika</option>
            <option value="fizika">Fizika</option>
          <option value="psihologiya">Psihologiya</option>
          </select>
        </li>
        <li>
          <span>Kurs haqida qisqacha ma’lumot </span>
          <input ref={description_training} type='text' placeholder='Kurs haqida qisqacha ' />
        </li>
        <li>
          <span>Kurs haqida qisqacha ma’lumot  rus tilida</span>
          <input ref={description_training_ru} type='text' placeholder='Kurs haqida qisqacha rus tilida ' />
        </li>
        <li className='rasm'>
          <span>Rasm</span>
          <label htmlFor='IndividualTraininggrouprasm'>
            <i>Yuklash</i>
            <img src={yukla} alt='yukla' />
          </label>
          <input id='IndividualTraininggrouprasm' ref={image} className='none' type='file' />
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>Yuborish</button>
    </div>
  )
}

export default InputsCourse
