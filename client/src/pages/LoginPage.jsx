import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { urlBase } from "../scripts/url";
import logo from "../components/photo/logo-bg.png";
import { routesBase } from "../scripts/routes";

const Login = (props) => {


  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState();

  const login = async () => {
    try {
      const response = await fetch(`${urlBase}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        navigate('/');
        localStorage.setItem('status', true);
        localStorage.setItem('token', data.token);
        props.setToken(data.token);
        props.connection();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <body className="bg-night vh-100">
      <main className="form-signin justify-content-center row pt-5 mx-auto">
        <form className="col-9 col-md-4 p-lg-5">
          <img
            className="mb-4"
            src={logo}
            alt="logo"
            width="82"
            height="82" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <p className="text-danger">  {error}</p>
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setLoginUsername(e.target.value)}
              type="text"
              className="form-control"
              id="id"
              placeholder="ID"
            />
            <label className="text-dark" htmlFor="floatingPassword">ID</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label className="text-dark" htmlFor="password">Password</label>
          </div>
          <Link
            onClick={login}
            className="btn btn-primary w-100 py-2 "
          >Sign in
          </Link>
          <Link
            to={routesBase.home}
            className="btn btn-outline-primary w-100 py-2 mt-3"
          >Continue offline
          </Link>
          <p className="mt-3 mb-3 text-white">©2023</p>
        </form>
      </main>
    </body>
  );
}

export default Login;
