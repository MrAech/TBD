import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GameMenu from './routes/Home'
import Test from './routes/Test'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GameMenu />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    )
}

export default App
