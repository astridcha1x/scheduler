// ------ IMPORT / VARIABLES ------ //

import React from "react";

import Confirm from "components/Appointments/confirm";
import Empty from "components/Appointments/empty";
import Error from "components/Appointments/error";
import Form from "components/Appointments/form";
import Header from "components/Appointments/header";
import Show from "components/Appointments/show";
import Status from "components/Appointments/status";

import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointments/styles.scss";

// -------------------------------- //

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";  
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVE_ERROR = "SAVE_ERROR";
  const DELETE_ERROR = "DELETE_ERROR";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // --------------------- //

  function save(name, interviewer) {

    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      transition(SAVE_ERROR, true)
    });

  };

// --------------------- //

function deleteInterview() {

  transition(DELETE);

  props.cancelInterview(props.id)
  .then(() => {
    transition(EMPTY);
  })
  .catch((error) => {
    transition(DELETE_ERROR, true)
  });

};


// --------------------- //

  return (
    <article className="appointment">
      <Header time={props.time} />
        {
      mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />)
      }
      {mode === CREATE &&
        (<Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save} 
        />)
      }
      {mode === SAVING &&
        (<Status message="Saving" />)
      }
      {mode === DELETING &&
        (<Status message="Deleting" />)
      }
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete your appointment?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
        )
      }
      {mode === EDIT &&
        (transition(CREATE))
        (<Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        />)
      }
      {mode === SAVE_ERROR && (
        <Error
        message="Your appointment could not be saved!"
        onClose={() => transition(EMPTY)}
        />)
      }
      {mode === DELETE_ERROR && (
        <Error
        message="Your appointment could not be deleted!"
        onClose={() => transition(SHOW)}
        />
        )
      }
    </article>
  );

};