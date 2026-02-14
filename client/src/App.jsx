import LoginRegister from '../pages/auth/LoginRegister';
import Home from '../pages/home/Home';
import ProtectedRoute from './ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import "./App.css"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CodeEditorPage from '../pages/editor/CodeEditorPage';

export default function App() {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  return (
    isLoading ? <div> Loading... </div> :
      <div className="App">
        <Routes>
          {/*authorized routes only*/}
          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path='/editor/:id' element = {<ProtectedRoute><CodeEditorPage/></ProtectedRoute>} />
          
          {/* no auth req. */}
          <Route path="/login" element={<LoginRegister />} />
          <Route path="*" element={`404 Not Found`} />

        </Routes>
      </div>
  );
}