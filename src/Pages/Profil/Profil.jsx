import { useGetUserDataMutation } from "../../user/userApiSlice";
import { setCredentials } from "../../user/userSlice";
import "./Profil.css";
// import { getUserData } from "../../user/user";
import {
  selectCurrentFirstname,
  selectCurrentLastname,
} from "../../user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styles from "./Profil.module.css";
import { useUpdateUserDataMutation } from "../../user/userApiSlice";

function Profil() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  // const [state, setState] = useState({firstName: "", lastName: "", editMode: false});

  const [getUserData] = useGetUserDataMutation();
  const [updateUserData] = useUpdateUserDataMutation();

  const userFirstame = useSelector(selectCurrentFirstname);
  const userLastname = useSelector(selectCurrentLastname);

  const getProfile = async () => {
    try {
      const user = await getUserData();
      console.log("user", user);
      dispatch(
        setCredentials({
          firstname: user.data.body.firstName,
          lastname: user.data.body.lastName,
        })
      );
      // setState((prev) => ({...prev, firstName : user.data.body.firstName)}) ;
      setLastName(user.data.body.lastName);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    if (firstName === "" || lastName === "") {
      alert("Please fill in all fields");
      return;
    }
    const updateUserDatas = await updateUserData({
      firstName: firstName,
      lastName: lastName,
    });
    dispatch(
      setCredentials({
        firstname: updateUserDatas.data.body.firstName,
        lastname: updateUserDatas.data.body.lastName,
      })
    );
    toggle();
  };

  const toggle = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    getProfile();
  }, []);

  // console.log(firstName + " " + lastName);

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userFirstame} {userLastname}
          </h1>
          {editMode ? (
            <div className="editContainer">
              <input
                className="editInput"
                type="text"
                placeholder={userFirstame}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <input
                className="editInput"
                type="text"
                placeholder={userLastname}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <div>
                <button className="edit-button" onClick={updateProfile}>
                  Save
                </button>
                <button className="edit-button" onClick={toggle}>
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
          {!editMode ? (
            <button className="edit-button" onClick={toggle}>
              Edit Name
            </button>
          ) : null}
        </div>

        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profil;
