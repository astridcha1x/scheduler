export const getAppointmentsForDay = (state, day) => {

  // FIND CURRENT DAY //
  const currentDay = state.days.find(dayObj => day === dayObj.name);

  // GET APPT ID FROM THE DAY //
  const currentAppts = currentDay ? currentDay.appointments : [];

  // EMPTY ARRAY FOR BOOKED APPTS //
  const parsedAppts = [];

  currentAppts.map(id =>
    parsedAppts.push(state.appointments[id])
  )

  return parsedAppts;

};

// --------------------- //

export const getInterview = (state, interview) => {

  if (interview === null) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];

  return {...interview, interviewer};

};

// --------------------- //

export const getInterviewersForDay = (state, day) => {

  // FIND CURRENT DAY //
  const currentDay = state.days.find(dayObj => day === dayObj.name);

  // GET APPT ID FROM THE DAY //
  const currentInterviewers = currentDay ? currentDay.interviewers : [];

  // EMPTY ARRAY FOR BOOKED APPTS //
  const parsedInterviewers = [];

  for (const id of currentInterviewers) {

    currentInterviewers.map(id =>
      parsedInterviewers.push(state.interviewers[id])
    )

    return parsedInterviewers;

  }

};
