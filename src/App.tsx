import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import About from "@/pages/About";
import Login from "@/pages/Login";
import CreateArticle from "@/pages/CreateArticle";

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <Router>
          <AppContent />
        </Router>
      </I18nProvider>
    </AuthProvider>
  );
}
