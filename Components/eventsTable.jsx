// EventTable.js (create a new file for this component in your components directory)
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EventTable = ({events}) => {
// const [events, setEvents] = useState([])

  console.log("Events inside the component",  events)
  const router = useRouter()

  // Check if the events prop is an array before rendering
  if (!Array.isArray(events)) {
    console.error('The events prop is not an array.', events);
    return <p>Error: The provided events data is not valid.</p>;
  }

  const styles = {
    
    table: {
      width: '100%',
      height: '300px',
      borderCollapse: 'collapse',
      color: 'white', // Set the text color for all table data to white
      marginTop: '50px', 
      marginLeft: '30px'
    },
    th: {
      backgroundColor: '#B62872', // Updated to the new color
      padding: '8px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
    },
    td: {
      padding: '8px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#1B1C1F',
      color: '#FFF',
    },
    image: {
      width: '100px',
    },
    noImageText: {
      fontStyle: 'italic',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      fontSize: '0.9em',
    },
    tableContainer: {
      // boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      borderRadius: '5px',
      overflow: 'hidden',
      marginTop: '100px',
      width: '70%'
    },
    editButton: {
      padding: '6px 15px',
      backgroundColor: '#4CAF50', // Example green color
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9em',
    },
    editIcon: {
      cursor: 'pointer',
      color: 'white',
      marginLeft: '10px'
      // Add any other styles you want for the icon here
    },
  }
  const handleEdit = (eventID) => {
    
    router.push(`/editEvent?eventID=${eventID}`)
  }
    
  
    return (
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Contact Phone Number</th>
              <th style={styles.th}>Main Photo</th>
              {/* <th style={styles.th}>Country</th>
              <th style={styles.th}>City</th> */}
              <th style={styles.th}>Schedules</th>
              <th style={styles.th}>Status</th> {/* New header for status */}
              <th style={styles.th}>Edit</th> {/* New header for edit action */}



            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={styles.td}><a>{event.id}</a></td>
                <td style={styles.td}><a>{event.name}</a></td>
                <td style={styles.td}><a>{event.contact_phone_number || 'N/A'}</a></td>
                <td style={styles.td}>
                  {event.media && event.media.event_main_photo ? (
                    <img
                      src={event.media.event_main_photo.url}
                      alt={event.name}
                      style={styles.image}
                    />
                  ) : (
                    <span style={styles.noImageText}>No image</span>
                  )}
                </td>
                {/* <td style={styles.td}>{event.venue_location ? event.venue_location.country : 'N/A'}</td>
                <td style={styles.td}>{event.venue_location ? event.venue_location.city : 'N/A'}</td> */}
                <td style={styles.td}>
                  {event.schedules.length > 0 ? (
                    <>
                      {`Start: ${event.schedules[0].start_date} ${event.schedules[0].start_time}`}
                      <br />
                      {`End: ${event.schedules[event.schedules.length - 1].end_date} ${event.schedules[event.schedules.length - 1].end_time}`}
                    </>
                  ) : (
                    'No schedules'
                  )}
                </td>
                <td style={styles.td}>
                  {event.status ? event.status.name : 'Unknown'} {/* Displaying the status name */}
                </td>
                <td style={styles.td}>
                <FontAwesomeIcon 
                  icon={faEdit} 
                  style={styles.editIcon}
                  onClick={() => handleEdit(event.id)}
                />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
  );
};

export default EventTable;
