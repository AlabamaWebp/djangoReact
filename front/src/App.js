import './styles/App.css';
import './styles/sbros.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';
import Create from './components/Create';
// import Edit from './components/Edit';
import Notfoundpage from './components/Notfoundpage';
function App() {
  return (
    <>
      <main>
        {/* <Link to="/login/" >Login</Link>
        <Link to="/" >Home</Link>
        <Link to="/signup/" >Signup</Link> */}
        {/* <button onClick={Click}>lol</button> */}
      </main>
      <Routes>
        <Route path={"/login/"} element={<Login />} />
        <Route path={"/signup/"} element={<Signup />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/create/"} element={<Create />} />
        {/* <Route path={'/edit/'} element={<Edit />} /> */}
        <Route path={'*'} element={<Notfoundpage />} />
      </Routes>
    </>
  );
}

export default App;