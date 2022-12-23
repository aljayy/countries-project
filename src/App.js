import { useContext } from "react";
import ThemeContext from "./context/theme-context";
import classes from "./App.module.scss";
import Header from "./components/Header";
import CountryFilters from "./components/CountryFilters/CountryFilters";

function App() {
  const { theme } = useContext(ThemeContext);

  const themeClasses = theme === "light" ? classes.light : classes.dark;

  console.log(themeClasses);

  return (
    <div className={themeClasses}>
      <Header />
      <CountryFilters />
    </div>
  );
}

export default App;
