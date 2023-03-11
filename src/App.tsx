// Components
import NewActivity from './components/NewActivity/NewActivity'

// Style
import './App.css'

/**
 * Root file of the application.
 *
 * @returns Application
 */
export default function App() {
    return (
        <>
            <h1>Reminder Timer</h1>
            <NewActivity />
        </>
    )
}