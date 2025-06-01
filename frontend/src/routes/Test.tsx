import {useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'

const Test = () => {
    const [message, setMessage] = useState('')
    const [error,setError] = useState('')

    const testConnection = async () => {
        try{
            setError('')
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/test`)
            setMessage(response.data.message)
        }catch (err){
            setError('Failed Cause Happy is not happy :(')
            console.error('Error connecting to backend:', err)
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Test Connection</h1>
            <button
                onClick={testConnection}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            >
                Test Backend Connection
            </button>

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Link
                to="/"
                className="text-blue-500 hover:underline"
            >
                Back to Home
            </Link>
        </div>
    )
}


export default Test