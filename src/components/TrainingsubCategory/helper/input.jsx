import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'


function InputsCourse () {
  const title = useRef()
  const title_ru = useRef()
  const category = useRef()
  const navigate = useNavigate()
  // const { lang } = useStart()
  const { token, setCount, count ,setToken } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState([])


  useEffect( () => {
    FT_API.get('trainingCategories/all').then(e => {
       setData(e.data)
     })
   }, [setData, count, token])



  const sent = async () => {
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const categoryValue = category.current.value
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    
    if (titleValue    && categoryValue ) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const formDataobj = {
        "title" : titleValue ,
        "title_ru" : title_ruValue ,
        "category_id" : categoryValue ,
      }
       await FT_API.post('trainingSubCategories/create', formDataobj ,config ).then(data => {
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
      <h1>Mashg'ulotlar kichik  gruppasi</h1>
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
          <span>Mavjud katta gruppalari</span>
          <select  ref={category} defaultValue={'5-8'} name="age" id="">
            {data.length && data.map(e => (
               <option value={e.id}>{e.title} <em> uchun:</em>  "{e.traning_for_age}" yosh </option>
            ))}
          </select>
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>Yuborish</button>
    </div>
  )
}

export default InputsCourse
