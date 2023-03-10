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
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

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

    const { lightColor, darkColor, borderColor } = activityProps
    return (
        <div
            className='new-activity-container'
            style={{
                background: `linear-gradient(to right bottom, ${lightColor} 50%, ${darkColor})`,
                borderColor
            }}
        >
            <textarea
                className='new-activity-title'
                rows={1}
                ref={titleRef}
                onInput={handleInputResize}
                placeholder='Title'
            />
            <hr />
            <textarea
                className='new-activity-desc'
                rows={2}
                ref={descRef}
                onInput={handleInputResize}
                placeholder='Optional description'
            />
            <hr />
            <button
                className="material-symbols-outlined
                           new-activity-calendar-icon"
            >edit_calendar</button>
        </div>
    )
}