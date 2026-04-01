import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkMode } from "./hooks/useDarkMode";
import { Dashboard } from "./pages/Dashboard";

const queryClient = new QueryClient();

function AppContent() {
  const { dark, toggle } = useDarkMode();
  return <Dashboard dark={dark} onToggleDark={toggle} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <AppContent />
      </div>
    </QueryClientProvider>
  );
}
