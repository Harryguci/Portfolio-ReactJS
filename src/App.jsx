import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import RequireAuth from "./components/cms/RequireAuth";
import Home from "./pages/Home";

const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const CmsLoginPage = lazy(() => import("./pages/cms/CmsLoginPage"));
const CmsBlogListPage = lazy(() => import("./pages/cms/CmsBlogListPage"));
const CmsBlogEditorPage = lazy(() => import("./pages/cms/CmsBlogEditorPage"));

function HomePage() {
  return (
    <AppShell>
      <Home />
    </AppShell>
  );
}

function LazyPage({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog"
          element={
            <LazyPage>
              <BlogListPage />
            </LazyPage>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <LazyPage>
              <BlogDetailPage />
            </LazyPage>
          }
        />
        <Route
          path="/cms/login"
          element={
            <LazyPage>
              <CmsLoginPage />
            </LazyPage>
          }
        />
        <Route
          path="/cms/blogs"
          element={
            <LazyPage>
              <RequireAuth>
                <CmsBlogListPage />
              </RequireAuth>
            </LazyPage>
          }
        />
        <Route
          path="/cms/blogs/new"
          element={
            <LazyPage>
              <RequireAuth>
                <CmsBlogEditorPage />
              </RequireAuth>
            </LazyPage>
          }
        />
        <Route
          path="/cms/blogs/:id/edit"
          element={
            <LazyPage>
              <RequireAuth>
                <CmsBlogEditorPage />
              </RequireAuth>
            </LazyPage>
          }
        />
        <Route path="/cms" element={<Navigate to="/cms/blogs" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
