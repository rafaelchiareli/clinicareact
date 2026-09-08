import {Route, Routes} from  'react-router-dom'
import Menu from './components/Menu'
import PacientesPage from './pages/PacientesPage'
import HomePage from './pages/HomePage'
import ProfissionaisPage from './pages/ProfissionaisPage'
import EspecialidadesPage from './pages/EspecialidadesPage'

export default function App(){
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pacientes" element={<PacientesPage />} />
        <Route path="/especialidades" element={<EspecialidadesPage />}/>
        <Route path="/profissionais" element={<ProfissionaisPage />} />

      
      
      </Routes>
    
    </>
  )
}