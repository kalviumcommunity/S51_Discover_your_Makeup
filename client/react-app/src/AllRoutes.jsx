import {Route, Routes} from "react-router-dom"
import Home from "./Components/Makeup";
import Addmakeup from "./Components/Addmakeup";
import Update from "./Components/Update";

const AllRoutes=()=>{
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add" element={<Addmakeup/>}></Route>
            <Route path="/update/:id"element={<Update/>}></Route>
        </Routes>

        </>
    )
}

export default AllRoutes;