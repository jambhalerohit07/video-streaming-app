import { Suspense } from "react";
import Loader from "../components/loader/Loader";

export default function LazyWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
