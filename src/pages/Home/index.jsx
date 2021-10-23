import "../../App.css";
import "../Home/style.css";
import Swal from "sweetalert2";
import { FaUserPlus, FaPlus, FaTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";

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
              id : doc.id,
              title : doc.data().title,
              description : doc.data().description,
              date : doc.data().date
            }
            arr.push(obj)
          }
          // console.log(doc.id);
        });
        setData(arr);
        // let res = arr.filter((x) => x.userid === get ? console.log(x.data()):console.log("not matched"))
        // console.log(arr);
      });
      // console.log(arr);
    // let res =  arr.filter((x) => {
    //     return(
    //       x.userid === get
    //     )
    //   })
    //   console.log(res);
  }, []);

  const toggle = () => {
    setModal(!modal);
    setIsUpdate(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setSalary("");
    setDate("");
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const updateEmp = () => {
    let dupData = [...data];

    dupData[isIndex].firstName = firstName;
    dupData[isIndex].lastName = lastName;
    dupData[isIndex].Email = email;
    dupData[isIndex].salary = salary;
    dupData[isIndex].date = date;

    setData(dupData);
    localStorage.setItem("employee", JSON.stringify(dupData));

    setModal(false);
  };

  const editEmp = (edit) => {
    setModal(true);
    setIsUpdate(true);
    setIsIndex(edit);
    setFirstName(data[edit].firstName);
    setLastName(data[edit].lastName);
    setEmail(data[edit].Email);
    setSalary(data[edit].salary);
    setDate(data[edit].date);
  };
  // console.log(isIndex);

  const dltEmp = (e) => {
    // console.log(e);
    data.map((per, index) => {
      // console.log(index);
      if (e == index) {
        console.log("Matched !" + index + " &  " + e);
        // let updatedData = data.splice(e, 1);
        let dupdata = [...data];
        dupdata.splice(e, 1);
        setData(dupdata);
        localStorage.setItem("employee", JSON.stringify(dupdata));
      }
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User deleted",
      showConfirmButton: false,
      timer: 1500,
    });
  };

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
  localStorage.setItem('user-edit-id',JSON.stringify(id));
  history.push('/show-detail')
}

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
                <h5>NO DATA</h5>
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
                        color="outline-danger"
                        onClick={() => dltEmp(index)}
                      >
                        <FaTrashAlt />
                      </Button>
                    }
                    {
                      <Button
                        className="ms-3"
                        color="outline-success"
                        onClick={() => editEmp(index)}
                      >
                        <FaRegEdit />
                      </Button>
                    }
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

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <Input
                      onChange={(event) => setFirstName(event.target.value)}
                      value={firstName}
                      placeholder="FirstName"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <InputGroup>
                    <Input
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="LastName"
                      value={lastName}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="py-4">
                <Col>
                  {" "}
                  <InputGroup>
                    <InputGroupText>@</InputGroupText>

                    <Input
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email"
                      type="email"
                      value={email}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Input
                    type="number"
                    placeholder="Salary"
                    min={1000}
                    onChange={(event) => setSalary(event.target.value)}
                    value={salary}
                  />
                </Col>

                <Col md={6}>
                  <Input
                    type="date"
                    onChange={(event) => setDate(event.target.value)}
                    value={date}
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            {!isUpdate ? (
              <Button color="primary" onClick={addEmp}>
                Add Employee <FaPlus />
              </Button>
            ) : (
              <Button color="primary" onClick={updateEmp}>
                Update <FaPlus />
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
