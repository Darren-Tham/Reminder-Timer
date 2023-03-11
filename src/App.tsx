// React
import { useRef } from 'react'

// Components
import NewActivity from './components/NewActivity/NewActivity'
import Calendar from './components/Calendar/Calendar'

// Style
import './App.css'

/**
 * Root file of the application.
 *
 * @returns Application
 */
export default function App() {
    const calendarContainerRef = useRef<HTMLDivElement | null>(null)
    return (
        <>
            <h1>Reminder Timer</h1>
            <NewActivity
                calendarContainerRef={calendarContainerRef}
            />
            <Calendar ref={calendarContainerRef} />
        </>
    )
}