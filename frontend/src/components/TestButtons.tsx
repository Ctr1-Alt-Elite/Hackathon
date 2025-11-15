import { useState } from "react";

interface TestConnectionProps {
    url: string;
    jwt: string | null;
}

function TestConnection({ url, jwt }:TestConnectionProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const testPing = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.text();
      setMessage(`Ping was successful with data: ${data}`);
    } catch (error) {
      console.log(error);
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