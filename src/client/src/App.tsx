import React, { useState } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const testBackend = async () => {
    setIsLoading(true);
    try {

      const response = await fetch(`${apiUrl}/api/test`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBackendMessage(
          `Success!\nMessage: ${data.message}\nEnvironment: ${data.environment}\nTimestamp: ${data.timestamp}`
      );
    } catch (error) {
      console.error('Backend connection error :( :', error);
      setBackendMessage(
          `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n` +
          `Attempted URL: ${apiUrl}/test`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>TBD Game Hub</h1>
          <div className="environment-info">
            <p>Environment: {process.env.NODE_ENV}</p>
            <p>API URL: {apiUrl}</p>
          </div>
          <button
              onClick={testBackend}
              className="test-button"
              disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Test Backend Connection'}
          </button>
          {backendMessage && (
              <div className="message">
                <p style={{ whiteSpace: 'pre-line' }}>{backendMessage}</p>
              </div>
          )}
        </header>
      </div>
  );
}

export default App;
