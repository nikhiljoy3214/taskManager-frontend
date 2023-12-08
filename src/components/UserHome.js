import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ButtonGroup, Button, Container, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/UserHome.css";
import { toast, ToastContainer } from "react-toastify";

function UserHome() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [sortOption, setSortOption] = useState("date");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/task/getUserTask/${userId}`);
        const data = res.data;
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
    setFilter(status);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);

    if (e.target.value === "date") {
      sortTasksByDate();
    } else if (e.target.value === "alphabetical") {
      sortTasksAlphabetically();
    }
  };

  const sortTasksByDate = () => {
    const sortedTasks = [...filteredTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredTasks(sortedTasks);
  };

  const sortTasksAlphabetically = () => {
    const sortedTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredTasks(sortedTasks);
  };

  const deleteTask = async (taskId) => {
    try {

      await axios.delete(`/task/deleteTaskbyId/${taskId}`);
      toast.success("Task deleted successfully");

      const updatedTasks = tasks.filter(task => task._id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);


      handleCloseModal();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container className="mt-5">
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <b>No Tasks to Show</b>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ButtonGroup className="mb-2" >
              <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => handleFilter("all")}>
                All Tasks
              </Button>
              <Button variant={filter === "pending" ? "danger" : "danger"} onClick={() => handleFilter("pending")}>
                Pending
              </Button>
              <Button variant={filter === "completed" ? "success" : "success"} onClick={() => handleFilter("completed")}>
                Completed
              </Button>
            </ButtonGroup>
          </div>

          <div className="sort-container" style={{ width: '20%', marginLeft: 'auto' }}>
            <Form.Group controlId="sortSelect" className="mb-3">
              <Form.Label>Sort</Form.Label>
              <Form.Select value={sortOption} onChange={handleSortChange}>
                <option value="date">By Date</option>
                <option value="alphabetical">Alphabetically</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredTasks.map((task, index) => (
              <div key={task.id} className={`card ${task.status === 'pending' ? 'border-danger' : 'border-success'}`} style={{ cursor: 'pointer' }} title="Click to Edit">
                <a className={`card1 ${task.status === 'pending' ? 'status-pending' : 'status-complete'}`} onClick={() => handleCardClick(task)}>
                  <p className="text-title">{task.title}</p>
                  <p className="text-body">{task.description.slice(0, 15)}....</p>
                  <div className="go-corner" >
                    <div className="go-arrow">
                      →
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}


      <Modal show={selectedCard !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCard?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Task Description: </b>{selectedCard?.description}</p>
          <p><b>Task Creation: </b>{selectedCard?.createdAt.slice(0, 10)}</p>
          <p><b>Task Modified: </b>{selectedCard?.updatedAt.slice(0, 10)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/editTask/${selectedCard?._id}`}>
            <Button variant="warning">
              Edit
            </Button>
          </Link>
          <Button variant="danger" onClick={() => deleteTask(selectedCard?._id)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
}

export default UserHome;
