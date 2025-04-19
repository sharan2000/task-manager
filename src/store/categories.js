import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categories: [],
  total: 0
}


const getCategoriesFromLocalStorage = () => {
  let categoriesInStorage
  try {
    categoriesInStorage = JSON.parse(localStorage.getItem("categories"));
    if(!categoriesInStorage) categoriesInStorage = initialState
  } catch {
    setCategoriesInLocalStorage(initialState)
    categoriesInStorage = initialState
  }

  return categoriesInStorage
}


const setCategoriesInLocalStorage = (state) => {
  try {
    localStorage.setItem("categories", JSON.stringify(state))
  } catch {
    console.log("Could not set the categories in session storage")
  }
}


const categoriesSlice = createSlice({
  name: "categories",
  initialState: getCategoriesFromLocalStorage(),
  reducers: {
    add: (state, action) => {
      state.categories.push(action.payload)
      state.total++

      setCategoriesInLocalStorage(state)
    },
    delete: (state, action) => {
      let index = state.categories.findIndex(category => category === action.payload)
      state.categories.splice(index, 1)
      state.total--

      setCategoriesInLocalStorage(state)
    }
  }
})

export const categoriesActions = categoriesSlice.actions
export default categoriesSlice.reducer
