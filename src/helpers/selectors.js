export const getAppointmentsForDay = (state, day) => {

  // FIND CURRENT DAY
  const currentDay = state.days.find(dayObj => day === dayObj.name);

  const currentAppts = currentDay ? currentDay.appointments : [];

  return currentAppts.map(id => state.appointments[id]);

};



export const getInterview = (state, interview) => {

  if (interview === null) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID];

  return { ...interview, interviewer };

};



export const getInterviewersForDay = (state, day) => {

  // FIND CURRENT DAY
  const currentDay = state.days.find(dayObj => day === dayObj.name);

  if (state.days.length === 0 || !currentDay) {
    return [];
  }

  if (!currentDay.interviewers) {
    return [];
  }

  return currentDay.interviewers.map(id => state.interviewers[id]);

};
