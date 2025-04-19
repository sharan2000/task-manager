import { useSelector } from "react-redux"
import CategoryItem from "./CategoryItem"
import NewCategory from "./NewCategory";

const ManageCategories = () => {
  let categories = useSelector(state => state.categories.categories)
  
  return (
    <div className={"container mt-2"}>
      {
        categories.length ?
        <ul className="list-group">
          {categories.map(category => <CategoryItem key={category} name={category} />)}
        </ul> :
        <p>No tasks categories found. Pleas add some</p>
      }

      <NewCategory />
    </div>
  )  
}

export default ManageCategories