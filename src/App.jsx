import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import RequireAuth from "./components/cms/RequireAuth";
import Home from "./pages/Home";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CmsLoginPage from "./pages/cms/CmsLoginPage";
import CmsBlogListPage from "./pages/cms/CmsBlogListPage";
import CmsBlogEditorPage from "./pages/cms/CmsBlogEditorPage";

function HomePage() {
  return (
    <AppShell>
      <Home />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/cms/login" element={<CmsLoginPage />} />
        <Route
          path="/cms/blogs"
          element={
            <RequireAuth>
              <CmsBlogListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cms/blogs/new"
          element={
            <RequireAuth>
              <CmsBlogEditorPage />
            </RequireAuth>
          }
        />
        <Route
          path="/cms/blogs/:id/edit"
          element={
            <RequireAuth>
              <CmsBlogEditorPage />
            </RequireAuth>
          }
        />
        <Route path="/cms" element={<Navigate to="/cms/blogs" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
