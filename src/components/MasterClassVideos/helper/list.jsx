import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, message, Result } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet, img_link } from '../../../utils/api'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

function ListVideo () {
  const { lang } = useStart()
  const navigate = useNavigate()
  const { token, setCount, count, coursId, setVideoModal ,setToken } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [video, setVideo] = useState([])
  const key = 'updatable'
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('MasterclassVideo/all' ,config).then(e => {
      setVideo(e.data)
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
  }, [coursId, count, setVideo, token])

  const videoDelete = async id => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    await  FT_API.delete(`MasterclassVideo/delete/${id}` ,config ).then(data => {
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
  }

  const cancel = e => {
    message.error('Click on No')
  }

  return (
    <div className='list_course'>
      {contextHolder}
    <h1>{Tillar[0][lang].mCourse}</h1>
    <ul className='top'>
      {video.length
        ? video?.map((e, i) => (
            <li style={{ backgroundColor: e?.course_bgc }} key={i}>
              <h2>{e?.title}</h2>
              <img src={img_link + e?.tactic_img} alt='course' />
              <video  width={'100%'}  src={img_link + e?.video_link}  controls >
              {/* <source src={img_link + e?.video_link}  type="video/mp4"/> */}
              </video>
              <p>
                <span>Sarlavha rus tilida</span> <p>{e?.title_ru}</p>
              </p>
              <p>
                <span>Sarlavha haqida to'ligroq ma’lumot</span> <p>{e?.description_title}</p>
              </p>
              <p>
                <span>Sarlavha haqida ligroq ma’lumot rus tilida</span> <p>{e?.description_title_ru}</p>
              </p>
              <p>
                <span>Video haqida qisqacha ma’lumot:</span> <p>{e?.description_tactic}</p>
              </p>
              <p>
                <span>Video haqida qisqacha ma’lumot rus tilida:</span> <p>{e?.description_tactic_ru}</p>
              </p>
              <p>
                <span>MasterClass Guruhi :</span> <p>{e?.category_id?.title}</p>
              </p>
              <b>
                <EditOutlined
                  onClick={() => setVideoModal(e)}
                  style={{ cursor: 'pointer', fontSize: '32px' }}
                />
                <Popconfirm
                  title="O'chirmoqchimisz?"
                  onConfirm={() => videoDelete(e.id)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <DeleteOutlined
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '32px'
                    }}
                  />
                </Popconfirm>
              </b>
            </li>
          ))
        : null}
    </ul>
    {/* {contextHolder} */}
    {/* <ModalApp /> */}
  </div>

 
  )
}

export default ListVideo
