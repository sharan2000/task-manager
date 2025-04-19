import classes from "./AddTask.module.css"
import { useDispatch, useSelector } from "react-redux"
import { PRIORITY_MAP } from "./Taskitem"
import { useEffect, useReducer, useRef, useState } from "react"
import { tasksActions } from "../store/task"
import { useNavigate, useSearchParams } from "react-router"

const initalFormState = {
  "task_title": "",
  "description": "",
  "category": "",
  "priority": "",
  "due_date": ""
}

const formReducer = (state, action) => {
  if(action.type === "INITIALIZE") {
    let new_state = {...initalFormState}
    for(let [k, v] of Object.entries(action.payload)) {
      new_state[k] = v;
    }
    return new_state
  }
  else if(action.type === "UPDATE") {
    let new_state = {...state}
    for(let [k, v] of Object.entries(action.payload)) {
      new_state[k] = v;
    }
    return new_state
  }
  return initalFormState
}


const AddTask = () => {
  let formRef = useRef();
  let [formState, dispatch] = useReducer(formReducer, initalFormState);
  let [dataLoaded, setDataLoaded] = useState(false)
  let [isNotSubmitted, setIsNotSubmitted] = useState(true)

  let categories = useSelector((store) => {
    return store.categories.categories
  })

  let priority_map_array = Object.entries(PRIORITY_MAP).map(entry => {
    return [+entry[0], entry[1][0]]
  })
  
  let storeDispatch = useDispatch();
  let navigate = useNavigate();
  let [searchParams] = useSearchParams(); 
  let isEdit = searchParams.get("edit")
  let editId = searchParams.get("id")
  let editFormData = useSelector(state => {
    let val = state.tasks.tasks.find(item => item.id === editId)
    return val
  })

  useEffect(() => {
    // if edit is there in params and not found the object then navigate to normal add-task route
    if(isEdit && !editFormData) {
      navigate("/add-task")
    }
    if(isEdit && editId && editFormData) {
      dispatch({
        type: "INITIALIZE",
        payload: editFormData
      })
    }
    
    setDataLoaded(true)
  }, [])


  let formErrors = {
    "task_title": isNotSubmitted || formState.task_title ? null : "task title is invalid",
    "description": isNotSubmitted || formState.description ? null : "description is invalid",
    "category": isNotSubmitted || formState.category ? null : "category is invalid",
    "priority": isNotSubmitted || formState.priority !== "" ? null : "priority is invalid",
    "due_date": isNotSubmitted || formState.due_date ? null : "due date is invalid",
  }


  let submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    
    let taskData = {}
    for (const [key, value] of formData.entries()) {
      taskData[key] = value
    }
    
    dispatch({
      type: "UPDATE",
      payload: taskData
    })
    setIsNotSubmitted(false)

    if(!taskData.task_title || !taskData.description || !taskData.category || !taskData.priority || !taskData.due_date) return


    if(isEdit) {
      taskData.id = editId
      storeDispatch(tasksActions.edit(taskData))
    } else {
      storeDispatch(tasksActions.add(taskData))
    }

    navigate("../tasks")
  }

  if(!dataLoaded) return <h4>Loading ...</h4>

  return (
    <div className={"container mt-2"}>
      <form ref={formRef}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Task Title</label>
          <input name="task_title" type="text" className="form-control" id="taskTitle" defaultValue={formState.task_title}/>
          { formErrors.task_title ? <div className={classes["invalid"]}>{formErrors.task_title}</div> : "" }
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Task Description</label>
          <input name="description" type="text" className="form-control" id="taskDescription" defaultValue={formState.description}/>
          { formErrors.description ? <div className={classes["invalid"]}>{formErrors.description}</div> : "" }
        </div>
        <div className="mb-3">
          <label htmlFor="taskCategory" className="form-label">Select a category</label>
          <select defaultValue={formState.category} name="category" id="taskCategory" className="form-select" aria-label="category select menu" >
            <option value=""></option>
            {categories.map((name) => {
              return <option key={name} value={name}>{name}</option>
            })}
          </select>
          { formErrors.category ? <div className={classes["invalid"]}>{formErrors.category}</div> : "" }
        </div>
        <div className="mb-3">
          <label htmlFor="taskPriority" className="form-label">Select a priority</label>
          <select defaultValue={formState.priority} name="priority" id="taskPriority" className="form-select" aria-label="priority select menu" >
            <option value=""></option>
            {priority_map_array.map((priority_arr) => {
              return <option key={priority_arr[0]} value={priority_arr[0]}>{priority_arr[1]}</option>
            })}
          </select>
          { formErrors.priority ? <div className={classes["invalid"]}>{formErrors.priority}</div> : "" }
        </div>
        <div className="mb-3">
          <label htmlFor="taskDuedate" className="form-label">Select a due date</label>
          <input type="date" className="form-control" id="taskDuedate" name="due_date" defaultValue={formState.due_date}/>
          { formErrors.due_date ? <div className={classes["invalid"]}>{formErrors.due_date}</div> : "" }
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
      </form>
    </div>
  )
}

export default AddTask