import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Portfolio } from "./pages/Portfolio";
import { ContactUs } from "./pages/Contact";
import { SocialIcons } from "./components/SocialIcons";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="s_c">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="contact">
          <ContactUs />
        </section>
        <SocialIcons />
      </div>
    </Router>
  );
}
