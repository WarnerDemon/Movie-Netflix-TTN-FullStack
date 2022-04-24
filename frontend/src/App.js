import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Category,
  ChangePassword,
  ChangePasswordAdmin,
  Director,
  EditProfile,
  Favourite,
  FeedBack,
  Films,
  Forget,
  ForgetAdmin,
  Loading,
  NewDirector,
  NewFilm,
  NewUser,
  NotFound,
  PrivateRouter,
  PrivateRouterAuth,
  Profile,
  ProfileGate,
  Rating,
  Register,
  Reset,
  ResetAdmin,
} from "./imports/index";
import {
  Admin,
  Home,
  Login,
  LoginAdmin,
  ProfileAdmin,
  Welcome,
} from "./imports/LazyRouter";
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer position="top-center" />
        <Routes>
          {/* ********* User ********* */}
          {/* Login */}
          <Route element={<PrivateRouterAuth />}>
            <Route path="/login" element={<Login />} />
          </Route>
          {/* ResetPassword */}
          <Route element={<PrivateRouterAuth />}>
            <Route path="/customer/password/reset/:token" element={<Reset />} />
          </Route>
          {/* Register */}
          <Route element={<PrivateRouterAuth />}>
            <Route path="/signup" element={<Register />} />
          </Route>
          {/* Forget Password */}
          <Route element={<PrivateRouterAuth />}>
            <Route path="/forget" element={<Forget />} />
          </Route>
          {/* Intro Web  */}
          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Welcome />} />
          </Route>
          {/* Choose Adult  */}
          <Route element={<PrivateRouter />}>
            <Route path="/browse" element={<ProfileGate />} />
          </Route>
          {/* Home   */}
          <Route element={<PrivateRouter />}>
            <Route path="/home" element={<Home />} />
          </Route>
          {/* Profile User   */}
          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Change profile */}
          <Route element={<PrivateRouter />}>
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>
          {/* Change Password  */}
          <Route element={<PrivateRouter />}>
            <Route
              path="/profile/ChangePassword"
              element={<ChangePassword />}
            />
          </Route>
          {/* FeedBack */}
          <Route element={<PrivateRouter />}>
            <Route path="/feedback" element={<FeedBack />} />
          </Route>

          {/* ********* ADMIN ********* */}
          {/* Login Admin */}
          <Route path="/loginadmin" element={<LoginAdmin />} />
          {/* Home Admin */}
          <Route path="/admin" element={<Admin />} />
          {/* Forget Password Admin */}
          <Route path="/forgetadmin" element={<ForgetAdmin />} />
          {/* Profile Admin */}
          <Route path="/profileadmin" element={<ProfileAdmin />} />
          {/* Reset Password Admin */}
          <Route path="/password/reset/:token" element={<ResetAdmin />} />
          {/* Change Password Admin */}
          <Route path="/changepassword/" element={<ChangePasswordAdmin />} />
          {/* Manager Director */}
          <Route path="/director" element={<Director />} />
          {/* Edit Film */}
          <Route path="/newUser/:tokens" element={<NewUser />} />
          {/* Add Director */}
          <Route path="/newDirector" element={<NewDirector />} />
          {/* Manager Category */}
          <Route path="/category" element={<Category />} />
          {/* Manager Film */}
          <Route path="/film" element={<Films />} />
          {/* Add Film */}
          <Route path="/newFilm" element={<NewFilm />} />
          {/* Edit Film */}
          <Route path="/newFilm:tokens" element={<NewFilm />} />
          {/* Rating for Film */}
          <Route path="/rating" element={<Rating />} />
          {/* Favourite */}
          <Route path="/favourite" element={<Favourite />} />
          {/* Shared */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
