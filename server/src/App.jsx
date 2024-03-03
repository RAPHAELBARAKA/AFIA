
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import{BrowserRouter,Routes,Route}from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Home from './Home'
import Landingpage from './Landingpage'
import PasswordOtp from './PasswordOtp'
import VerifyOtp from './VerifyOtp'
import VerifypassOtp from '../VerifypassOtp'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/registers' element={<Registration/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/landingpage' element={<Landingpage/>}Forg></Route>
      <Route path='/PasswordOtp' element={<PasswordOtp/>}></Route>
      <Route path='/verify-otp' element={<VerifyOtp/>}></Route>
      <Route path='/VerifypassOtp' element={<VerifypassOtp/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
