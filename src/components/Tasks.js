import { useSelector } from "react-redux";
import Taskitem from "./Taskitem";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import PaginationBar from "./PaginationBar";

const PAGE_LIMIT = 10

const Tasks = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  let page = +(searchParams.get("page") || 1)
  let originalPage = page

  let tasks = useSelector((store) => store.tasks.tasks)

  let totalPages = Math.ceil(tasks.length / PAGE_LIMIT)
  if(page < 1 || totalPages < page) {
    page = 1
  }

  useEffect(() => {
    if(originalPage < 1 || totalPages < originalPage) {
      setSearchParams("page=1")
    }
  }, [])

  tasks = tasks.slice(PAGE_LIMIT * (page-1), (PAGE_LIMIT * (page-1)) + PAGE_LIMIT)

  if(tasks.length === 0) return <p>No tasks found. Pleas add some tasks</p>

  return (
    <div className={"container mt-2"}>
      {tasks.map(task => <Taskitem 
        key={task.id}
        id={task.id}
        task_title={task.task_title}
        description={task.description}
        category={task.category}
        priority={task.priority}
        due_date={task.due_date}
      />)}

      <PaginationBar totalPages={totalPages} page={page} />
    </div>
  )
}

export default Tasks;