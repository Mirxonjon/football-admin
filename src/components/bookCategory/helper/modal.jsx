import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

const ModalApp = () => {
  const title = useRef()
  const title_ru = useRef()
  const navigate = useNavigate()
  const { lang } = useStart()
  const { token, setCount, count, openModal, setOpenModal ,setToken } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState([])




  const handleOk = async() => {
    setOpenModal(false)
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    
    const formDataobj = {
      "title" : titleValue ,
      "title_ru" : title_ruValue ,
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    await FT_API.patch(`BooksCategories/update/${openModal?.id}`, formDataobj ,config ).then(data => {
      if(data.status == 204) {
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
  
  
    title.current.value = ''
    title_ru.current.value = ''
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  return (
    <>
      <b onClick={handleCancel} className={!openModal ? 'none' : 'b'}></b>
      <div className={!openModal ? 'none' : 'modal_course'}>
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
        <button onClick={handleOk}>{Tillar[0][lang].sent}</button>
        {contextHolder}
      </div>
    </>
  )
}

export default ModalApp
