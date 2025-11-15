// import TestConnection from './TestButtons';
// import './App.css';
import "./styles/Navigation.css"
import "./styles/Search.css"

import Account from "./components/Account";
import Search from "./components/Search";
import TestConnection from "./components/TestButtons";
import { useState } from "react";

function App() {
  const [jwt, setJwt] = useState('');
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
            <Account setJwt={setJwt}/>
          </div>
        </header>
      </div>
      <div className="main-page-body">
        <TestConnection url='http://localhost:8080/api/v1/ping' jwt={jwt}/>
        <TestConnection url='http://localhost:8080/api/v1/auth/ping' jwt={jwt}/>
        <Search />
      </div>
      <aside>
        
      </aside>
    </div>
    </>
  );
}

export default App;