import { createContext, useState } from 'react'

export const State = createContext()

export const StatPriveder = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('admin_token')) || ''
  )
  const [count, setCount] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [coursId, setCourseId] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [takeId, setTakeId] = useState(false)
  const [openId, setOpenId] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalWorkbook, setModalWorkbook] = useState(false)
  const [workbookId, setWorkbookId] = useState(false)

  const data = {
    token,
    setToken,
    count,
    setCount,
    openModal,
    setOpenModal,
    coursId,
    setCourseId,
    videoModal,
    setVideoModal,
    takeId,
    setTakeId,
    openId,
    setOpenId,
    modalOpen,
    setModalOpen,
    modalWorkbook,
    setModalWorkbook,
    workbookId,
    setWorkbookId
  }
  return <State.Provider value={data}>{children}</State.Provider>
}
