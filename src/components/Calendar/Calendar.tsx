// Style
import './Calendar.css'

export default function Calendar() {
    return (
        <div
            className='calendar-container'
        >
            <div
                className='calendar-header'
            >
                <button
                    className="material-symbols-outlined
                               calendar-left-icon"
                >arrow_left</button>
                <div>
                    <span>Month</span>
                    <span>Year</span>
                </div>
                <button>Right</button>
            </div>
        </div>
    )
}