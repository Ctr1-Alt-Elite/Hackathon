// import TestConnection from './TestButtons';
// import './App.css';
import "./styles/Navigation.css"
import "./styles/Search.css"

import Account from "./components/Account";
import Search from "./components/Search";
import TestConnection from "./components/TestButtons";

function App() {
  return (
    <>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap" rel="stylesheet" />
    </head>
    <div className="App">
      <div className="topApp">
        <h1>BuildTech Base</h1>
        <header>
          <ul className="navigation">
            <li><a href="#" className="active">Главная</a></li>
            <li><a href="#">Мои документы</a></li>
            <li><a href="#">Комментарии</a></li>
          </ul>
          <div>
            <Account />
          </div>
        </header>
      </div>
      <div className="main-page-body">
        <TestConnection />
        <Search />
      </div>
      <aside>
        
      </aside>
    </div>
    </>
  );
}

export default App;