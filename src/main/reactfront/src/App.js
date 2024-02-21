import './App.css';
import './css/user.css';

import Header from './pages/fragment/Header'; // 헤더
import Footer from './pages/fragment/Footer'; // 푸터
import Content from './pages/fragment/Content'; // 내용 섹션

const App = () => {
  return (
      <div>
        <Header/> {/* 헤더 */}
        <Content/> {/* 내용 */}
        <Footer/> {/* 푸터 */}
      </div>
  );
};

export default App;