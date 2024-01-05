import { Routes, Route, Link } from 'react-router-dom';
// routes는 여러 route컴포넌트를 감쌉니다. 그리고 현재 url경로에
// 맞게 적절한 route 컴포넌트를 페이지에 렌더링 합니다.
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import './App.css';
import {getEmotionImgById} from './util';
import { useReducer } from 'react';

function reducer(state, action) {
  return state;
}

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/edit' element={<Edit />}/>
        <Route path='/new' element={<New />}/>
        <Route path='/diary/:id' element={<Diary />}/>
      </Routes>
      {/* 페이지 이동 구현 */}
      <div>
        <Link to = {'/'}>Home</Link>
        <Link to = {'/edit'}>Edit</Link>
        <Link to = {'/new'}>New</Link>
        <Link to = {'/diary'}>Diary</Link>
      </div>
    </div>
  );
}

export default App;
