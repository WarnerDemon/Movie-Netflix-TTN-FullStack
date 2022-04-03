import React, { useEffect, useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { logo } from "../../imports/image";
import {
  MetaData,
  useRequireInput,
  useTogglePassword,
} from "../../imports/index";
import {
  clearErrors,
  loginGoogleInitiate,
  loginInitiate,
} from "../../Redux/Action/ActionAuth";
import { AuthenticationStyle } from "../../Style/AuthenticationStyle/AuthenticationStyle";
import LoadingSmall from "../Loading/LoadingSmall";
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwords = useRef({});
  const reCaptcha = useRef();
  passwords.current = watch("password");
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const { auth, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const Auth = auth;
  const grecaptchaObject = window.grecaptcha;
  const { emailRequire, passwordLoginRequire } = useRequireInput();
  const { handleIsLock, isLock } = useTogglePassword();
  const HandleGoogle = (response) => {
    dispatch(loginGoogleInitiate(response));
  };
  const handleSubmitForm = (data) => {
    if (!token) {
      swal("Mời bạn xác thực đầy đủ 😍", {
        icon: "error",
      });
      return;
    }
    const { email, password } = data;
    dispatch(loginInitiate(email, password));
  };

  useEffect(() => {
    if (auth.status === 200) {
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/";
      }
      localStorage.setItem("firstLogin", true);
    }
    if (auth.success === false) {
      toast.error(`${auth.msg}`);
      dispatch(clearErrors());
    }
  }, [Auth]);
  return (
    <>
      <AuthenticationStyle />
      <MetaData title="Login-Movie" />
      <div className="login">
        <div className="top">
          <div className="wr<a>pper">
            <img className="logo" src={logo} alt="" />
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h1>Sign In</h1>
            <div className="email-input">
              <input
                type="email"
                placeholder="Email or phone number"
                {...register("email", emailRequire)}
                name="email"
              />
            </div>
            <span style={{ color: "red" }}>
              {errors.email?.type === "required" &&
                "Mời bạn nhập Email đầy đủ! "}
              {errors?.email?.type === "pattern" &&
                "Email của ban không hợp lệ!"}
            </span>
            <div className="pwd-input">
              <input
                type={isLock ? "type" : "password"}
                {...register("password", passwordLoginRequire)}
                placeholder="Password"
                name="password"
              />
              {isLock ? (
                <i
                  className="fa fa-eye-slash"
                  onClick={handleIsLock}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <i
                  className="fa fa-eye"
                  onClick={handleIsLock}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>

            <span style={{ color: "red" }}>
              {errors.password?.type === "required" &&
                "Mời bạn nhập đầy đủ mật khẩu! "}
            </span>
            {loading ? (
              <span className="loginButton2">
                <LoadingSmall />
              </span>
            ) : (
              <button className="loginButton">Sign In</button>
            )}
            <div className="help">
              <div className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <a href="/forget">Forgot password?</a>
            </div>
            <footer>
              <GoogleLogin
                clientId="1083950083676-fr9m6jsgig4aalf6mj81t8rlgl9v45bd.apps.googleusercontent.com"
                buttonText="Login Google +"
                onSuccess={HandleGoogle}
                onFailure={HandleGoogle}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <div className="login-google" onClick={renderProps.onClick}>
                    <i className="fab fa-google gg-icon"></i>
                    <a>Login with Google</a>
                  </div>
                )}
              />
              <ReCAPTCHA
                ref={reCaptcha}
                sitekey="6LfVSXwcAAAAAF84Eh53ZDlQX-hyJeh_jrEEY3S5"
                onChange={(token) => setToken(token)}
                onExpired={(e) => setToken("")}
                theme="dark"
                grecaptcha={grecaptchaObject}
                size="normal"
              />
              <br />
              <span className="signup">
                New to Netflix?
                <Link to="/signup">Sign up now</Link>
              </span>
              <span className="learn-more">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
                <a href="https://profile-forme.surge.sh/" target="_blank">
                  Learn more
                </a>
              </span>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
