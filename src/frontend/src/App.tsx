import { Toaster } from "@/components/ui/sonner";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Services from "./pages/Services";
import { RouterProvider, useRouter } from "./router";

function AppContent() {
  const { page } = useRouter();

  const renderPage = () => {
    switch (page) {
      case "/about":
        return <About />;
      case "/services":
        return <Services />;
      case "/gallery":
        return <Gallery />;
      case "/contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <FloatingButtons />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
