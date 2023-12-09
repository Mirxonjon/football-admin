import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'


function InputsCourse () {
  const navigate = useNavigate()
  const title = useRef()
  const title_ru = useRef()
  const { token, setCount, count ,setToken } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()

  const sent = async () => {
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    
    if (titleValue  && title_ruValue) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const formDataobj = {
        "title" : titleValue ,
        "title_ru" : title_ruValue ,
      }
       await FT_API.post('BooksCategories/create', formDataobj ,config ).then(data => {
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
      <h1>Kitoblar  guruhi</h1>
      <ul>
        <li>
          <span>Sarlavha</span>
          <input ref={title} type='text' placeholder='Sarlavha' />
        </li>
        <li>
          <span>Sarlavha rus tilida</span>
          <input ref={title_ru} type='title_ru' placeholder='Sarlavha' />
        </li>
      </ul>
      {contextHolder}
      <button onClick={sent}>Yuborish</button>
    </div>
  )
}

export default InputsCourse
