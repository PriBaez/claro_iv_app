import "@shared/css/navbar.style.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar mb-4" data-bs-theme="dark">
      <div className="container-fluid justify-content-start">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand ms-3" href="#">
          CLARO IV
        </a>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header bg-danger">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              CLARO IV
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="d-flex nav-item fs-3 align-self-start">
                <i className="bi bi-cart me-4"></i>
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to="/"
                >
                  Productos
                </NavLink>
              </li>
              <li className="d-flex nav-item fs-3 align-self-start">
                <i className="bi bi-tag me-4"></i>
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to="/categorias"
                >
                  Categorias
                </NavLink>
              </li>
              <li className="d-flex nav-item fs-3 align-self-start">
                <i className="bi bi-copy me-4"></i>
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to="/variantes"
                >
                  Variantes
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;