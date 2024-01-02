import { QueryCache, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  },

});


export { queryClient };
