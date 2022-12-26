import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ThemeContext from "./context/theme-context";
import classes from "./App.module.scss";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  const { theme } = useContext(ThemeContext);
  const themeClasses = theme === "light" ? classes.light : classes.dark;

  return (
    <div className={themeClasses}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
