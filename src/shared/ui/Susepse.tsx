import { Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";

type BaseSuspenseProps = {
  fallback: ReactNode;
  children: ReactNode;
  deferMs?: number;
  resetKey?: string | number;
};

const DeferredComponent = ({
  children,
  deferMs = 300,
}: Pick<BaseSuspenseProps, "children" | "deferMs">) => {
  const [isDeferred, setIsDeferred] = useState(!(deferMs && deferMs > 0));

  useEffect(() => {
    if (!deferMs || deferMs <= 0) return;

    const timeout = setTimeout(() => setIsDeferred(true), deferMs);

    return () => clearTimeout(timeout);
  }, [deferMs]);

  if (!isDeferred) return null;

  return <>{children}</>;
};

const BaseSuspense = ({
  fallback,
  children,
  deferMs = 300,
  resetKey,
}: BaseSuspenseProps) => {
  return (
    <Suspense
      key={resetKey}
      fallback={
        <DeferredComponent deferMs={deferMs}>{fallback}</DeferredComponent>
      }
    >
      {children}
    </Suspense>
  );
};

export default BaseSuspense;
