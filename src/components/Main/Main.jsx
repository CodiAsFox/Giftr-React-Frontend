import { Route, Routes} from 'react-router-dom';
import Login from '../Login/Login'
import People from '../People/People'
import Person from '../Person/Person'
import Gifts from '../Gifts/Gifts'
import Gift from '../Gift/Gift'
import NotFound from '../NotFound/NotFound'
import './Main.css';


const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login/>}  index/>
        <Route path="/people/" element={<People/>}>
          <Route path=":id" element={<Person/>}>
          </Route>
        </Route>
        <Route path="/gifts/" element={<Gifts/>}>
          <Route path=":giftId" element={<Gift/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default Main