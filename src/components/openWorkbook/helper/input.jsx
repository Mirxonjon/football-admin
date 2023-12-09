import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import { apiGet, host } from '../../../utils/api'
import useComponent from '../../../hooks/useComponent'
import yukla from '../../../img/bx_download.svg'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'

function InputOpen () {
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, setOpenId } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])

  useEffect(() => {
    apiGet('/courses', token)
      .then(re => re.json())
      .then(data => {
        setCourse(data)
        setOpenId(data[0]?.course_id)
      })
  }, [setCourse, token, count, setOpenId])

  const sent = () => {
    const bgcolor = bgc.current.value
    const sequence = seq.current.value
    const file = rasmi.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    if (bgcolor && sequence && file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('sequence', sequence)
      formData.append('courseId', bgcolor)

      fetch(host + '/workbookopen/create', {
        method: 'POST',
        headers: {
          autharization: token
        },
        body: formData
      }).then(data => {
        if (data.ok) {
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
              content: 'Workbook format .pgf || Book Already added',
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
          content: 'Malumotlarni toldiring!',
          duration: 2
        })
      }, 1000)
    }
  }

  return (
    <>
      <div className='inputs_course'>
        <h1>{Tillar[0][lang].open}</h1>
        <ul>
          <li>
            <span>{Tillar[0][lang].oqish}</span>
            <select ref={bgc}>
              {course.length
                ? course.map((e, i) => (
                    <option key={i} value={e?.course_id}>
                      {e?.course_title}
                    </option>
                  ))
                : null}
            </select>
          </li>
          <li>
            <span>{Tillar[0][lang].seq}</span>
            <select ref={seq}>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </li>
          <li className='rasm'>
            <span>{Tillar[0][lang].openWorkbook}</span>
            <label htmlFor='rasm'>
              <i>{Tillar[0][lang].yukla}</i>
              <img src={yukla} alt='yukla' />
            </label>
            <input id='rasm' ref={rasmi} className='none' type='file' />
          </li>
        </ul>
        {contextHolder}
        <button className='openWorkbookbtn' onClick={sent}>{Tillar[0][lang].sent}</button>
      </div>
      <select
        className='videoSelect'
        onClick={e => setOpenId(e?.target?.value)}
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

export default InputOpen
