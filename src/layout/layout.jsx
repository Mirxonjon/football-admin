import {
  BookOutlined,
  FileOutlined,
  HomeOutlined,
  OrderedListOutlined,
  PayCircleOutlined,
  ReadOutlined,
  UsergroupDeleteOutlined,
  VideoCameraAddOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import useStart from '../hooks/useStart'
import Logo from '../img/logo.svg'
import HeaderMe from '../page/header/header'
import '../page/header/header.scss'
import MainMe from '../page/main/main'
import Tillar from '../languages/language'
const { Sider, Content } = Layout

const LayoutMe = () => {
  const {
    head,
    setHead,
    setNav,
    son,
    setSon,
    dark,
    menubar,
    setMenubar,
    lang
  } = useStart()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  // asosiy link va statelar

  useEffect(() => {
    switch (head) {
      case 'Xisobot':
        setNav('xisobot')
        navigate('xisobot')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].Xisobod))
        break
      case 'Отчет':
        setNav('xisobot')
        navigate('xisobot')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].Xisobod))
        break
      case 'Report':
        setNav('xisobot')
        navigate('xisobot')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].Xisobod))
        break
      case 'Kurslar':
        setNav('kurslar')
        navigate('kurslar')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].oqish))
        break
      case 'Курсы':
        setNav('kurslar')
        navigate('kurslar')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].oqish))
        break
      case 'Courses':
        setNav('kurslar')
        navigate('kurslar')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].oqish))
        break
        case 'Mashgulotlar guruhi':
          setNav('TrainingsubCategory')
          navigate('TrainingsubCategory')
          localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].mashgulotguruhi))
          break
        case 'Training group':
          setNav('TrainingsubCategory')
          navigate('TrainingsubCategory')
          localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].mashgulotguruhi))
          break
          case 'Учебная группа':
            setNav('TrainingsubCategory')
            navigate('TrainingsubCategory')
            localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].mashgulotguruhi))
            break
      case 'Video':
        setNav('video')
        navigate('video')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].guruh))
        break
      case 'Bидео':
        setNav('video')
        navigate('video')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].guruh))
      break
      case 'Musobaqa':
        setNav('competitionCategory')
        navigate('competitionCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].musobaqa))
      break
      case 'Cоревнование':
        setNav('competitionCategory')
        navigate('competitionCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].musobaqa))
      break
      case 'competition':
        setNav('competitionCategory')
        navigate('competitionCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].musobaqa))
      break
      case 'Musobaqa Videolari':
        setNav('competitionVideo')
        navigate('competitionVideo')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].musobaqaVideo))
      break
      case 'Видео соревнований':
        setNav('competitionVideo')
        navigate('competitionVideo')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].musobaqaVideo))
      break
      case 'Competition Videos':
        setNav('competitionVideo')
        navigate('competitionVideo')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].musobaqaVideo))
      break
      case 'Master-klass':
        setNav('masterClassCategory')
        navigate('masterClassCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].Masterclass))
      break
      case 'Мастер класс':
        setNav('masterClassCategory')
        navigate('masterClassCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].Masterclass))
      break
      case 'Masterclass':
        setNav('masterClassCategory')
        navigate('masterClassCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].Masterclass))
      break
      case 'Master-klass video':
        setNav('masterClassVideo')
        navigate('masterClassVideo')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].MasterclassVideo))
      break
      case 'Видео мастер-класса':
        setNav('masterClassVideo')
        navigate('masterClassVideo')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].MasterclassVideo))
      break
      case 'Masterclass videos':
        setNav('masterClassVideo')
        navigate('masterClassVideo')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].MasterclassVideo))
      break
      case 'Kitoblar guruhi':
        setNav('bookCategory')
        navigate('bookCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].kitoblarguruhi))
      break
      case 'Группа книг':
        setNav('bookCategory')
        navigate('bookCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].kitoblarguruhi))
      break
      case 'Books group':
        setNav('bookCategory')
        navigate('bookCategory')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].kitoblarguruhi))
      break
      case 'Kitoblar':
        setNav('kitob')
        navigate('kitob')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].tolov))
        break
      case 'Книги':
        setNav('kitob')
        navigate('kitob')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].tolov))
        break
      case 'Books':
        setNav('kitob')
        navigate('kitob')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].tolov))
        break
        case 'Konspektlar guruhi':
          setNav('shortBookCategory')
          navigate('shortBookCategory')
          localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].konspektlarguruhi))
          break
        case `Ko'nspektlar group`:
          setNav('shortBookCategory')
          navigate('shortBookCategory')
          localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].konspektlarguruhi))
        break
        case `Ko'nspektlar`:
        setNav('open')
        navigate('open')
        localStorage.setItem(
          'xisobos',
          JSON.stringify(Tillar[0]['uz'].openWorkbook)
        )
        break
      // case 'Oткрытая Kнига':
      //   setNav('open')
      //   navigate('open')
      //   localStorage.setItem(
      //     'xisobos',
      //     JSON.stringify(Tillar[0]['uz'].openWorkbook)
      //   )
      //   break
      // case 'Open Book':
      //   setNav('open')
      //   navigate('open')
      //   localStorage.setItem(
      //     'xisobos',
      //     JSON.stringify(Tillar[0]['uz'].openWorkbook)
      //   )
      //   break
      case 'Sotib Olish':
        setNav('sotish')
        navigate('sotish')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].davoma))
        break
      case 'Покупка':
        setNav('sotish')
        navigate('sotish')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].davoma))
        break
      case 'Purchase':
        setNav('sotish')
        navigate('sotish')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].davoma))
        break
      case 'Sozlash':
        setNav('sozlash')
        navigate('sozlash')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].sozla))
        break
      case 'Настройка':
        setNav('sozlash')
        navigate('sozlash')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].sozla))
        break
      case 'Setting':
        setNav('sozlash')
        navigate('sozlash')
        localStorage.setItem('xisobos', JSON.stringify(Tillar[0]['uz'].sozla))
        break
      case 'Hamma Users':
        setNav('users')
        navigate('users')
        localStorage.setItem(
          'xisobos',
          JSON.stringify(Tillar[0]['uz'].allUsers)
        )
        break
      case 'Bсе Пoльзователи':
        setNav('users')
        navigate('users')
        localStorage.setItem(
          'xisobos',
          JSON.stringify(Tillar[0]['uz'].allUsers)
        )
        break
      case 'All Users':
        setNav('users')
        navigate('users')
        localStorage.setItem(
          'xisobos',
          JSON.stringify(Tillar[0]['uz'].allUsers)
        )
        break
      
      default:
        setNav('404')
        navigate('404')
        localStorage.setItem('xisobos', JSON.stringify('404'))
        break
    }
  }, [head, lang, setNav, navigate])
  // til ozgarsa ham bir xil pagega ketishini kuzatuvchi

  useEffect(() => {
    localStorage.setItem('son', JSON.stringify(son))
    localStorage.setItem('head', JSON.stringify(head))
    localStorage.setItem('til', JSON.stringify(lang))
    localStorage.setItem('dark', JSON.stringify(dark))
  }, [son, head, lang, dark])
  //  malumotlarni local storijga saqlash

  const link = evt => {
    if (evt.domEvent.target.textContent) {
      setHead(evt.domEvent.target.textContent)
      setSon(evt.key)
    } else {
      setHead(evt.domEvent.currentTarget.innerText)
    }
  }
  // menu bosilganda asosiy ishlar

  useEffect(() => {
    if (son === '1') {
      setHead(Tillar[0][lang].Xisobod)
    } else if (son === '2') {
      setHead(Tillar[0][lang].oqish)
    } else if (son === '3') {
      setHead(Tillar[0][lang].guruh)
    } else if (son === '4') {
      setHead(Tillar[0][lang].openWorkbook)
    } else if (son === '5') {
      setHead(Tillar[0][lang].tolov)
    } else if (son === '6') {
      setHead(Tillar[0][lang].allUsers)
    } else if (son === '7') {
      setHead(Tillar[0][lang].davoma)
    } else if (son === '8') {
      setHead(Tillar[0][lang].mashgulotguruhi)
    } else if (son === '9') {
      setHead(Tillar[0][lang].musobaqa)
    }else if (son === '10') {
      setHead(Tillar[0][lang].musobaqaVideo)
    }else if (son === '11') {
      setHead(Tillar[0][lang].Masterclass)
    }else if (son === '12') {
      setHead(Tillar[0][lang].MasterclassVideo)
    }else if (son === '13') {
      setHead(Tillar[0][lang].kitoblarguruhi)
    }else if (son === '14') {
      setHead(Tillar[0][lang].konspektlarguruhi)
    }else if (son === '15') {
      setHead(Tillar[0][lang].sozla)
    }
  }, [lang, head, son, setHead])
  // headerdagi textni til ozgarganda ozgartirish u-n

  const spanMenu = evt => {
    if (evt.target.className === 'menu_orqasi') {
      setMenubar(!menubar)
    }
  }
  //  tashqi taraf bosilganda ham menu yopilshi uchun

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={dark ? 'menuDark ' : ''}>
            <div
              onClick={() => setCollapsed(!collapsed)}
              className='Sabinas_logo'
            >
              <img width={50} height={50} src={Logo} alt='logo' />
              <span className={`${collapsed ? 'none' : 'spamcha_logo'}`}>
              Coaching Zona
              </span>
            </div>

            <Menu
              theme='dark'
              mode='inline'
              onClick={evt => link(evt)}
              defaultSelectedKeys={[son]}
              items={[
                {
                  key: '1',
                  icon: <HomeOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].Xisobod}`
                },
                {
                  key: '2',
                  icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].oqish}`
                },
                {
                  key: '8',
                  icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].mashgulotguruhi}`
                },
                {
                  key: '3',
                  icon: <VideoCameraAddOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].guruh}`
                },
                {
                  key: '9',
                  icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].musobaqa}`
                },
                {
                  key: '10',
                  icon:  <VideoCameraAddOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].musobaqaVideo}`
                },
                {
                  key: '11',
                  icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].Masterclass}`
                },
                {
                  key: '12',
                  icon:  <VideoCameraAddOutlined style={{ fontSize: 20 }}/>,
                  label: `${Tillar[0][lang].MasterclassVideo}`
                },
                {
                  key: '13',
                  icon: <BookOutlined  style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].kitoblarguruhi}`
                },
                {
                  key: '5',
                  icon: <ReadOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].tolov}`
                },
                {
                  key: '14',
                  icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].konspektlarguruhi}`
                },
                {
                  key: '4',
                  icon: <FileOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].openWorkbook}`
                },
                {
                  key: '6',
                  icon: <UsergroupDeleteOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].allUsers}`
                },
                {
                  key: '7',
                  icon: <PayCircleOutlined style={{ fontSize: 20 }} />,
                  label: `${Tillar[0][lang].davoma}`
                },
               
              ]}
            />
          </div>
        </Sider>
        <Layout className={dark ? 'contentMenu site-layout' : 'site-layout'}>
          <HeaderMe />
          <Content
            className={
              dark
                ? 'contentMenu site-layout-background'
                : 'site-layout-background'
            }
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <MainMe />
          </Content>
        </Layout>
      </Layout>

      {menubar && (
        <div onClick={spanMenu} className={dark ? 'menu menu_dark' : 'menu'}>
          <div
            onClick={() => setMenubar(!menubar)}
            className='Sabinas_logo zed'
          >
            <img width={50} height={50} src={Logo} alt='logo' />
            <span className={`${!menubar ? 'none' : 'spamcha_logo'}`}>
            Coaching Zona
            </span>
          </div>
          <span className='menu_orqasi'></span>
          <Menu
            theme='dark'
            mode='inline'
            className='menu_Menu'
            onClick={evt => {
              link(evt)
              setMenubar(!menubar)
            }}
            defaultSelectedKeys={[son]}
            items={[
              {
                key: '1',
                icon: <HomeOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].Xisobod}`
              },
              {
                key: '2',
                icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].oqish}`
              },
              {
                key: '8',
                icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].mashgulotguruhi}`
              },
              {
                key: '3',
                icon: <VideoCameraAddOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].guruh}`
              },
              {
                key: '9',
                icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].musobaqa}`
              },
              {
                key: '10',
                icon:  <VideoCameraAddOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].musobaqaVideo}`
              },
              {
                key: '11',
                icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].Masterclass}`
              },
              {
                key: '12',
                icon:  <VideoCameraAddOutlined style={{ fontSize: 20 }}/>,
                label: `${Tillar[0][lang].MasterclassVideo}`
              },
              {
                key: '13',
                icon: <BookOutlined  style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].kitoblarguruhi}`
              },
              {
                key: '5',
                icon: <ReadOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].tolov}`
              },
              {
                key: '14',
                icon: <OrderedListOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].konspektlarguruhi}`
              },
              {
                key: '4',
                icon: <FileOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].openWorkbook}`
              },
          
              {
                key: '6',
                icon: <UsergroupDeleteOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].allUsers}`
              },
              {
                key: '7',
                icon: <PayCircleOutlined style={{ fontSize: 20 }} />,
                label: `${Tillar[0][lang].davoma}`
              },
              {
                key: '8',
                icon: (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={20}
                    height={20}
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                ),
                label: `${Tillar[0][lang].sozla}`
              }
            ]}
          />
        </div>
      )}
    </>
  )
}

export default LayoutMe
