// import TestConnection from './TestButtons';
// import './App.css';

import TestConnection from "./TestButtons";

function App() {
  return (
    <div className="App">
      <h1>BuildTech Base</h1>
      <header>
        <ul>
          <li>Ссылка на сервис1</li>
          <li>Ссылка на сервис2</li>
          <li>Ссылка на сервис3</li>
        </ul>
        <div>
          Тут будет вход в аккаунт
        </div>
      </header>
      <body>
        <TestConnection />
        Строка поиска
        Список рекомендаций
      </body>
      <aside>
        
      </aside>
    </div>
  );
}

export default App;