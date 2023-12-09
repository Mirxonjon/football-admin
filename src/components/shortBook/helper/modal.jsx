import { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import yukla from '../../../img/bx_download.svg'
import { apiGet, host } from '../../../utils/api'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

const ModalVideo = () => {
  const title = useRef()
  const title_ru = useRef()
  const category = useRef()
  const description_book   = useRef()
  const description_book_ru   = useRef()
  const rasmi = useRef()
  const book = useRef()
  const book_lang  = useRef()
  const navigate = useNavigate()


  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, videoModal, setVideoModal, setCourseId ,setToken } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('ShortBooksCategories/all' ,config)
      .then(data => {
        setCourse(data.data)
      })
  }, [setCourse, token, count, setCourseId])




  const handleOk = async () => {
    setVideoModal(false)
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const CategoryValue = category.current.value
    const description_bookValue = description_book.current.value
    const description_book_ruValue = description_book_ru.current.value
    const book_langValue = book_lang.current.value
    const filePhoto = rasmi.current?.files[0]
    const fileBook = book.current?.files[0]

    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    })
    const formData = new FormData()
    formData.append('short_book', fileBook)
    formData.append('image', filePhoto)
    formData.append('title', titleValue)
    formData.append('title_ru', title_ruValue)
    formData.append('short_book_lang', book_langValue)
    formData.append('description_book', description_bookValue)
    formData.append('description_book_ru', description_book_ruValue)
    formData.append('category_id', CategoryValue)

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await FT_API.patch(`ShortBooks/update/${videoModal?.id}`, formData ,config ).then(data => {
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
  category.current.value = 'null'
  description_book.current.value = ''
  description_book_ru.current.value = ''
  book_lang.current.value = 'null'
  rasmi.current.value = 'null'
  book.current.value = 'null'

   
  }

  const handleCancel = () => {
    setVideoModal(false)
  }

  return (
    <>
      <b onClick={handleCancel} className={!videoModal ? 'none' : 'b'}></b>
      <div style={{height:'auto', top:"85px"}}  className={!videoModal ? 'none' : 'modal_course'}>
      <ul>
      <li>
            <span>Sarlavha</span>
            <input ref={title} type='text' placeholder='3-dars' />
          </li>
          <li>
            <span>Sarlavha rus tilida</span>
            <input ref={title_ru} type='text' placeholder='rus tilida' />
          </li>
          <li>
            <span> Ko'nspektlar guruhi</span>
            <select ref={category}>
          <option defaultValue='null' defaultChecked value='null' > Tanlang </option>

              {course.length
                ? course.map((e, i) => (
                    <option key={i} value={e?.id}>
                      {e?.title}
                    </option>
                  ))
                : null}
            </select>
          </li>
          <li>
            <span>Ko'nspekt yozilgan til</span>
            <select ref={book_lang}>
          <option defaultValue='null' defaultChecked value='null'> Tanlang </option>
                    <option value="ru">ru</option>
                    <option  value="uz">uz</option>
            </select>
          </li>
          <li>
            <span>Ko'nspekt haqida qisqacha ma’lumot</span>
            <input ref={description_book} type='text' placeholder='Kitob haqida' />
          </li>
          <li>
            <span>Ko'nspekt haqida qisqacha ma’lumota rus tilida</span>
            <input ref={description_book_ru} type='text' placeholder='rus tilida' />
          </li>
          <li className='rasm'>
            <span>Ko'nspekt</span>
            <label htmlFor='shortbookFileEdit'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='shortbookFileEdit' ref={book} className='none' type='file' />
          </li>

          <li className='rasm'>
            <span>Rasm</span>
            <label htmlFor='shortbookPhotoFileEdit'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='shortbookPhotoFileEdit' ref={rasmi} className='none' type='file' />
          </li>
        </ul>
        <button onClick={handleOk}>{Tillar[0][lang].sent}</button>
        {contextHolder}
      </div>
    </>
  )
}

export default ModalVideo
