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
  const duration = useRef()
  const sub_Category = useRef()
  const description_tactic  = useRef()
  const description_tactic_ru  = useRef()
  const rasmi = useRef()
  const video = useRef()
  const navigate = useNavigate()

  // const seq = useRef()
  // const sar = useRef()
  // const des = useRef()
  // const pri = useRef()
  // const bgc = useRef()
  // const rasmi = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, videoModal, setVideoModal, setCourseId ,setToken } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('trainingSubCategories/all' ,config)
      .then(data => {
        setCourse(data.data)
      })
  }, [setCourse, token, count, setCourseId])




  const handleOk = async () => {
    setVideoModal(false)
    const titleValue = title.current.value
    const title_ruValue = title_ru.current.value
    const durationValue = duration.current.value
    const sub_CategoryValue = sub_Category.current.value
    const description_tacticValue = description_tactic.current.value
    const description_tactic_ruValue = description_tactic_ru.current.value
    const sequence = seq.current.value
    const filePhoto = rasmi.current?.files[0]
    const fileVideo = video.current?.files[0]

    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    })
    const formData = new FormData()
    formData.append('video', fileVideo)
    formData.append('image', filePhoto)
    formData.append('title', titleValue)
    formData.append('title_ru', title_ruValue)
    formData.append('duration', durationValue)
    formData.append('sequence', sequence)
    formData.append('description_tactic', description_tacticValue)
    formData.append('description_tactic_ru', description_tactic_ruValue)
    formData.append('sub_category_id', sub_CategoryValue)

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await FT_API.patch(`TrainingVideos/update/${videoModal?.id}`, formData ,config ).then(data => {
      if(data.status == 204) {
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

  title.current.value = ''
  title_ru.current.value = ''
  duration.current.value = ''
   sub_Category.current.value = 'null'
   description_tactic.current.value = ''
     description_tactic_ru.current.value = ''
   seq.current.value = ''
   
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
            <span>Davomiyligi</span>
            <input ref={duration} type='text' placeholder='30:00' />
          </li>
          <li>
            <span>Mashg'ulotlar kichik gruppasi</span>
            <select ref={sub_Category}>
          <option defaultValue='null' defaultChecked value='null' > Tanlang </option>

              {course.length
                ? course.map((e, i) => (
                    <option key={i} value={e?.id}>
                      {e?.title} ; Katta Gruppa: {e?.category_id.title}
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
            <label htmlFor='videoFiletrain'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='videoFiletrain' ref={video} className='none' type='file' />
          </li>

          <li className='rasm'>
            <span>Rasm</span>
            <label htmlFor='phototrain'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='phototrain' ref={rasmi} className='none' type='file' />
          </li>
        </ul>
        <button onClick={handleOk}>{Tillar[0][lang].sent}</button>
        {contextHolder}
      </div>
    </>
  )
}

export default ModalVideo
