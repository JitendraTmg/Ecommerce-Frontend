import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Signup from "@/pages/Signup";
import ProductDetails from "@/pages/productDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        path: "/products/:id",
        element: <ProductDetails />
    }
]);

function App() {
    return <>
        <RouterProvider router={router} />
    </>;
}

export default App;
