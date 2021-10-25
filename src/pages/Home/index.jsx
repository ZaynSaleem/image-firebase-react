import "../../App.css";
import "../Home/style.css";
import Swal from "sweetalert2";
import {
  FaUserPlus,
  FaPlus,
  FaTrashAlt,
  FaRegEdit,
  FaEye,
} from "react-icons/fa";

import {
  InputGroup,
  InputGroupText,
  Input,
  Table,
  Col,
  Row,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Header from "../../components/header";
import { Route, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase, { db } from "../../config/firebase";

const Index = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [isIndex, setIsIndex] = useState("");
  let [isOpen, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let arr = [];
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("user-sign-in"));
    // if (get && get.length) {
    //   setData(get);
    // }
    db.collection("user-details")
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          if (doc.data().userid == get) {
            let obj = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              date: doc.data().date,
            };
            arr.push(obj);
          }
        });
        setData(arr);
      });
  }, []);

  const addEmp = () => {
    let obj = {
      firstName: firstName,
      lastName: lastName,
      Email: email,
      salary: salary,
      date: date,
    };

    // console.log(firstName);
    let get = JSON.parse(localStorage.getItem("employee"));
    if (get && get.length) {
      let dupdata = [...data];
      dupdata.push(obj);
      setData(dupdata);
      localStorage.setItem("employee", JSON.stringify(dupdata));
    } else {
      setData([obj]);
      localStorage.setItem("employee", JSON.stringify([obj]));
    }
    // setData([...data, obj]);
    setModal(false);
  };

  const showData = (id) => {
    console.log(id);
    localStorage.setItem("user-edit-id", JSON.stringify(id));
    history.push("/show-detail");
  };

  let count = 0;
  return (
    <div className="App">
      <Header />
      <Container className="mt-4">
        <Table>
          <thead className="table-header">
            <tr>
              <th>S No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!data.length ? (
              <tr className="text-center">
                <td><h5>NO DATA</h5></td>
              </tr>
            ) : (
              data.map((per, index) => (
                <tr key={index}>
                  <td>{++count}</td>
                  <td>{per.title}</td>
                  <td>{per.description}</td>
                  <td>{per.date}</td>
                  <td>
                    {
                      <Button
                        className="ms-3"
                        color="outline-primary"
                        onClick={() => showData(per.id)}
                      >
                        <FaEye />
                      </Button>
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Button
          className="btn-add-user"
          onClick={() => history.push("/add-detail")}
        >
          <FaUserPlus />
        </Button>{" "}
      </Container>

   
    </div>
  );
};

export default Index;
