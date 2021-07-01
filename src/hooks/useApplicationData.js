import { useState, useEffect } from "react";
import axios from "axios";



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

  const getSpotsForDay = (dayObj, appointments) => {

    let spots = 0;

    for (const id of dayObj.appointments) {

      const appointment = appointments[id];

      if(!appointment.interview) {
        spots++;
      };

    };

    return spots;

  };

  const updateSpots = (dayName, days, appointments) => {

    const dayObj = days.find(day => day.name === dayName);
    const spots = getSpotsForDay(dayObj, appointments);
    const newDay = {...dayObj, spots};
    const newDays = days.map(day => day.name === dayName ? newDay : day);

    return newDays;

  }

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

          const days = updateSpots(state.day, state.days, appointments);

          setState((state) => {
            return { ...state, appointments, days};
          });
        });

    };
  
  // DELETING APPOINTMENTS //
  
  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let promiseApptID = `/api/appointments/${id}`;

    return axios.delete(promiseApptID, { interview: null })
      .then(() => {

        const days = updateSpots(state.day, state.days, appointments);

        setState((state) => {

          return { ...state, appointments, days };

        });
      })

  };
  
return { state, setDay, bookInterview, cancelInterview };

};