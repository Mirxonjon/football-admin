import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

function InputVideo () {
  const navigate = useNavigate()
  const title = useRef()
  const title_ru = useRef()
  const category = useRef()
  const description_video  = useRef()
  const description_video_ru  = useRef()
  const Link = useRef()
  const { lang } = useStart()
  const { token, setCount, count, setCourseId ,setToken} = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('competitionCategories/all' ,config)
      .then(data => {
        setCourse(data.data)
        setCourseId(data[0]?.course_id)
      })
  }, [setCourse, token, count, setCourseId])

  const sent = async() => {
 
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const CategoryValue = category.current.value
    const description_videoValue = description_video.current.value
    const description_video_ruValue = description_video_ru.current.value
    const videoLink = Link.current.value
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    
    if (titleValue && title_ruValue && CategoryValue && videoLink  && description_videoValue && description_video_ruValue) {
      const formDataobj ={
        title :titleValue,
        title_ru : title_ruValue ,
         video_link : videoLink,
         description_video: description_videoValue ,
         description_video_ru : description_video_ruValue ,
         tactic_id : CategoryValue
      }
      

      await FT_API.post('competitionVideos/create', formDataobj ,config ).then(data => {
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
        <h1>Musobaqaga Video qo'shish</h1>
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
            <span>Musobaqalar guruhlari</span>
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
            <span>You tube Video Link</span>
            <input ref={Link} type='text' placeholder='Link' />
          </li>
          <li>
            <span>Video haqida qisqacha ma’lumot</span>
            <input ref={description_video} type='text' placeholder='qisqacha' />
          </li>
          <li>
            <span>Video haqida qisqacha ma’lumota rus tilida</span>
            <input ref={description_video_ru} type='text' placeholder='rus tilida' />
          </li>

        </ul>
        {contextHolder}
        <button onClick={sent}>{Tillar[0][lang].sent}</button>
      </div>
    </>
  )
}

export default InputVideo
