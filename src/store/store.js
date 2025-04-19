import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./task"
import categoriesReducer from "./categories"

const store = configureStore({
  reducer: {
    "tasks": tasksReducer,
    "categories": categoriesReducer
  }
})

export default store