import { useGetUserDataMutation } from "../../user/userApiSlice";
import { setCredentials } from "../../user/userSlice";
import "./Profil.css";
import {
  selectCurrentFirstname,
  selectCurrentLastname,
} from "../../user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserDataMutation } from "../../user/userApiSlice";

function Profil() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editMode, setEditMode] = useState(false);

  // permettra de modifier le store de redux 
  const dispatch = useDispatch();

  // on récupère les methodes fetch 
  const [getUserData] = useGetUserDataMutation();
  const [updateUserData] = useUpdateUserDataMutation();

  // Permet de recuperer les données de l'user dans le store de redux
  const userFirstame = useSelector(selectCurrentFirstname);
  const userLastname = useSelector(selectCurrentLastname);


//  permet de recuperer les données de l'user et de les stocker dans le store de redux
  const getProfile = async () => {
    try {
      // on stock dans user le resultat du fetch ( user = firstname , lastname, status 200 ....)
      const user = await getUserData();
      // on envoie les données user dans le store de redux ( userSlice)
      dispatch(
        setCredentials({
          firstname: user.data.body.firstName,
          lastname: user.data.body.lastName,
        })
      );
      // setState((prev) => ({...prev, firstName : user.data.body.firstName)}) ;
      setFirstName(user.data.body.firstName);
      setLastName(user.data.body.lastName);
    } catch (error) {
      console.log(error);
    }
  };

  // permet de mettre à jour les données de l'user
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

  // permet de recuperer les données de l'user au chargement de la page
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {!editMode ? (
              <span>
                {" "}
                {userFirstame} {userLastname}{" "}
              </span>
            ) : null}
          </h1>
          {editMode ? (
            <div className="edit-container">
              <div className="inputsContainer">
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
              </div>
              <div className="editButtonsContainer">
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
