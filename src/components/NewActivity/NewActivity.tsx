// React
import { useState, useRef } from 'react'

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
 * React component that creates
 * a new activity for the list.
 *
 * @returns NewActivity component
 */
export default function NewAcitivty() {
    const [activityProps, setActivityProps] = useState(taskProps)
    const [date, setDate] = useState(new Date(Date.now()))
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

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

    return (
        <div
            className='new-activity-container'
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
                <button className='material-symbols-outlined'>edit_calendar</button>
                <span>{formattedDate}</span>
            </div>
        </div>
    )
}