import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Verification } from './pages/Verification';
import { About } from './pages/About';
import { CoverLetter } from './pages/CoverLetter';
import { Certifications } from './pages/Certifications';
import { NotFound } from './pages/NotFound';

/** Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/** Fade transition wrapper — re-mounts on route change */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div
      key={location.key}
      style={{
        animation: 'pageFadeIn 0.2s ease forwards',
      }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/about" element={<About />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
