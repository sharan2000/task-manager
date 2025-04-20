import { Link } from "react-router"
import classes from "./Taskitem.module.css"
import { useDispatch } from "react-redux"
import { tasksActions } from "../store/task"

export const PRIORITY_MAP = {
  0: ["low", "info"],
  1: ["medium", "warning"],
  2: ["high", "danger"]
}

const Taskitem = ({id, task_title, description, category, priority, due_date}) => {
  let storeDispatch = useDispatch();

  const onDeleteHandler = () => {
    storeDispatch(tasksActions.delete(id))
  }

  return (
    <div className={classes["card"] + " mb-3"}>
      <div className={classes["card-body"]}>
        <div className={"d-flex flex-column flex-lg-row"}>
          <div className={"row flex-fill"}>
            <div className={"col-sm-5"}>
              <h4 className={"h5"}>{task_title}</h4>
              <span className={"badge bg-secondary"}>{category}</span>&nbsp;
              <span className={`badge bg-${PRIORITY_MAP[priority][1]}`}>{PRIORITY_MAP[priority][0]}</span>&nbsp;
              <span className={"badge bg-success"}>{due_date}</span>
            </div>
            <div className={"col-sm-4 py-2"}>
              <p>{description}</p>
            </div>
            <div className={"col-sm-3 text-lg-end"}>
              <Link to={`/add-task?edit=true&id=${id}`} className={"btn btn-info btn-sm mb-1"} role="button">Edit</Link>
              <button style={{marginLeft: "3px"}} className={"btn btn-danger btn-sm mb-1"} onClick={onDeleteHandler}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taskitem