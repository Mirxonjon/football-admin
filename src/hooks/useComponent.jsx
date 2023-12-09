import { useContext } from 'react'
import { State } from '../content/component'

function useComponent () {
  const {
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
  } = useContext(State)
  return {
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
}

export default useComponent
