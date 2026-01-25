import { Button } from "@/components/ui/button"
import { BrowserRouter } from "react-router-dom"
import PublicRoutes from "./routes/PublicRoutes"
import { useEffect } from "react"

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
