import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAnalyses } from "./hooks/useAnalyses";
import "./App.css";

const queryClient = new QueryClient();

// TODO: Temp Probe - Remove
function DataProbe() {
  const { data, isLoading, error } = useAnalyses();
  if (isLoading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error?.message}</p>;
  return (
    <ul className="p-4 space-y-1">
      {data?.map((a) => (
        <li key={a.id} className="text-gray-900 dark:text-white">
          {a.adTitle} = {a.overallScore}
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <DataProbe />
      </div>
    </QueryClientProvider>
  );
}

export default App;
