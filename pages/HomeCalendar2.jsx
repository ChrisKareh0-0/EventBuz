
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/homeScreenCalendar.module.css'

const HomeCalendar2 = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from API or any other data source
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleDateClick = (arg) => {
        // Handle date click event
        console.log('Date clicked:', arg.date);
    };

    const eventRender = (info) => {
        // Render custom content in day cell
        const { event, el } = info;
        const image = event.extendedProps.image;

        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            el.querySelector('.fc-daygrid-day-events').appendChild(imgElement);
        }
    };

    return (
        <div>
            <h1>Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                eventRender={eventRender}
            />
        </div>
    );
};

export default HomeCalendar2;
