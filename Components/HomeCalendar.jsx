import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import axios from 'axios';
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const router = useRouter(); // Initialize useRouter
    const [events, setEvents] = useState([])
    const [transformedEvents, settransformedEvents] = useState([])
    useEffect(() => {
        getAllEvents();
    },[])

    const getAllEvents = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://stageeventbuz.online/api/v1/events/all',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
                }
            };
    
            axios.request(config)
            .then((response) => {
            console.log(response.data);
            // setEvents(response.data.data)

            settransformedEvents(response.data.data.map(event => {
                const schedule = event.schedules && event.schedules.length > 0 ? event.schedules[0] : null;
                return {
                    title: event.name,
                    start: schedule ? new Date(`${schedule.start_date}T${schedule.start_time}`) : new Date(),
                    end: schedule ? new Date(`${schedule.end_date}T${schedule.end_time}`) : new Date(),
                    image: event.media?.event_main_photo?.url || 'https://via.placeholder.com/150',
                    id: event.id,
                    url: `/event/${event.id}` // Modify as per your URL structure
                };
            }));
            })
            .catch((error) => {
            console.log(error);
            });
    }


    // Custom event renderer
    const CustomEvent = ({ event }) => {
      const dayNumber = event.start.getDate();

        return (
            <div 
                className="customEvent"
                onClick={() => router.push({
                    pathname: '/userProfile',
                    query: {
                        eventPage: true,
                        idEvent: event.id
                    }
                })} // Navigate to the event's URL on click
            >
                <img width={300} src={event.image} alt={event.title} />

            </div>
        );
    };

    return (
        <div style={{ height: '550px' }}>
            <Calendar
                localizer={localizer}
                events={transformedEvents}
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
