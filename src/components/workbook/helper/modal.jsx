import { useEffect, useRef, useState } from 'react'
import { message } from 'antd'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import yukla from '../../../img/bx_download.svg'
import { apiGet, host } from '../../../utils/api'

function ModalWorkbook () {
  const bgc = useRef()
  const rasmi = useRef()
  const seq = useRef()
  const { lang } = useStart()
  const { token, setCount, count, modalWorkbook, setModalWorkbook } = useComponent()
  const [messageApi, contextHolder] = message.useMessage()
  const [course, setCourse] = useState([])
  const [workbook, setWorkbook] = useState([])

  useEffect(() => {
    apiGet('/courses', token)
      .then(re => re.json())
      .then(data => {
        setCourse(data)
      })
  }, [setCourse, token, count])

  const handleOk = () => {
    setModalWorkbook(false)
    const bgcolor = bgc.current.value
    const sequence = seq.current.value
    const file = rasmi.current.files[0]
    const key = 'updatable'
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('courseId', bgcolor)
    formData.append('sequence', sequence)
    fetch(host + '/workbook/update/' + modalWorkbook?.workbook_id, {
      method: 'PATCH',
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
            content: 'Loaded!',
            duration: 2
          })
        }, 1000)
      }
    })
  }

  const work = id => {
    const falsse = typeof id === 'string' ? 'false' : false

    if (id !== falsse) {
      apiGet('/video/by_course/' + id, token)
        .then(re => re.json())
        .then(data => setWorkbook(data))
    }
  }

  const handleCancel = () => {
    setModalWorkbook(false)
  }

  return (
    <>
      <b onClick={handleCancel} className={!modalWorkbook ? 'none' : 'b'}></b>
      <div className={!modalWorkbook ? 'none' : 'modal_course'}>
        <ul>
          <li>
            <span>{Tillar[0][lang].oqish}</span>
            <select onChange={e => work(e.target?.value)} ref={bgc}>
            <option value={false}>Choose here</option>
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
              {workbook.length
                ? workbook.map((e, i) => <option key={i} value={i + 3}>{i + 3}</option>)
                : <option value={false}>0</option>}
            </select>
          </li>
          <li className='rasm'>
            <span>{Tillar[0][lang].openWorkbook}</span>
            <label htmlFor='rasm'>
              <i>{Tillar[0][lang].yukla}</i>
              <img style={{ marginBottom: '15px' }} src={yukla} alt='yukla' />
            </label>
            <input id='rasm' ref={rasmi} className='none' type='file' />
          </li>
        </ul>
        <button style={{ top: '170px' }} onClick={handleOk}>
          {Tillar[0][lang].sent}
        </button>
        {contextHolder}
      </div>
    </>
  )
}

export default ModalWorkbook
