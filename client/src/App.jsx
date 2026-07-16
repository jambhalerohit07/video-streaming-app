import { Suspense } from "react";
import AppRoutes from "./routes/routes";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        {" "}
        <AppRoutes />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
