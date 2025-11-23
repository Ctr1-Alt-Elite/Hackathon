import "./styles/Navigation.css";
import "./styles/Search.css";

import Account from "./components/Account";
import Search from "./components/Search";
// import DocumentsPage from "./components/DocumentsPage";
import TestConnection from "./components/TestButtons";
import { useState } from "react";

function App() {
  const [jwt, setJwt] = useState('');
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap" rel="stylesheet" />
        <meta charSet="UTF-8" />
        <title>BuildTech Base</title>
      </head>
      <div className="App">
        <div className="topApp">
          <h1>BuildTech Base</h1>
          <header>
            <ul className="navigation">
              <li>
                <a 
                  href="#" 
                  className={currentPage === 'home' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
                >
                  Главная
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={currentPage === 'documents' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setCurrentPage('documents'); }}
                >
                  Мои документы
                </a>
              </li>
              <li><a href="#">Комментарии</a></li>
            </ul>
            <div>
              <Account setJwt={setJwt}/>
            </div>
          </header>
        </div>

        {currentPage === 'home' && (
          <div className="main-page-body">
            <TestConnection url='http://localhost:8080/api/v1/ping' jwt={jwt}/>
            <TestConnection url='http://localhost:8080/api/v1/auth/ping' jwt={jwt}/>
            <Search />
          </div>
        )}

        {/* {currentPage === 'documents' && <DocumentsPage />} */}

        <aside></aside>
      </div>
    </>
  );
}

export default App;