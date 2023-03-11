// React
import { useState, useEffect, useRef } from 'react'

// Helper
import Activity from '../../helper/ActivityEnum'

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
 * Props passed to the NewActivity component.
 */
interface Props {
    calendarContainerRef: React.MutableRefObject<HTMLDivElement | null>
}

/**
 * React component that creates
 * a new activity for the list.
 *
 * @returns NewActivity component
 */
export default function NewAcitivty({ calendarContainerRef }: Props) {

    const [activityProps, setActivityProps] = useState(taskProps)
    const [date, setDate] = useState(new Date(Date.now()))
    const [toggleCalendar, setToggleCalendar] = useState(false)

    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const newActivityContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function hideCalendar(e: MouseEvent) {
            if (e.target === calendarContainerElem) calendarContainerElem.style.removeProperty('display')
        }
        window.addEventListener('click', hideCalendar)
        return () => { window.removeEventListener('click', hideCalendar) }
    }, [])

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

    function handleCalendarClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (calendarContainerRef.current === null) throw Error('calendarContainerRef is null')
        const calendarContainerElem = calendarContainerRef.current

        if (toggleCalendar) {
            calendarContainerElem.style.removeProperty('display')
        } else {
            if (newActivityContainerRef.current === null) throw Error('newActivityContainerRef is null')

            const newActivityContainerElem = newActivityContainerRef.current
            const newActivityContainerRect = newActivityContainerElem.getBoundingClientRect()
            const { top, left, height } = newActivityContainerRect

            calendarContainerElem.style.top = `${top + height}px`
            calendarContainerElem.style.left = `${left}px`
            calendarContainerElem.style.display = 'block'
        }

        setToggleCalendar(currToggleCalendar => !currToggleCalendar)
    }

    return (
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
                ref={titleRef}
                onInput={handleInputResize}
                placeholder='Title'
            />
            <hr />
            <textarea
                rows={2}
                ref={descRef}
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
    )
}