import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/User/HomePage";
import TestEnv from "./pages/TestEnv";
import TestOne from "./pages/TestOne";
import ProductsPage from "./pages/User/ProductsPage";
import SeletedProductPage from "./pages/User/SeletedProductPage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AddAdminProduct from "./pages/Admin/AddAdminProduct";
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
<Route path="/testtwo" element={<TestOne/>}/>
</Routes>






  </Router>
    </div>
  );
}

export default App;
