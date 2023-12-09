import InputWorkbook from './helper/input'
import ListWorkbook from './helper/list'
import ModalWorkbook from './helper/modal'
import './workbook.scss'
import './dark.scss'

function Workbook () {
  return (
    <>
      <InputWorkbook />
      <ListWorkbook />
      <ModalWorkbook />
    </>
  )
}

export default Workbook
