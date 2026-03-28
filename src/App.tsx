import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from "./components/ui/Layout";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const ManageCards = lazy(() => import("./pages/ManageCards").then(m => ({ default: m.ManageCards })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
    <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
    <p className="text-slate-500 font-medium animate-pulse">Loading experience...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage" element={<ManageCards />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
