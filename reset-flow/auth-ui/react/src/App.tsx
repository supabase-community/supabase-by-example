import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import Home from "./routes";
import AccountIndex from "./routes/account";
import UpdateEmail from "./routes/account/update-email";
import UpdatePassword from "./routes/account/update-password";
import ForgotPassword from "./routes/auth/forgotpassword";
import SignIn from "./routes/auth/signin";
import SignUp from "./routes/auth/signup";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account/*">
          <Route index element={<AccountIndex />}></Route>
          <Route path="update-email" element={<UpdateEmail />}></Route>
          <Route path="update-password" element={<UpdatePassword />}></Route>
        </Route>
      </Route>
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="*" element={<Navigate to="signin" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
