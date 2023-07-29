import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <>
    <Routes>
      <Route></Route>
    </Routes>
    </>
  );
}

export default App;
