import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import FolderPage from "./pages/FolderPage"

const App = () => {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/folder/:id' element={<FolderPage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App