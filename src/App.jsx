import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Signup from "@/pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./components/Cart";
import ProductDetails from "./pages/ProductDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <> <Navbar /> <Home /> <Products /> <Footer /> </>
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/products",
        element: <><Navbar /> <Products /> <Footer /> </>
    },
    {
        path: "/products/:id",
        element: <><Navbar /> <ProductDetails /> <Footer /> </>
    },
    {
        path: "/products/:id",
        element: <><Navbar /> <Cart /> <Footer /> </>
    }
]);

function App() {
    return <>
        <RouterProvider router={router} />
    </>;
}

export default App;
