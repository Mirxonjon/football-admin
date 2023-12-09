import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, message, Result, Button } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet, img_link } from '../../../utils/api'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

function ListBook () {
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
    FT_API.get('ShortBooks/all' ,config).then(e => {
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

  const bookDelete = async id => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    await  FT_API.delete(`ShortBooks/delete/${id}` ,config ).then(data => {
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
  }

  const cancel = e => {
    message.error('Click on No')
  }

  return (
    <div className='list_course'>
      {contextHolder}
    <h1>Mavjud  Ko'nspekt</h1>
    <ul className='top'>
      {video.length
        ? video?.map((e, i) => (
            <li style={{ backgroundColor: e?.course_bgc }} key={i}>
              <h2>{e?.title}</h2>
              <img src={img_link + e?.short_book_img} alt='course' />
              <a href={img_link + e?.short_book_link} target="_blank" rel="noopener noreferrer"> 
              <Button type="primary"  download={img_link + e?.book_link} ghost style={{ width: '100%' ,margin:'20px 0px' }}>Ko'nspektni ko'rish</Button>
              </a>
              <p>
                <span>Sarlavha rus tilida</span> <p>{e?.title_ru}</p>
              </p>
              <p>
                <span>Kitob yozilgan til: </span> <p>{e?.book_lang}</p>
              </p>
              <p>
                <span>Kitob haqida qisqacha ma’lumot:</span> <p>{e?.description_book}</p>
              </p>
              <p>
                <span>Kitob haqida qisqacha ma’lumot rus tilida:</span> <p>{e?.description_book_ru}</p>
              </p>
              <p>
                <span>Kitob Guruhi :</span> <p>{e?.category_id?.title}</p>
              </p>
              <b>
                <EditOutlined
                  onClick={() => setVideoModal(e)}
                  style={{ cursor: 'pointer', fontSize: '32px' }}
                />
                <Popconfirm
                  title="O'chirmoqchimisz?"
                  onConfirm={() => bookDelete(e.id)}
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

    // <>
    //   {contextHolder}
    //   <table>
    //     <thead>
    //       <tr>
    //         <th className='th'>№</th>
    //         <th className='th'>Sarlavha</th>
    //         <th className='th'>Ketma-ketlik</th>
    //         <th className='th'>Davomiyligi</th>
    //         <th className='th'>Ma’lumot</th>
    //         <th className='th'>Edit</th>
    //         <th className='th'>Delete</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {video.length ? (
    //         video.map((e, i) => (
    //           <tr key={i}>
    //             <td>{i + 1}</td>
    //             <td>{e.title}</td>
    //             <td>{e.sequence} chi</td>
    //             <td>{e.duration}</td>
    //             <td>{e.description_tactic}</td>
    //             <td>
    //               <EditOutlined
    //                 onClick={() => setVideoModal(e)}
    //                 style={{ cursor: 'pointer', fontSize: '25px' }}
    //               />
    //             </td>
    //             <td>
    //               <Popconfirm
    //                 title="O'chirmoqchimisz?"
    //                 onConfirm={() => bookDelete(e.video_id)}
    //                 onCancel={cancel}
    //                 okText='Yes'
    //                 cancelText='No'
    //               >
    //                 <DeleteOutlined
    //                   style={{
    //                     color: 'red',
    //                     cursor: 'pointer',
    //                     fontSize: '22px'
    //                   }}
    //                 />
    //               </Popconfirm>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td></td>
    //           <td></td>
    //           <td></td>
    //           <td>
    //             <Result
    //               status='404'
    //               title='404'
    //               subTitle='Sorry, the page you visited does not exist.'
    //             />
    //           </td>
    //           <td></td>
    //           <td></td>
    //           <td></td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </>
  )
}

export default ListBook
