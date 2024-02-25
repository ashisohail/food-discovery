import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

function Nav() {
  const [cookies, setCookies] = useCookies(["token"]);
  return (
    <header className="fixed h-20 w-full flex justify-between items-center px-4 md:px-12 bg-gray-200 z-50">
      {/* logo */}
      <div>
        <a href="">
          <i className="fa-solid fa-plate-wheat text-3xl text-orange-700 h-10 hover:text-orange-600">
            <span className="text-sm">
              <span className="text-yellow-500"> Food</span> Discovery
            </span>
          </i>
        </a>
      </div>

      {/* Bars button for Dropdown menu */}
      <nav>
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="md:hidden"
          type="button"
        >
          <i className="fa-solid fa-bars text-orange-500 text-3xl"></i>
        </button>

        {/* Dropdown menu  */}
        <div id="dropdown" className="hidden z-10 w-50 bg-gray-50">
          <ul
            className="py-1 text-sm text-black-700 dark:text-black-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <a
                href="index.html"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="products.html"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="contact-form.html"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* menu items    */}
        <ul className="max-md:hidden md:flex md:space-x-6 md:p-0 md:space-x-6">
          <li className="hover:text-orange-600">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-orange-600">
            <Link to={`/recipes/myRecipes/${cookies.token.id}`}>
              My Recipes
            </Link>
          </li>
          {cookies.token ? (
            <li>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  setCookies("token", "");
                }}
                className="hover:text-orange-600 cursor-pointer"
              >
                Sign Out
              </a>
            </li>
          ) : (
            <li>
              <a className="hover:text-orange-600">
                <Link to="/auth/login">Sign In</Link>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
