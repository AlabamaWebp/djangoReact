import './styles/App.css';
import './styles/sbros.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Notfoundpage from './components/Notfoundpage';
function App() {
  return (
    <>
      <Routes>
        <Route path={"/login/"} element={<Login />} />
        <Route path={"/signup/"} element={<Signup />} />
        <Route path={"/"} element={<Home />} />
        <Route path={'*'} element={<Notfoundpage />} />
      </Routes>
    </>
  );
}

export default App;