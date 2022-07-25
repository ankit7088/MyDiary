import React, { useContext, useEffect, useRef,useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/nodeContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(noteContext);
  let history=useHistory();
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else{
      history.push('/login');
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  };
  const handleClick=(e)=>{
    console.log("Updating the Note...",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert("Updated Successfully","success");
}

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h2>Your Notes</h2>
          <div className="container mx-2">
          {notes.length===0 && 'No notes to display'}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
