import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Welcome to Game Hub</h1>
            <p className="mb-4">This is your base game hub. More features coming soon!</p>
            <Link
                to="/test"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Test Connection
            </Link>
        </div>
    )
}

export default Home;