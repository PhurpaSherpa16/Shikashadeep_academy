import { BrowserRouter } from "react-router-dom"
import MainRoutes from "@/routes/MainRoutes"
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="overflow-hidden min-h-screen">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainRoutes />
          <Toaster position="bottom-center" />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
