import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLanding from "./pages/admin/AdminLanding";
import CashierLanding from "./pages/cashier/CashierLanding";
import ProductManagement from "./pages/admin/ProductManagement";
import ResetPassword from "./pages/ResetPassword";

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
      <Route path="/" element={<Login />} />
      <Route path="/admin/landing" element={<AdminLanding />} />
      <Route path="/cashier/landing" element={<CashierLanding />} />
      <Route path="/admin/landing/product-management" element={<ProductManagement />} />
      <Route path="/verification/:token" element={<ResetPassword />} />
    </Routes>
    </>
  );
}

export default App;
