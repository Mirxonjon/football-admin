import { DeleteOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Popconfirm, message, Result } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet } from '../../../utils/api'
import FT_API from '../../../utils/api/api'

function AllUserTable () {
  const { lang } = useStart()
  const navigate = useNavigate()
  const { setToken, token, setCount, count } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [users, setUsers] = useState([])
  const key = 'updatable'
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  useEffect(() => {
    FT_API.get('Users/all' ,config).then(e => {
      setUsers(e.data)
    }).catch(e=>{
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
      } 
    })
  }, [count, setUsers, token])

  const userDelete = userId => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    apiGet('/users/admin/delete/' + userId, token, 'DELETE').then(baza => {
      if (baza.status === 204) {
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Loaded!',
            duration: 2
          })
          setCount(count + 1)
        }, 1000)
      } else {
        messageApi.open({
          key,
          type: 'error',
          content: 'Loaded!',
          duration: 2
        })
      }
    })
  }

  const addAdmin = async userId => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    const formDataobj = {
      id: userId,
      role: "admin"
    }

    await FT_API.patch('Users/UpdateAdmin', formDataobj ,config ).then(data => {
      if(data.status == 204) {
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
  }
  const deleteAdmin = async userId => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    const formDataobj = {
      id: userId,
      role: "user"
    }

    await FT_API.patch('Users/UpdateAdmin', formDataobj ,config ).then(data => {
      if(data.status == 204) {
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
  }

  const cancel = e => {
    message.error('Click on No')
  }

  return (
    <div className='take_table'>
      {contextHolder}
      <table>
        <thead>
          <tr>
            <th className='th'>№</th>
            <th className='th'>Ismi</th>
            <th className='th'>Nomer</th>
            <th className='th'>Email</th>
            <th className='th'>Adminlar</th>
            <th className='th'>Adminlar ro'yhatiga qo'shish</th>
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e?.name}</td>
                <td>{e?.phone}</td>
                <td>{e?.email}</td>
                <td>{e?.role == 'admin' ? 'Admin' : `Fo'ydalanuvchi`}</td>
                <td>
                  {e?.role == 'admin' ? 
                      <Popconfirm
                      title="Adminlikdan  olmoqchimisiz?"
                      onConfirm={() => deleteAdmin(e.id)}
                      onCancel={cancel}
                      okText='Yes'
                      cancelText='No'
                    >
                      <UserDeleteOutlined 
                        style={{
                          color: 'red',
                          cursor: 'pointer',
                          fontSize: '22px'
                        }}
                      />
                    </Popconfirm>  :      <Popconfirm
                      title="Admin qilmoqchimisiz?"
                      onConfirm={() => addAdmin(e.id)}
                      onCancel={cancel}
                      okText='Yes'
                      cancelText='No'
                    >
                      <UserAddOutlined
                        style={{
                          color: 'green',
                          cursor: 'pointer',
                          fontSize: '22px'
                        }}
                      />
                    </Popconfirm>
                  }
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td>
                <Result
                  status='404'
                  title='404'
                  subTitle='Sorry, the page you visited does not exist.'
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AllUserTable
