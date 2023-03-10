import Topbar from "./components/topbar/Topbar"
import Home from "./pages/home/Home";
import Single from "./pages/single/Single"
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Categories from "./pages/categories/Categories";
 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import { About } from "./pages/about/About";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar />
        <Routes>

          <Route exact path="/" element={<Home />} />

          {/* <Route path="/register" element={user ? <Home /> : <Register />} /> */}

          <Route path="/admin-panel" element={user ? <Home /> : <Login />} />

          {/* <Route path="/write" element={user ? <Write /> : <Register />} /> */}
          <Route path="/write" element={user ? <Write /> : <Home />} />

          {/* <Route path="/settings" element={user ? <Settings /> : <Register />} /> */}
          <Route path="/settings" element={user ? <Settings /> : <Home />} />

          <Route path="/post/:postId" element={<Single />} />

          <Route path="/categories" element={<Categories />} />
          
          <Route path="/about" element={<About />} />

        </Routes>
    </Router>
  );
}

export default App;
