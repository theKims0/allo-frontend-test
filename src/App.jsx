import { RocketProvider } from './context/RocketContext';
import RocketDetailPage from './pages/RocketDetailPage';
import RocketListPage from './pages/RocketListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <RocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RocketListPage />} />
          <Route path="/rocket/:id" element={<RocketDetailPage />} />
        </Routes>
      </BrowserRouter>  
    </RocketProvider>
  )
}

export default App
