import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet, img_link } from '../../../utils/api'
import ModalApp from './modal'
import FT_API from '../../../utils/api/api'
import { useNavigate } from 'react-router-dom'

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3MGQzYzhkLTdmODMtNDBhMi04ZGYyLWEwZDRiOTYyZDhkNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTA1MDg4MiwiZXhwIjoxNzAxMDU0NDgyfQ.LonI1GRne_5HfLeI02DWU49NBjRvmlcAhPeksQ4XyuI"

function ListCourse () {
  const { lang } = useStart()
  const navigate = useNavigate()

  const { token, count, setCount, setOpenModal ,setToken } = useComponent()
  const [data, setData] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect( () => {
   FT_API.get('BooksCategories/all').then(e => {
      setData(e.data)
    })
  }, [setData, count, token])
  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'

  const CourseDelete = async id => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    await  FT_API.delete(`BooksCategories/delete/${id}` ,config ).then(data => {
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
      <h1>Mavjud Guruhlar</h1>
      <ul className='top'>
        {data.length
          ? data.map((e, i) => (
              <li style={{ backgroundColor: e?.course_bgc }} key={i}>
                <h2>{e?.title}</h2>
                <p>
                  <span>Sarlavha rus tilida</span> <p>{e?.title_ru}</p>
                </p>
                <b>
                  <EditOutlined
                    onClick={() => setOpenModal(e)}
                    style={{ cursor: 'pointer', fontSize: '32px' }}
                  />
                  <Popconfirm
                    title="O'chirmoqchimisz?"
                    onConfirm={() => CourseDelete(e.id)}
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
      {contextHolder}

    </div>
  )
}

export default ListCourse
