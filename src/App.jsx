import React from 'react';
import Navbar from './Navbar';
import Feed from './pages/Feed';
import Bazar from './pages/Bazar';
import TimeLine from './pages/TimeLine';
import Empreendedorismo from './pages/Empreendedorismo';
import Login from './pages/Login';

function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/bazar" element={<Bazar />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/empreendedorismo" element={<Empreendedorismo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  </AuthProvider>  
  );
}

export default App;