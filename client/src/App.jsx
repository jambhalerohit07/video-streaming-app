import { Suspense } from "react";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
