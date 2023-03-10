// React
import { useState, useReducer } from 'react'

// Style
import './Calendar.css'

interface State {
    date: Date
}

type Action = { type: 'next' | 'back' }

/**
 * ADD COMMENT
 * @param state
 * @param action
 * @returns
 */
function reducer(state: State, action: Action): State {
    const newDate = new Date(state.date)
    switch (action.type) {
        case 'next':
            newDate.setMonth(newDate.getMonth() + 1)
            break
        case 'back':
            newDate.setMonth(newDate.getMonth() - 1)
            break
        default:
            throw 'Unsupported Action'
    }
    return { date: newDate }
}

/**
 * React component for
 * the calendar popup.
 *
 * @returns Calendar component
 */
export default function Calendar() {
    // const [date, setDate] = useState(new Date(Date.now()))
    const [state, dispatch] = useReducer(reducer, { date: new Date(Date.now()) })
    const { date } = state

    /**
     * Renders the 7 days of the week.
     *
     * @returns table row element with 7 table header cell
     *          elements representing the days of the week
     */
    function renderDays() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return (
            <tr>
                {days.map(day => <th key={day}>{day}</th>)}
            </tr>
        )
    }

    /**
     * Renders the dates of the month, including
     * the previous and next months.
     *
     * @returns 6 table row elements with each having 7
     *          table data cell elements representing dates
     */
    function renderDates() {
        const temp = new Date(date)
        const currMonth = temp.getMonth()
        temp.setDate(1) // Find the first day of the month
        if (temp.getDay() !== 0) temp.setDate(1 - temp.getDay()) // Add date of previous months
        return new Array(6).fill(undefined).map((_, i) => (
            <tr key={`${i + 1}-row`}>
                {new Array(7).fill(undefined).map(() => {
                    const td = (
                        <td
                            key={`${temp.getMonth()}-${temp.getDate()}`}
                            // Dim dates on previous and next months
                            style={temp.getMonth() == currMonth ? undefined : { opacity: 0.5 }}
                        >{temp.getDate()}</td>
                    )
                    temp.setDate(temp.getDate() + 1)
                    return td
                })}
            </tr>
        ))
    }

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        year: 'numeric'
    }
    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date)
    const currMonth = parts[0].value
    const currYear = parts[2].value

    return (
        <div className='calendar-container'>
            <div>
                <button
                    className='material-symbols-outlined'
                    onClick={() => dispatch({ type: 'back' })}
                >arrow_left</button>
                <div>
                    <span>{currMonth}</span>
                    <span>{currYear}</span>
                </div>
                <button
                    className='material-symbols-outlined'
                    onClick={() => dispatch({ type: 'next' })}
                >arrow_right</button>
            </div>
            <table>
                <thead>
                    {renderDays()}
                </thead>
                <tbody>
                    {renderDates()}
                </tbody>
            </table>
        </div>
    )
}