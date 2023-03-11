// React
import { useState, useEffect, useRef, useReducer } from 'react'

// Components
import Calendar from '../Calendar/Calendar'

// Helper
import Activity from '../../helper/ActivityEnum'
import getElem from '../../helper/getElemFromRef'

// Style
import './NewActivity.css'

interface ActivityProps {
    activity: Activity
    lightColor: string
    darkColor: string
    borderColor: string
}

const taskProps: ActivityProps = {
    activity: Activity.TASK,
    lightColor: '#2a88fa',
    darkColor: '#167bf5',
    borderColor: '#1176f0'
}

/**
 * An object that keeps track of the state of the Date.
 */
export interface State {
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
export type Action = { type: 'next' | 'back' | 'current' }

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
 * React component that creates
 * a new activity for the list.
 *
 * @returns NewActivity component
 */
export default function NewAcitivty() {

    const [activityProps, setActivityProps] = useState(taskProps)
    const [date, setDate] = useState(new Date(Date.now()))
    const [state, dispatch] = useReducer(reducer, { date: new Date(Date.now()) })
    const [toggleCalendar, setToggleCalendar] = useState(false)

    /**
     * Used to set the positioning of the Calendar popup.
     */
    const newActivityContainerRef = useRef<HTMLDivElement>(null)

    /**
     * Used to set the display of the Calendar popup.
     */
    const calendarContainerRef = useRef<HTMLDivElement | null>(null)

    /**
     * Adds an event listener to the window object
     * that allows the user to click outside the
     * calendar to close it.
     */
    useEffect(() => {
        function hideCalendar(e: MouseEvent) {
            const calendarContainerElem = getElem(calendarContainerRef)
            if (toggleCalendar && !calendarContainerElem.contains(e.target as Node)) {
                toggleOff(calendarContainerElem)
                setToggleCalendar(currToggleCalendar => !currToggleCalendar)
            }
        }
        window.addEventListener('click', hideCalendar)
        return () => { window.removeEventListener('click', hideCalendar) }
    }, [toggleCalendar])

    const { lightColor, darkColor, borderColor } = activityProps

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

    /**
     * Resizes the textarea when a newline is added.
     *
     * @param e textarea event
     */
    function handleInputResize(e: React.FormEvent<HTMLTextAreaElement>) {
        const textarea = e.currentTarget
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    /**
     * Toggles the Calendar popup whenever
     * the Calendar icon is clicked.
     *
     * @param e mouse event
     */
    function handleCalendarClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        const calendarContainerElem = getElem(calendarContainerRef)

        if (toggleCalendar) {
            toggleOff(calendarContainerElem)
        } else {
            const newActivityContainerElem = getElem(newActivityContainerRef)
            const newActivityContainerRect = newActivityContainerElem.getBoundingClientRect()
            const { top, left, height } = newActivityContainerRect

            calendarContainerElem.style.top = `${top + height}px`
            calendarContainerElem.style.left = `${left}px`
            calendarContainerElem.style.display = 'block'
        }

        setToggleCalendar(currToggleCalendar => !currToggleCalendar)
    }

    function toggleOff(calendarContainerElem: HTMLDivElement) {
        calendarContainerElem.style.removeProperty('display')
        dispatch({ type: 'current' })
    }

    return (
        <>
            <div
                className='new-activity-container'
                ref={newActivityContainerRef}
                style={{
                    background: `linear-gradient(to right bottom, ${lightColor} 50%, ${darkColor})`,
                    borderColor
                }}
            >
                <textarea
                    rows={1}
                    onInput={handleInputResize}
                    placeholder='Title'
                />
                <hr />
                <textarea
                    rows={2}
                    onInput={handleInputResize}
                    placeholder='Optional description'
                />
                <hr />
                <div>
                    <button
                        className='material-symbols-outlined'
                        onClick={handleCalendarClick}
                    >edit_calendar</button>
                    <span>{formattedDate}</span>
                </div>
            </div>
            <Calendar
                state={state}
                dispatch={dispatch}
                ref={calendarContainerRef}
            />
        </>
    )
}