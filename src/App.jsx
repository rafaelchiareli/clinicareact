import {Route, Routes} from  'react-router-dom'
import Menu from './components/Menu'
import PacientesPage from './pages/PacientesPage'
import HomePage from './pages/HomePage'

export default function App(){
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pacientes" element={<PacientesPage />} />
      
      </Routes>
    
    </>
  )
}