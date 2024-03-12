import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();
  return (
    <>
      <header className="section-navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Homiees-logo"
                width="80%"
                height="auto"
              />
            </Link>
          </div>

          <nav className="navbar">
            <ul>
              {isLoggedIn ? (
                <li>
                  <Link to="/userProfile">
                    <img
                      src={user.avatar}
                      alt="profilePage"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                    />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/userLogin" className="btn">
                    Login
                  </Link>
                </li>
              )}

              <li>
                <Link to="/providerRegister" className="nav-link btn btn-black">
                  become provider
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
