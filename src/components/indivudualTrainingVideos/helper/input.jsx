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
  const duration = useRef()
  const category_id = useRef()
  const description_tactic  = useRef()
  const description_tactic_ru  = useRef()
  const rasmi = useRef()
  const video = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, setCourseId ,setToken} = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('IndividualtrainingCategories/all' ,config)
      .then(data => {
        setCourse(data.data)
        // setCourseId(data[0]?.course_id)
      })
  }, [setCourse, token, count, setCourseId])

  const sent = async() => {
 
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const durationValue = duration.current.value
    const category_idValue = category_id.current.value
    const description_tacticValue = description_tactic.current.value
    const description_tactic_ruValue = description_tactic_ru.current.value
    const sequence = seq.current.value
    const filePhoto = rasmi.current?.files[0]
    const fileVideo = video.current?.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })

    
    if (titleValue && title_ruValue && durationValue && category_idValue && sequence && filePhoto && fileVideo && description_tacticValue && description_tactic_ruValue) {
      const formData = new FormData()
      formData.append('video', fileVideo)
      formData.append('image', filePhoto)
      formData.append('title', titleValue)
      formData.append('title_ru', title_ruValue)
      formData.append('duration', durationValue)
      formData.append('sequence', sequence)
      formData.append('description_tactic', description_tacticValue)
      formData.append('description_tactic_ru', description_tactic_ruValue)
      formData.append('category_id', category_idValue)

      

      await FT_API.post('IndividualTrainingVideos/create', formData ,config ).then(data => {
        if(data.status == 201) {
          setCount(count + 1)
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: 'Loaded!',
              duration: 5
            })
            
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
        <h1>{Tillar[0][lang].addVideo}</h1>
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
            <span>Davomiyligi</span>
            <input ref={duration} type='text' placeholder='30:00' />
          </li>
          <li>
            <span>Individual Mashg'ulotlar gruppasi</span>
            <select ref={category_id}>
              {course.length
                ? course.map((e, i) => (
                    <option key={i} value={e?.id}>
                      Guruhi : {e?.title}
                    </option>
                  ))
                : null}
            </select>
          </li>
          <li>
            <span>Ketma-ketlik</span>
            <input ref={seq} type='number' placeholder='1' />
          </li>
          <li>
            <span>Video haqida qisqacha ma’lumot</span>
            <input ref={description_tactic} type='text' placeholder='qisqacha' />
          </li>
          <li>
            <span>Video haqida qisqacha ma’lumota rus tilida</span>
            <input ref={description_tactic_ru} type='text' placeholder='rus tilida' />
          </li>
          <li className='rasm'>
            <span>Video</span>
            <label htmlFor='videoFileIvudualTrain'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='videoFileIvudualTrain' ref={video} className='none' type='file' />
          </li>

          <li className='rasm'>
            <span>Rasm</span>
            <label htmlFor='rasmindivudualTrain'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='rasmindivudualTrain' ref={rasmi} className='none' type='file' />
          </li>
        </ul>
        {contextHolder}
        <button onClick={sent}>{Tillar[0][lang].sent}</button>
      </div>
      <select
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
      </select>
    </>
  )
}

export default InputVideo
