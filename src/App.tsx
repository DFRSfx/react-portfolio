import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AppRoutes from "./Routes";
import IntroScreen from "./components/IntroScreen";

export default function App() {
  return (
    <Router>
      <IntroScreen />
      <Header />
      <AppRoutes />
    </Router>
  );
}
