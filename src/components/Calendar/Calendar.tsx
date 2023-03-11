// React
import { useReducer, forwardRef } from 'react'

// Style
import './Calendar.css'

/**
 * An object that keeps track of the state of the Date.
 */
interface State {
    date: Date
}

/**
 * Types of action to perform on the Date.
 *
 * next - set date to the next month.
 *
 * back - set date to the previous month.
 *
 * current - set date to the current date.
 */
type Action = { type: 'next' | 'back' | 'current' }

/**
 * Reducer function for useReducer to change
 * the Date in the Calendar component.
 *
 * @param state current Date
 * @param action type of action to perform on the Date
 * @returns a new Date
 * @throws an Error for unsupported action types
 */
function reducer(state: State, action: Action): State {
    const currDateObj = state.date
    const currYear = currDateObj.getFullYear()
    const currMonth = currDateObj.getMonth()
    const currDate = currDateObj.getDate()
    switch (action.type) {
        case 'next': return { date: new Date(currYear, currMonth + 1, currDate) }
        case 'back': return { date: new Date(currYear, currMonth - 1, currDate )}
        case 'current': return { date: new Date(Date.now()) }
        default: throw Error('Unsupported Action')
    }
}

/**
 * React component for
 * the calendar popup.
 *
 * The component forwards the calendar container to the
 * parent component to be used in the NewActivity component.
 *
 * @param props Calendar props
 * @param ref ref object passed by the parent
 * @returns Calendar component
 */
export default forwardRef(function Calendar(_, ref: React.ForwardedRef<HTMLDivElement>) {
    const [state, dispatch] = useReducer(reducer, { date: new Date(Date.now()) })
    const { date } = state
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        year: 'numeric'
    }
    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date)
    const currMonth = parts[0].value
    const currYear = parts[2].value

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
                {days.map((day, i) => (
                    <th
                        key={day}
                    >{day}</th>
                ))}
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
                            className={dateEquals(temp, date) ? 'calendar-curr-date' : ''}
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

    return (
        <div
            className='calendar-container'
            ref={ref}
        >
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
})

/**
 * Returns true if two dates are equal.
 *
 * More specifically, returns true if two
 * dates have the same year, month, and date.
 *
 * @param date1 first Date object to compare
 * @param date2 second Date object to compare
 * @returns a boolean value indicating whether
 *          the two Date objects are equal
 */
function dateEquals(date1: Date, date2: Date) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}