import { Suspense } from "react";

export default function LazyWrapper({ children }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
