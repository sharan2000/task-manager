import { useState } from "react";
import { useDispatch } from "react-redux";
import { categoriesActions } from "../store/categories";

const NewCategory = () => {
  let [newCategory, setNewCategory] = useState("");
  let storeDispatch = useDispatch()

  const onChangeHandler = (event) => {
    setNewCategory(event.target.value)
  }

  const addNewCategory = () => {
    storeDispatch(categoriesActions.add(newCategory))
    setNewCategory("")
  }

  return (
    <div className="mt-3 d-flex">
      <input value={newCategory} type="text" className="form-control" id="newCategoryInput" placeholder="Enter new category" onChange={onChangeHandler} />
      <button disabled={newCategory.length < 1} className="ms-2 btn btn-success btn-sm" onClick={addNewCategory}>add</button>
    </div>
  )
}

export default NewCategory