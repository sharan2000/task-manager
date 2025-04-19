import { Outlet } from "react-router-dom"
import Navigation from "./Navigation";
import classes from "./Root.module.css"

const Root = () => {
  return (
    <div className={classes["box"]}>
      <div className={classes["header"]}>
        <Navigation />
      </div>
      <div className={classes["content"]}>
        <Outlet />
      </div>
      {/* <div className={classes["footer"]}>
        <p><b>footer</b> (fixed height)</p>
      </div> */}
    </div>
  );
}

export default Root