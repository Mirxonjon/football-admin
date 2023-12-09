import { useEffect, useState } from 'react'
import useComponent from '../../../hooks/useComponent'
import { apiGet } from '../../../utils/api'
import darkImage from '../../../img/icon (1).svg'
import image from '../../../img/icon.svg'
import useStart from '../../../hooks/useStart'
import Tillar from '../../../languages/language'

function Card() {
  const [data, setData] = useState()
  const { token } = useComponent()
  const { dark, lang } = useStart()

  useEffect(() => {
    apiGet('/users/statistika', token)
      .then((re) => re.json())
      .then((baza) => {
        setData(baza)
      })
  }, [setData, token])

  return (
    <ul className="card_statistika">
      <li className="item">
        <span>{Tillar[0][lang].jami}:</span> {data?.allUsers?.length || 0} ta
        <br />
        <span>{Tillar[0][lang].active}: </span> {data?.activeUser || 0} ta
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
      <li className="item">
        <span>{Tillar[0][lang].hafta}: </span> <br /> {data?.hafta || 0}
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
      <li className="item">
        <span>{Tillar[0][lang].oylik}:</span> <br /> {data?.hafta || 0}
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
      <li className="item">
        <span>{Tillar[0][lang].yillik}: </span> <br /> {data?.hafta || 0}
        <img src={dark ? darkImage : image} alt="icon" />
      </li>
    </ul>
  )
}

export default Card
