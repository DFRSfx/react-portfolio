import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { ContactUs } from "./pages/Contact";
import { About } from "./pages/About";
import { SocialIcons } from "./components/SocialIcons";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="s_c">
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={{
            enter: 400,
            exit: 400,
          }}
          classNames="page"
          unmountOnExit
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <SocialIcons />
    </div>
  );
}

export default AppRoutes;
