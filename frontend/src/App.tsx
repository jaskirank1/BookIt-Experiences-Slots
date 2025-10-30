import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { SearchProvider } from './context/SearchContext'
import { Route, Routes } from 'react-router-dom'
import ExperienceDetails from './pages/ExperienceDetails'
import Checkout from './pages/CheckoutPage'
import BookingConfirmationPage from './pages/BookingConfirmationPage'

function App() {
  return (
    <div>
      <SearchProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/details/:id" element={<ExperienceDetails />} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/confirmation' element={<BookingConfirmationPage/>} />
        </Routes>
      </SearchProvider>
    </div>
  )
}

export default App
