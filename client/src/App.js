import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/User/HomePage";
import TestEnv from "./pages/TestEnv";
import TestOne from "./pages/TestOne";
import ProductsPage from "./pages/User/ProductsPage";
import SeletedProductPage from "./pages/User/SeletedProductPage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AddAdminProduct from "./pages/Admin/AddAdminProduct";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminSignin from "./pages/Admin/AdminSignin";
import AdminProductListPage from "./pages/Admin/AdminProductListPage";
import UserLoginPage from "./pages/User/UserLoginPage";
import UserSigninPage from "./pages/User/UserSigninPage";
import CartPage from "./pages/User/CartPage";
import PaymentPage from "./pages/User/PaymentPage";
import EditProductPage from "./pages/Admin/EditProductPage";
import EditPage from "./pages/Admin/EditPage";
import SearchPage from "./pages/User/SearchPage";


import './App.css'
function App() {

  return (
    <div className="App">
  <Router>
<Routes>
<Route path="/UserHome" element={<HomePage/>}/>
</Routes>
<Routes>
<Route path="/product" element={<ProductsPage/>}/>
</Routes>
<Routes>
<Route path="/selectedProduct" element={<SeletedProductPage/>}/>
</Routes>

<Routes>
<Route path="/test" element={<TestEnv/>}/>
</Routes>

<Routes>
<Route path="/adminHome" element={<AdminHomePage/>}/>
</Routes>
<Routes>
<Route path="/adminAddProduct" element={<AddAdminProduct/>}/>
</Routes>
<Routes>
<Route path="/Adminproductlist" element={<AdminProductListPage/>}/>
</Routes>
<Routes>
<Route path="/testtwo" element={<TestOne/>}/>
</Routes>

<Routes>
<Route path="/Adminsignin" element={<AdminSignin/>}/>
</Routes>
<Routes>
<Route path="/Adminlogin" element={<AdminLogin/>}/>
</Routes>

<Routes>
<Route path="/Usersignin" element={<UserSigninPage/>}/>
</Routes>
<Routes>
<Route path="/" element={<UserLoginPage/>}/>
</Routes>
<Routes>
<Route path="/cart" element={<CartPage/>}/>
</Routes>
<Routes>
<Route path="/payment" element={<PaymentPage/>}/>
</Routes>
<Routes>
<Route path="/Editproduct" element={<EditProductPage/>}/>
</Routes>
<Routes>
<Route path="/Edit" element={<EditPage/>}/>
</Routes>
<Routes>
<Route path="/Search" element={<SearchPage/>}/>
</Routes>
  </Router>
    </div>
  );
}

export default App;
