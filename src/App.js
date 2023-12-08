
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserAddTask from "./components/task/UserAddTask";
import UserHome from "./components/UserHome";
import UserEditTask from "./components/task/EditTask";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <ToastContainer></ToastContainer>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path="/add" element={<UserAddTask />} />
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/editTask/:taskId" element={<UserEditTask />} />
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
