import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        {/* Show Register and Login components if not authenticated */}
        {!token ? (
          <div>
            <Register />
            <Login setToken={setToken} />
          </div>
        ) : (
          // Show TodoList if authenticated
          <TodoList token={token} />
        )}
      </header>
    </div>
  );
}

export default App;
