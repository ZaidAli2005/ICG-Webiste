import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const Faculty = lazy(() => import("@/pages/Faculty"));
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Departments = lazy(() => import("@/pages/Departments"));
const Programs = lazy(() => import("@/pages/Programs"));
const Admissions = lazy(() => import("@/pages/Admissions"));
const CampusLife = lazy(() => import("@/pages/CampusLife"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-brand-900/12 border-t-brand-700"
        role="status"
        aria-label="Loading page"
      />
    </div>
  );
}

export default function App() {
  return (
    // basename must match Vite's `base`, otherwise routing breaks when the
    // app is served from a subpath such as GitHub Pages' /<repo>/.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="departments" element={<Departments />} />
            <Route path="programs" element={<Programs />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="campus-life" element={<CampusLife />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}