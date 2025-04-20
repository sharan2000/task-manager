import { useSelector } from "react-redux";
import Taskitem from "./Taskitem";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import PaginationBar from "./PaginationBar";

const PAGE_LIMIT = 10

const SORT_OPTIONS = [
  "created : oldest to newest",
  "priority : low to high", // id is its index position
  "priority : high to low",
  "due date : low to high",
  "due date : high to low",
]

const Tasks = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  let page = +(searchParams.get("page") || 1)
  let sortOption = +(searchParams.get("sort") || 1)
  let querPageInvalid = false
  let querySortInvalid = false

  if(sortOption < 1 || SORT_OPTIONS.length < sortOption) {
    sortOption = 1
    querySortInvalid = true
  }

  let orgTasks = useSelector(store => store.tasks.tasks)
  // sorting tasks
  let tasks = [...orgTasks]
  tasks.sort((it1, it2) => {
    let v1, v2
    if(sortOption === 1) {
      return 0;
    }
    if(sortOption === 2) {
      v1 = it1.priority
      v2 = it2.priority
    }
    if(sortOption === 3) {
      v2 = it1.priority
      v1 = it2.priority
    }
    if(sortOption === 4) {
      v1 = new Date(it1.due_date).getTime()
      v2 = new Date(it2.due_date).getTime()
    }
    if(sortOption === 5) {
      v2 = new Date(it1.due_date).getTime()
      v1 = new Date(it2.due_date).getTime()
    }

    if(v1 < v2) return -1
    if(v1 > v2) return 1
    return 0
  })

  let totalPages = Math.ceil(tasks.length / PAGE_LIMIT)

  if(page < 1 || totalPages < page) {
    page = 1
    querPageInvalid = true
  }

  useEffect(() => {
    if(querySortInvalid) {
      searchParams.set("page", 1);
      searchParams.set("sort", 1);
      setSearchParams(searchParams, { replace: true });
    }
    else if(querPageInvalid) {
      searchParams.set("page", 1);
      setSearchParams(searchParams, { replace: true });
    }
  }, [])

  let onSortHandler = (event) => {
    let id = +event.target.value
    searchParams.set("page", 1);
    searchParams.set("sort", id+1);
    setSearchParams(searchParams, { replace: true });
  }

  tasks = tasks.slice(PAGE_LIMIT * (page-1), (PAGE_LIMIT * (page-1)) + PAGE_LIMIT)

  if(tasks.length === 0) return <p>No tasks found. Pleas add some tasks</p>

  return (
    <div id="tasks-wrapper" className={"container mt-2"}>
      <div className="input-group mb-3">
        <div className="input-group-prepend mb-2">
          <span className="input-group-text" style={{"borderTopRightRadius": 0, "borderBottomRightRadius": 0}}>Sort By </span>
        </div>
        <select defaultValue={sortOption-1} onChange={onSortHandler} className="form-select form-select-sm mb-2">
          {SORT_OPTIONS.map((value, id) => 
            <option key={id} value={id}>{value}</option>
          )}
        </select>
      </div>


      {tasks.map(task => <Taskitem 
        key={task.id}
        id={task.id}
        task_title={task.task_title}
        description={task.description}
        category={task.category}
        priority={task.priority}
        due_date={task.due_date}
      />)}

      <PaginationBar searchParams={searchParams} totalPages={totalPages} page={page} />
    </div>
  )
}

export default Tasks;