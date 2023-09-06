import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { ToDoPage } from './pages/ToDoPage'
import { ImageCutPage } from './pages/ImageCutPage'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/todo" element={<ToDoPage />} /> 
        <Route path="/image" element={<ImageCutPage />} /> 
      </Routes>
    </>
  )
}

export default App
