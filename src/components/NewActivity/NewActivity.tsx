// React
import { useRef } from 'react'

// Style
import './NewActivity.css'

/**
 * React component that creates a new activity
 * for the list.
 *
 * @returns NewActivity component
 */
export default function NewAcitivty() {
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

    return (
        <div
            className='new-activity-wrapper'
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
                rows={3}
                ref={descRef}
                onInput={handleInputResize}
                placeholder='Optional description'
            />
        </div>
    )
}