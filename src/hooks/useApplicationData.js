// ------ IMPORT / VARIABLES ------ //

import { useState, useEffect } from "react";
import axios from "axios";

// -------------------------------- //

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const daysPromise = "/api/days";
    const apptsPromise = "/api/appointments";
    const promiseInterviewers = "/api/interviewers";
    Promise.all([
      axios.get(daysPromise),
      axios.get(apptsPromise),
      axios.get(promiseInterviewers)
    ])
    .then((all) => {
      setState(prev => (
        {...prev,
        days: all[0].data,
        appointments: all[1].data,
      interviewers: all[2].data}));
      })
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day}));

    // CREATING APPOINTMENTS //

    function bookInterview(id, interview) {
  
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      let promiseApptID = `/api/appointments/${id}`;
  
      return axios.put(promiseApptID, {interview})
        .then(() => {
          setState((state) => {

            const days = state.days.map((day) => {
  
              if (state.day === day.name) {
                day.spots = day.spots - 1;
              }

              return day;

            });

        return { ...state, appointments, days: days};

        });
    });

  };
  
  // DELETING APPOINTMENTS //
  
    function cancelInterview(id, interview) {
  
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      let promiseApptID = `/api/appointments/${id}`;
  
      return axios.delete(promiseApptID, {interview})
        .then(() => {
          setState((state) => {

            const days = state.days.map((day) => {
  
              if (state.day === day.name) {
                day.spots = day.spots + 1;
              }

              return day;

            });
  
            return { ...state, appointments, days: days}
            
        });
      });
  
  };
  
return { state, setDay, bookInterview, cancelInterview };

};