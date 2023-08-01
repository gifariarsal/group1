import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  return (
    <>
    {/* <Login /> */}
    {/* <Landing /> */}
    <Routes>
      <Route path="/" element={<Login />} ></Route>
      <Route path="/landing" element={<Landing />} ></Route>
    </Routes>
    </>
  );
}

export default App;
