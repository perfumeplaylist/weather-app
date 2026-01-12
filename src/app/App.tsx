import { Toaster } from "sonner";
import { QueryProvider } from "./provider/queryProvider";
import { RoutesProvider } from "./provider/routes";

function App() {
  return (
    <QueryProvider>
      <RoutesProvider />
      <Toaster position="top-center" richColors />
    </QueryProvider>
  );
}

export default App;
