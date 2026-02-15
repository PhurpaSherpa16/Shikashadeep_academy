import { BrowserRouter } from "react-router-dom"
import MainRoutes from "./routes/MainRoutes"

function App() {
  return (
    <div className="overflow-hidden min-h-screen">
      <BrowserRouter>
        <MainRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
