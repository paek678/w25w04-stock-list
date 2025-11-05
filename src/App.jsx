import { Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList'; // { } 없이 default import
import PostDetail from './pages/PostDetail'; // { } 없이 default import

function App() {
  return (
    // TailwindCSS를 위해 최상위 div에 여백 추가
    <div className="max-w-4xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;