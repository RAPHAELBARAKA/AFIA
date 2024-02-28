
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import{BrowserRouter,Routes,Route}from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Home from './Home'
import Landingpage from './Landingpage'
import ForgotPassword from './ForgotPassword'
import VerifyOtp from './VerifyOtp'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/registers' element={<Registration/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/landingpage' element={<Landingpage/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/verify-otp' element={<VerifyOtp/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
