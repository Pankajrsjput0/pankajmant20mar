import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NovelDetail from './pages/NovelDetail';
import Write from './pages/Write';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Ranking from './pages/Ranking';
import Auth from './pages/Auth';
import Chapter from './pages/Chapter';
import NewArrivals from './pages/NewArrivals';
import { useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userProfile } = useAuth();
  if (!userProfile) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/novel/:id" element={<NovelDetail />} />
              <Route path="/novel/:novelId/chapter/:chapterId" element={<Chapter />} />
              <Route path="/novels/:novelId/write" element={<Write />} />
              <Route path="/library" element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/explore" element={<Explore />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/write" element={<Write />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;