import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { ContactUs } from "./pages/Contact";
import { About } from "./pages/About";
import { WorkDetails } from "./pages/WorkDetails";
import { Experience } from "./pages/Experience";
import { SocialIcons } from "./components/SocialIcons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";

function AppRoutes() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="s_c">
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={{
            enter: 400,
            exit: 400,
          }}
          classNames="page"
          unmountOnExit
        >
          <Routes location={location}>
            <Route path={t("routes.home")} element={<Home />} />
            <Route path={t("routes.about")} element={<About />} />
            <Route path={t("routes.portfolio")} element={<Portfolio />} />
            <Route path={t("routes.experience")} element={<Experience />} />
            <Route path={t("routes.contact")} element={<ContactUs />} />
            <Route path={t("routes.workDetails")} element={<WorkDetails />} />
            <Route path="*" element={<Navigate to={t("routes.home")} replace />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <SocialIcons />
    </div>
  );
}

export default AppRoutes;
