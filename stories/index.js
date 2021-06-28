// -------------------------------- //

import React from "react";
import { Fragment } from "react";

import "index.scss";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointments/index";
import Header from "components/Appointments/header";
import Empty from "components/Appointments/empty";
import Show from "components/Appointments/show";
import Confirm from "components/Appointments/confirm";
import Error from "components/Appointments/error";
import Status from "components/Appointments/status";

// -------------------------------- //

// BUTTON STORIES //

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

// DAY LIST ITEM STORIES //

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={4} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => <DayListItem name="Friday" setDay={action("setDay")} spots={3} />)

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 0,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 1,
//   },
//   {
//     id: 4,
//     name: "Thursday",
//     spots: 1,
//   },
// ];

// DAY LIST STORIES //

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

// INTERVIEWER LIST ITEM STORIES //

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));

// INTERVIEWER LIST STORIES //

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));

// APPOINTMENT STORIES //

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Header", () => <Header time="12pm" />)

  .add("Appointment", () => <Appointment />)

  .add("Appointment with Time", () => (
    <Appointment time="12pm" />
  )

  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment className=":last-of-type" id="last" time="1pm" />
    </Fragment>
  ))

  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment className=":last-of-type" id="last" time="1pm" />
    </Fragment>
  ))

// EMPTY STORIES //

  .add("Add an Appointment", () => (
    <Empty onAdd={action("onAdd")} />
  ))

// SHOW STORIES //
  .add("Student", () => (
    <Show student={"Lydie Miller-Jones"}
      interviewer={interviewers}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))

// CONFIRM STORIES //
  .add("Confirm an appointment", () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))

// ERROR STORIES //
  .add("Show status", () => (
  <Status message="Deleting" />
  ))

// STATUS STORIES //
  .add("Error message", () => (
    <Error
      message="Could not delete appointment"
      onClose={action("onClose")}
    />
  ))

// FORM STORIES //
  .add("Edit", () => (
    <Form
      name=""
      interviewers={interviewers}
      interviewer={3}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ))

  .add("Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ))
);