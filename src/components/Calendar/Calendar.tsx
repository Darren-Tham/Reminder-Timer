// React
import { useState } from 'react'

// Style
import './Calendar.css'

export default function Calendar() {
    const [date, setDate] = useState(new Date(Date.now()))

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

    return (
        <div className='calendar-container'>
            <div>
                <button className="material-symbols-outlined">arrow_left</button>
                <div>
                    <span>Month</span>
                    <span>Year</span>
                </div>
                <button className="material-symbols-outlined">arrow_right</button>
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