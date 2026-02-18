import { BrowserRouter } from "react-router-dom"
import MainRoutes from "@/routes/MainRoutes"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="overflow-hidden min-h-screen">
      <BrowserRouter>
        <MainRoutes />
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </div>
  )
}

export default App
