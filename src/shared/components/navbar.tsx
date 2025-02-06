import { NavLink } from "react-router-dom";
import "@shared/css/navbar.style.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark mb-4" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CLARO IV
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink
                className={({isActive}) => (isActive ? 'nav-link active': 'nav-link')}
                to="/productos"
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({isActive}) => (isActive ? 'nav-link active': 'nav-link')}
                to="/"
              >
                Categorias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({isActive}) => (isActive ? 'nav-link active': 'nav-link')}
                to="/variantes"
              >
                Variantes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
