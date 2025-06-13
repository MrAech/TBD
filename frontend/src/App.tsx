import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GameMenu from './routes/Home'
import Test from './routes/Test'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GameMenu />} />
                <Route path="/e1" element={<Test />} />
                <Route path="/e2" element={<Test />} />

                {/* Unknown Redirects/Routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App
