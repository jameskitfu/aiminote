import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/contexts/I18nContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Router>
        <AppContent />
      </Router>
    </I18nProvider>
  );
}
