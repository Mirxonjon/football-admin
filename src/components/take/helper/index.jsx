import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import Tillar from '../../../languages/language'
import useStart from '../../../hooks/useStart'
import { apiGet, host } from '../../../utils/api'
import useComponent from '../../../hooks/useComponent'

function TakeInput () {
  const [user, setUser] = useState([])
  const [course, setCourse] = useState([])
  const { token, setCount, count, setTakeId } = useComponent()
  const { lang } = useStart()
  const findUser = useRef()
  const findCourse = useRef()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    apiGet('/users/statistika', token)
      .then(re => re.json())
      .then(data => setUser(data?.allUsers))
  }, [count, token, setUser])

  useEffect(() => {
    apiGet('/courses', token)
      .then(re => re.json())
      .then(data => {
        setCourse(data)
        setTakeId(data[0].course_id)
      })
  }, [count, token, setCount, setTakeId])

  const send = () => {
    const userId = findUser.current?.value
    const courseId = findCourse.current?.value
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    if (courseId && userId) {
      fetch(host + '/courses_open_users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          autharization: token
        },
        body: JSON.stringify({
          courseId,
          userId
        })
      })
        .then(re => re.json())
        .then(data => {
          if (data.status === 201) {
            setCount(count + 1)
            setTimeout(() => {
              messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2
              })
            }, 1000)
          } else {
            setTimeout(() => {
              messageApi.open({
                key,
                type: 'error',
                content: 'User Already buy Course',
                duration: 2
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

  const take = id => {
    setTakeId(id)
  }

  return (
    <div className='take_input'>
      {contextHolder}
      {/* <div> */}
        {/* <select ref={findUser}>
          {user?.map(e => (
            <option key={e?.user_id} value={e?.user_id}>
              {e?.email}
            </option>
          ))}
        </select>
        <select ref={findCourse}>
          {course?.map(e => (
            <option key={e?.course_id} value={e?.course_id}>
              {e?.course_title}
            </option>
          ))}
        </select>
      </div>
      <button onClick={send}>{Tillar[0][lang].sent}</button>
      <select className='take_select' onChange={w => take(w.target?.value)}>
        {course?.map(e => (
          <option key={e?.course_id} value={e?.course_id}>
            {e?.course_title}
          </option>
        ))}
      </select> */}
    </div>
  )
}

export default TakeInput
