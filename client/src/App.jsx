import { Suspense } from "react";
import AppRoutes from "./routes/routes";
import Loader from "./components/loader/Loader";

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  );
}

export default App;
