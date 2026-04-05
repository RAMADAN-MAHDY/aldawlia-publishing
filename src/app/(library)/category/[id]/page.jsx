import { Suspense } from "react";
import CategoryProducts from "./categorybooks";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CategoryProducts />
    </Suspense>
  );
}