import { createSlice } from "@reduxjs/toolkit"
import uniqid from 'uniqid';

const initialState = {
  tasks: [],
  total: 0
}

const getTasksFromLocalStorage = () => {
  let tasksInStorage
  try {
    tasksInStorage = JSON.parse(localStorage.getItem("tasks"));
    if(!tasksInStorage) tasksInStorage = initialState
  } catch {
    setTasksInLocalStorage(initialState)
    tasksInStorage = initialState
  }

  return tasksInStorage
}


const setTasksInLocalStorage = (state) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(state))
  } catch {
    console.log("Could not set the tasks in session storage")
  }
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: getTasksFromLocalStorage(),
  reducers: {
    add: (state, action) => {
      action.payload.id = uniqid()
      state.tasks.push(action.payload)
      state.total++

      setTasksInLocalStorage(state)
    },
    edit: (state, action) => {
      let index = state.tasks.findIndex(item => item.id === action.payload.id)
      state.tasks.splice(index, 1, action.payload)

      setTasksInLocalStorage(state)
    },
    delete: (state, action) => {
      let index = state.tasks.findIndex(item => item.id === action.payload)
      state.tasks.splice(index, 1)
      state.total--

      setTasksInLocalStorage(state)
    }
  }
})

export const tasksActions = tasksSlice.actions
export default tasksSlice.reducer