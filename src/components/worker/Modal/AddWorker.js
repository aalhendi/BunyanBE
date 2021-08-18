/* Libraries */
import Modal from "react-modal";
/* Imports */
import React, { useState } from "react";
/* State and Store */
import authStore from "../../../stores/authStore";
import companyStore from "../../../stores/companyStore";
import { observer } from "mobx-react";

/* Client Store */

const AddWorker = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  if (authStore.loading || companyStore.loading) {
    return <h1>Loading...</h1>;
  }

  /* handle the change of all inputs */
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  /* Submit handler */
  const handleSubmit = async (event) => {
    // TODO: Prevent default form submit and still live render
    user.userType = "worker";
    user.email = `${user.username}@worker.com`;
    user.companyId = companyStore.company.id;
    await authStore.register(user, true);
    event.target.reset();
    props.closeModal();
  };
  /* Style modal  */
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <input
                name="email"
                type="email"
                className="form-control"
                value={`${user.username}@worker.com`}
                disabled={true}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <input
                name="phoneNumber"
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                minLength="7"
                maxLength="8"
                pattern="[0-9]+"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default observer(AddWorker);
