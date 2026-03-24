import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Page = "/" | "/about" | "/services" | "/gallery" | "/contact";

interface RouterContextType {
  page: Page;
  navigate: (to: Page) => void;
}

const RouterContext = createContext<RouterContextType>({
  page: "/",
  navigate: () => {},
});

const VALID_PAGES: Page[] = [
  "/",
  "/about",
  "/services",
  "/gallery",
  "/contact",
];

function readPage(): Page {
  const hash = window.location.hash.replace("#", "") || "/";
  return VALID_PAGES.includes(hash as Page) ? (hash as Page) : "/";
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>(readPage);

  useEffect(() => {
    const handler = () => setPage(readPage());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((to: Page) => {
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <RouterContext.Provider value={{ page, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps {
  to: Page;
  children: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
  onClick?: () => void;
}

export function Link({
  to,
  children,
  className,
  "data-ocid": ocid,
  onClick,
}: LinkProps) {
  const { navigate } = useRouter();
  return (
    <a
      href={`#${to}`}
      data-ocid={ocid}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
