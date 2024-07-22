import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./router/Router";
import defaultOptions from "./configs/reactQueryConfig";
import Layouts from "./layouts/Layouts";
import { Toaster } from "react-hot-toast";

function App(): JSX.Element {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Layouts>
          <Router />
          <Toaster />
        </Layouts>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
