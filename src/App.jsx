import { Button } from "@/components/ui/button"
import { BrowserRouter } from "react-router-dom"
import PublicRoutes from "./routes/PublicRoutes"

function App() {
  return (
    <div className="overflow-hidden min-h-screen">
      <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
    </div>
  )
}

export default App
