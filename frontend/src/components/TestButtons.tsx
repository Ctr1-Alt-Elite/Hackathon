import { useState } from "react";

function TestConnection() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testPing = async () => {
    setLoading(true);
    try {
      const response = fetch('http://localhost:8080/api/v1/ping');
      const data = (await response).text();
      setMessage(`Ping was successful with data: ${data}`);
    } catch (error) {
      setMessage('Error while pinging the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pingChecking">
      <h3>Тест подключения к бекенду</h3>
      <button onClick={testPing}>
        {loading ? 'Проверяем...' : 'Проверить связь'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TestConnection;