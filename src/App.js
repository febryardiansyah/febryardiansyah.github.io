import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from '../src/components/Home'
import About from '../src/components/About'
import Post from '../src/components/Post'
import SinglePost from '../src/components/SinglePost'
import Project from '../src/components/Project'
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route element={<Home/>} path='/' index />
        <Route element={<About/>} path='/about'/>
        <Route element={<Post/>} path='/posts'>
          <Route element={<SinglePost/>} path=':slug'/>
        </Route>
        <Route element={<Project/>} path='/projects'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
