import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./material-ui-theme/theme";
import Navigation from "./components/Navigation/Navigation";
import { Suspense, lazy } from "react";
import { MainContent } from "./styles/App.styles";
import InstallPrompt from "./components/InstallPWA/InstallPrompts";

const Map = lazy(() => import("./pages/Map/Map"));
const Resolved = lazy(() => import("./pages/Resolved/Resolved"));
const Profile = lazy(() => import("./pages/Settings/Profile"));

const Layout = () => (
  <>
    <Navigation />
    <MainContent>
      <Outlet />
    </MainContent>
  </>
);

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <InstallPrompt />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Root ("/") now loads Resolved page */}
            <Route index element={<Resolved />} />
            <Route path="map" element={<Map />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* Redirect unknown URLs back to "/" */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
