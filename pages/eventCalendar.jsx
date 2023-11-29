// components/EventCalendar.js
import { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import styles from '../styles/EventCalendar.module.css'


export default function EventCalendar() {
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [events, setEvents] = useState({});
    const [eventDetails, setEventDetails] = useState({
        title: '',
        description: '',
        repeat: false,
        time: '12:00',
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    });

    const openModal = (date) => {
        setDate(date);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const saveEvent = () => {
        setEvents({
            ...events,
            [date.toDateString()]: eventDetails
        });
        closeModal();
    };

    const deleteEvent = () => {
        const newEvents = { ...events };
        delete newEvents[date.toDateString()];
        setEvents(newEvents);
        closeModal();
    };

    return (
        <div>
            <Calendar
            className={styles.calendar}
                onClickDay={openModal}
                tileContent={({ date }) => events[date.toDateString()] && <div>{events[date.toDateString()].title}</div>}
            />
           <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Event Modal"
    className="eventInputModal"
>
    <h2 className="modalTitle">Add Event</h2>

    <div className="inputGroup">
        <label className="inputLabel">Title:</label>
        <input className="inputField" value={eventDetails.title} onChange={e => setEventDetails({ ...eventDetails, title: e.target.value })} />
    </div>

    <div className="inputGroup">
        <label className="inputLabel">Description:</label>
        <textarea className="inputField" value={eventDetails.description} onChange={e => setEventDetails({ ...eventDetails, description: e.target.value })}></textarea>
    </div>

    <div className="checkboxGroup">
        <input type="checkbox" className="checkbox" checked={eventDetails.repeat} onChange={e => setEventDetails({ ...eventDetails, repeat: e.target.checked })} />
        <label className="inputLabel">Repeat</label>
    </div>

    <div className="inputGroup">
        <label className="inputLabel">Time:</label>
        <select className="dropdownSelect" value={eventDetails.time} onChange={e => setEventDetails({ ...eventDetails, time: e.target.value })}>
            {/* Add more options if needed */}
            <option value="00:00">00:00</option>
            <option value="01:00">01:00</option>
            {/* ... */}
            <option value="23:00">23:00</option>
        </select>
    </div>

    {/* Add dropdowns for day, month, and year here with the className "dropdownSelect" on each dropdown */}

    <div className="modalFooter">
        <button className="modalButton deleteButton" onClick={deleteEvent}>Delete</button>
        <button className="modalButton cancelButton" onClick={closeModal}>Cancel</button>
        <button className="modalButton saveButton" onClick={saveEvent}>Save</button>
    </div>
</Modal>
        </div>
    );
}
