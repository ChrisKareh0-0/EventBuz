import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

let scheduler;

const Scheduler = ({ schedules }) => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [scheduleID, setScheduleID] = useState('');


  const scheduleAPI = () => {
    const axios = require('axios');
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    const Token = localStorage.getItem('access_Token')
    console.log("Event ID in schedule", data)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://eventbuznew.online/api/v1/event-schedule',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+Token,
        
      },
      data : {
        ...data,
        event_id: createEvent_ID
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      toast.success("Schedule for event added successfully")
      console.log("[+ SCHEDULE ID ]", response.data.tid)
    })
    .catch((error) => {
      console.log(error);
      toast.error("Failed to add schedule for the event")
    });
  }

  const deleteScheduleAPI = (event) => {
    console.log("delete api function")
    const axios = require('axios');
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    const Token = localStorage.getItem('access_Token')
    setScheduleID(event.schedule_id)
    console.log("SCHEDULE ID IN DELETE", event.schedule_id)
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `https://eventbuznew.online/api/v1/event-schedule/${createEvent_ID}/${scheduleID}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+Token,
        
      }
    }
      axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      toast.success("Scheduled event deleted successfully")
      
    })
    .catch((error) => {
      console.log(error);
      toast.error("Failed to delete scheduled event")
    });
    
    
  }

  const editScheduleAPi = (event) => {
    const axios = require('axios')
    const createEvent_ID= localStorage.getItem('createEvent_ID')
    setScheduleID(event.schedule_id)
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `https://eventbuznew.online/api/v1/event-schedule/${scheduleID}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer 51|NEv7YHB9Sylk3jwuLbKbzeSbH6KwfcjnmZ3rZw8A410046bf', 
        
      },
      data : {
        ...data,
        event_id: createEvent_ID
      }
    }
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      toast.success("Event schedule edited")
      
    })
    .catch((error) => {
      console.log(error);
      toast.error("Failed to edit schedule event")
    });
  }

  

  const appendEvent = (event) => {
    console.log(event.id)
    if(event && event.start_date && event.end_date && event.text && (typeof event.id === 'number')) {
        const updatedEvent = {...event, schedule_id:scheduleID}
        setData(prevData => [...prevData, updatedEvent]);
        console.log("Data in appendEvent", data)
    } else {
        console.error("Invalid event format");
    }
  };

  const deleteEventById = (eventId) => {
    // console.log("is deleteEvebt by Id function called ")
    // setData(prevData => prevData.filter(event => event.id !== eventId));
    // console.log("DATA in deleteEvent", data)
    console.log("delete is listened")
  };



  useEffect(() => {
    console.log(events)
    console.log("SCHEDULES IN CALENDAR",schedules)
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    async function initScheduler() {
      const Token = localStorage.getItem('access_Token');
      const { default: dhxScheduler } = await import ('dhtmlx-scheduler');
      
      dhxScheduler.init('scheduler_here', new Date(), 'month');
      dhxScheduler.parse(data);
      dhxScheduler.plugins({ recurring: true });
      dhxScheduler.config.load_date = '%Y-%m-%d %H:%i';
      dhxScheduler.setLoadMode('day');
      // dhxScheduler.load('https://eventbuznew.online/api/v1/event-schedule', 'json');

      const dp = dhxScheduler.createDataProcessor({
        // url: 'https://eventbuznew.online/api/v1/event-schedule/',
        // mode: 'GET',
        
      });

      if (Array.isArray(schedules)) {
        dhxScheduler.parse(schedules, "json"); // Ensure the format matches your calendar's expected format
      }

      dp.init(dhxScheduler);
      dp.setTransactionMode({
          
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': "Bearer "+Token
          // },
          // data: {
          //   event_id: createEvent_ID
          // }
      });

      // Attach event listeners
      dhxScheduler.attachEvent("onEventAdded", (_, event) => {
        scheduleAPI();
        appendEvent(event)});
      dhxScheduler.attachEvent("onEventChanged", (id, event) => {
        setEvents(prevEvents => prevEvents.map(e => e.id === id ? event : e));
        
        editScheduleAPi(event)
      });
      dhxScheduler.attachEvent("onEventDeleted", (id) => deleteEventById(Number(id)));
      dhxScheduler.attachEvent("onBeforeEventDelete", function(id,ev){
        deleteScheduleAPI(ev);
        console.log("PLEASE DELETE EVENT!", ev)

        return true; // return false to cancel the deletion
    });
      dhxScheduler.attachEvent("onLoadStart", function() {
        console.log("XLS")
      });
    }

    initScheduler();
    
  }, [data]);

  

  return (
    <div id="scheduler_here" className="dhx_cal_container" style={{ width: '100%', height: '600px',  }}>
      <div className="dhx_cal_navline">
        <div className="dhx_cal_prev_button">&nbsp;</div>
        <div className="dhx_cal_next_button">&nbsp;</div>
        <div className="dhx_cal_today_button"></div>
        <div className="dhx_cal_date"></div>
        <div className="dhx_cal_tab" name="day_tab"></div>
        <div className="dhx_cal_tab" name="week_tab"></div>
        <div className="dhx_cal_tab" name="month_tab"></div>
      </div>
      <div className="dhx_cal_header"></div>
      <div className="dhx_cal_data" style={{marginLeft: 1}}></div>
    </div>
  );
};

export default Scheduler;
