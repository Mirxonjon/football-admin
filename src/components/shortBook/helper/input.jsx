import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import { apiGet, host } from '../../../utils/api'
import useComponent from '../../../hooks/useComponent'
import yukla from '../../../img/bx_download.svg'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

function InputVideo () {
  const navigate = useNavigate()
  const title = useRef()
  const title_ru = useRef()
  const category = useRef()
  const description_book   = useRef()
  const description_book_ru   = useRef()
  const rasmi = useRef()
  const book = useRef()
  const book_lang  = useRef()
  const { lang } = useStart()
  const { token, setCount, count, setCourseId ,setToken} = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('ShortBooksCategories/all' ,config)
      .then(data => {
        setCourse(data.data)
        // setCourseId(data[0]?.course_id)
      })
  }, [setCourse, token, count, setCourseId])

  const sent = async() => {
 
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
      content: 'Loading...'
    })

    
    if (titleValue && title_ruValue  && CategoryValue && book_langValue && filePhoto && fileBook && description_bookValue && description_book_ruValue) {
      const formData = new FormData()
      formData.append('short_book', fileBook)
      formData.append('image', filePhoto)
      formData.append('title', titleValue)
      formData.append('title_ru', title_ruValue)
      formData.append('short_book_lang', book_langValue)
      formData.append('description_book', description_bookValue)
      formData.append('description_book_ru', description_book_ruValue)
      formData.append('category_id', CategoryValue)

      

      await FT_API.post('ShortBooks/create', formData ,config ).then(data => {
        if(data.status == 201) {
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 5
            })
            
            setCount(count + 1)
          }, 1000)
        }  else {
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'error',
              content: 'Loaded!',
              duration: 5
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
              duration: 5
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
              duration: 5
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
    <>
      <div className='inputs_course'>
        <h1>Ko'nspekt qo’shish</h1>
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
            <label htmlFor='shortbookFile'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='shortbookFile' ref={book} className='none' type='file' />
          </li>

          <li className='rasm'>
            <span>Rasm</span>
            <label htmlFor='shortbookPhotoFile'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='shortbookPhotoFile' ref={rasmi} className='none' type='file' />
          </li>
        </ul>
        {contextHolder}
        <button onClick={sent}>{Tillar[0][lang].sent}</button>
      </div>
      {/* <select
        className='videoSelect'
        onClick={e => setCourseId(e?.target?.value)}
      >
        {course.length
          ? course.map((e, i) => (
              <option key={i} value={e?.course_id}>
                {e?.course_title}
              </option>
            ))
          : null}
      </select> */}
    </>
  )
}

export default InputVideo
