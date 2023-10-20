import React from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Products from "./Component/Products/Products";
import Notfound from "./Component/Notfound/Notfound";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Categories from "./Component/Categories/Categories";
import Brands from "./Component/Brands/Brands";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Wishlist from "./Component/Wishlist/Wishlist";
import { AuthProvider } from "./Component/Context/authentication";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import { QueryClientProvider, QueryClient } from "react-query";
import Detail from "./Component/Details/Detail";
import { CartContextProvider } from "./Component/Context/cartContext";
import { Toaster } from "react-hot-toast";
import Profile from "./Component/Profile/Profile";
import Allorders from "./Component/Allorders/Allorders";
import Payment from "./Component/Payment/Payment";
import { WishlistContextProvider } from "./Component/Context/wishlistContext";
import { Offline } from "react-detect-offline";

const myrouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element:<ProtectedRoute>
      <Products /> 
      </ProtectedRoute>
      },
      { path: "products", element: <ProtectedRoute>
      <Products />
      </ProtectedRoute>
      },
      { path: "details/:id", element: <ProtectedRoute>
      <Detail /> 
      </ProtectedRoute>
      },
      { path: "register", element: <Register /> },
      { path: "allorders", element: <ProtectedRoute>
      <Allorders />
      </ProtectedRoute>
      },
      { path: "payment/:id", element: <ProtectedRoute>
      <Payment />
      </ProtectedRoute>
      },
      { path: "login", element: <Login /> },
      { path: "profile", element: <ProtectedRoute>
      <Profile /> 
      </ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute>
      <Categories /> 
      </ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute>
      <Brands /> 
      </ProtectedRoute> },
      { path: "home", element: <ProtectedRoute>
      <Home /> 
      </ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute>
      <Cart />
      </ProtectedRoute>  },
      { path: "wishlist", element: <ProtectedRoute>
      <Wishlist />
      </ProtectedRoute> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const App = () => {
  let clientQuery = new QueryClient();
  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <CartContextProvider>
          <WishlistContextProvider>
            <AuthProvider>
              <RouterProvider router={myrouter} />
            </AuthProvider>
          </WishlistContextProvider>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>


    <Offline>

    <div className="position-fixed bottom-0 start-0 text-white bg-dark">
      Oops..you are offline now.
    </div>

    </Offline>

    </>
  );
};

export default App;
