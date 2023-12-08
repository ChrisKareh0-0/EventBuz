import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import styles from '../styles/homeScreenCalendar.module.css'
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const router = useRouter(); // Initialize useRouter



    const events = [
        {
            title: 'Event 1',
            start: new Date(2023, 11, 18),
            end: new Date(2023, 11, 19),
            image: 'https://via.placeholder.com/150',
            url: '/event1' // URL to redirect to when the event is clicked
        },
        // ... more events with their respective URLs
    ];

    // Custom event renderer
    const CustomEvent = ({ event }) => {
      const dayNumber = event.start.getDate();

        return (
            <div 
                className="customEvent"
                onClick={() => router.push(event.url)} // Navigate to the event's URL on click
            >
                <img width={300} src={event.image} alt={event.title} />

            </div>
        );
    };

    return (
        <div style={{ height: '550px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                components={{
                    event: CustomEvent
                }}
            />
        </div>
    );
};

export default MyCalendar;
