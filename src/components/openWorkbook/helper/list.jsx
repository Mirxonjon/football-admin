import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, Result, message } from 'antd'
import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'
import { apiGet } from '../../../utils/api'
import fileDownload from 'js-file-download'

function ListOpen () {
  const { openId, token, setCount, count, setModalOpen } = useComponent()
  const { lang } = useStart()
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setVideo] = useState([])
  const key = 'updatable'

  useEffect(() => {
    apiGet('/workbookopen/get/' + openId, token)
      .then(re => re.json())
      .then(data => {
        setVideo(data?.workbook_open)
      })
  }, [openId, count, setVideo, token])

  const WorkbbookDelete = id => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...'
    })
    apiGet('/workbookopen/delete/' + id, token, 'DELETE').then(baza => {
      if (baza.ok) {
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
        messageApi.open({
          key,
          type: 'error',
          content: 'Loaded!',
          duration: 2
        })
      }
    })
  }

  const cancel = () => {
    message.error('Click on No')
  }

  const download = (id) => {
    apiGet('/workbookopen/one/' + id)
    // .then(re => re.json())
    .then(data => {
      fileDownload(data, 'downlaod.pdf')
    })
  }

  return (
    <div className='list_open'>
      {contextHolder}
      <ul style={{ marginTop: '50px' }} className='top'>
        {data?.length ? (
          data.map((e, i) => (
            <li style={{ width: '250px' }} key={i}>
              <h2 style={{cursor: 'pointer'}} onClick={() => download(e.openbook_id)}>Workbook Open</h2>
              <p style={{ marginTop: '10px' }}>
                <span>{Tillar[0][lang].seq}:</span> {e?.openbook_sequence} chi
              </p>
              <b>
                <EditOutlined
                  onClick={() => setModalOpen(e)}
                  style={{ cursor: 'pointer', fontSize: '22px' }}
                />
                <Popconfirm
                  title="O'chirmoqchimisz?"
                  onConfirm={() => WorkbbookDelete(e.openbook_id)}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                >
                  <DeleteOutlined
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '22px'
                    }}
                  />
                </Popconfirm>
              </b>
            </li>
          ))
        ) : (
          <Result
            status='404'
            title='404'
            style={{ marginLeft: '400px' }}
            subTitle='Sorry, the page you visited does not exist.'
          />
        )}
      </ul>
    </div>
  )
}

export default ListOpen
