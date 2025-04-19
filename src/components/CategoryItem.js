
import { useDispatch } from "react-redux"
import classes from "./CategoryItem.module.css"
import { categoriesActions } from "../store/categories"

const CategoryItem = ({name}) => {
  let storeDispatch = useDispatch()

  let deleteCategoryHandler = () => {
    storeDispatch(categoriesActions.delete(name))
  }

  return (
    <li className="list-group-item">
      <div>
        <p className={classes["item-p"]}>{name}</p>
        <button className={"btn btn-warning btn-sm " + classes["item-button"]} onClick={deleteCategoryHandler}>delete</button>
      </div>
    </li>    
  )
}

export default CategoryItem