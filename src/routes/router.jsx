import { Route, Routes } from 'react-router-dom'
import { Course, Take, Video, Xisobot, Error, AllUser, TrainingsubCategory } from '../components'
import Login from '../components/auth/login'
import CompetitionCategory from '../components/competitionCategory/competitionCategory'
import CompetitionVideos from '../components/competitionVideos/video'
import MasterClassCategory from '../components/MasterClassCategory/course'
import MasterClassVideos from '../components/MasterClassVideos/video'
import BookCategory from '../components/bookCategory/course'
import Book from '../components/book/video'
import ShortBookCategory from '../components/shortbookCategory/course'
import ShortBook from '../components/shortBook/video'
import INdivudualTrainingCategory from '../components/indivudualTrainingCategory/course'
import IndivudualTrainingVideo from '../components/indivudualTrainingVideos/video'


function Routerr () {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/xisobot' element={<Xisobot />} />
      <Route path='/kurslar' element={<Course />} />
      <Route path='/TrainingsubCategory' element={<TrainingsubCategory />} />
      <Route path='/video' element={<Video />} />
      <Route path='/indivudualTRCategory' element={<INdivudualTrainingCategory />} />
      <Route path='/indivudualTRVideo' element={<IndivudualTrainingVideo />} />
      <Route path='/competitionCategory' element={<CompetitionCategory />} />
      <Route path='/competitionVideo' element={<CompetitionVideos />} /> 
      <Route path='/masterClassCategory' element={<MasterClassCategory />} />
      <Route path='/masterClassVideo' element={<MasterClassVideos />}/> 
      <Route path='/bookCategory' element={<BookCategory />} />
      <Route path='/kitob' element={<Book />} />
      <Route path='/shortBookCategory' element={<ShortBookCategory />} />
      <Route path='/open' element={<ShortBook />} />
      
      <Route path='/users' element={<AllUser />} />
      <Route path='/sotish' element={<Take />} />
      <Route path='/*' element={<Error />} />
    </Routes>
  )
}

/*
  setting
*/

export default Routerr
