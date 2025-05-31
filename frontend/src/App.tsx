import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Test from './routes/Test'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    )
}

export default App
