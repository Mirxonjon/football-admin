import { useRef } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import yukla from '../../../img/bx_download.svg'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

const ModalApp = () => {
  const title = useRef()
  const title_ru = useRef()
  const image = useRef()
  const { lang } = useStart()
  const navigate = useNavigate()
  const { token, setCount, count, openModal, setOpenModal , setToken} = useComponent()
  const [messageApi, contextHolder] = message.useMessage()


  const handleOk = async() => {
    setOpenModal(false)
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const fileImageValue = image.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    const formData = new FormData()
    formData.append('image', fileImageValue)
    formData.append('title', titleValue)
    formData.append('title_ru', title_ruValue)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    await FT_API.patch(`competitionCategories/update/${openModal?.id}`, formData ,config ).then( data => {
      if(data.status == 204) {
          setTimeout(async () => {
          await messageApi.open({
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
        <li className='rasm'>
          <span>Rasm</span>
          <label htmlFor='photo'>
            <i>Yuklash</i>
            <img src={yukla} alt='yukla' />
          </label>
          <input id='photo' ref={image} className='none' type='file' />
        </li>
      </ul>
        <button onClick={handleOk}>{Tillar[0][lang].sent}</button>
        {contextHolder}
      </div>
    </>
  )
}

export default ModalApp
