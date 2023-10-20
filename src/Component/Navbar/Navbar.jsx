import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from './../Context/authentication';
import { CartContext } from '../Context/cartContext';



const Navbar = () => {

  const { token, setToken } = useContext(authcontext);
  const {numOfCartItems} = useContext(CartContext);
  const navFunc = useNavigate();

  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);

    navFunc("/login");

  }


  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <h1 className="navbar-brand "> <span><i className="fa-solid fa-cart-shopping" style={{ color: "#4fa74f", }}></i></span>fresh cart</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto  ">
            {token ? <>
              <li className="nav-item px-1">
                <Link className="nav-link " aria-current="page" to="home">Home</Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link position-relative " aria-current="page" to="cart">
                  Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link " aria-current="page" to="wishlist">Wish List</Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link " aria-current="page" to="products">Products</Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link " to="categories">Categories</Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link " to="brands">Brands</Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link " aria-current="page" to="allorders">AllOrders</Link>
              </li>

            </> : ""}

          </ul>
          <ul className="navbar-nav ms-auto ">
            {token ? <>
              <li className="nav-item px-1">
                <Link className="nav-link " aria-current="page" to="profile">Profile</Link>
              </li>
              <li className="nav-item px-1">
                <span onClick={logout} className="nav-link " aria-current="page" style={{ cursor: "pointer", }} >Logout</span>
              </li>
              
            </> : <>
              <li className="nav-item px-1">
                <Link className="nav-link " aria-current="page" to="register">Register</Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link " to="login">Login</Link>
              </li>

            </>}


          </ul>
        </div>
      </div>
    </nav>

  </>
}

export default Navbar;
