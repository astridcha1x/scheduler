// ------ IMPORT / VARIABLES ------ //

import React from "react";

import DayList from "components/DayList";
import Appointment from "components/Appointments";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

// -------------------------------- //

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // HELPER SELECTORS //  

  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {

    const interview = getInterview(state, appt.interview);

    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

