import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import Home from "./routes";
import AccountIndex from "./routes/account";
import UpdateEmail from "./routes/account/update-email";
import SignIn from "./routes/auth/signin";
import VerifyToken from "./routes/auth/verify-token";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account/*">
          <Route index element={<AccountIndex />}></Route>
          <Route path="update-email" element={<UpdateEmail />}></Route>
        </Route>
      </Route>
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="verify-token" element={<VerifyToken />}></Route>
        <Route path="*" element={<Navigate to="signin" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
