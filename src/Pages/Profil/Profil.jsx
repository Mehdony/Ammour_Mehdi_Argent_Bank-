import { useGetUserDataMutation } from "../../user/userApiSlice";
import { setCredentials } from "../../user/userSlice";
// import styles from "./Profil.module.css";
// import { getUserData } from "../../user/user";
import {
  selectCurrentFirstname,
  selectCurrentLastname,
} from "../../user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profil.module.css";
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
    <div className={styles.header}>
      <h1>
        Welcome back
        <br />
        {userFirstame} {userLastname}
      </h1>
      {editMode ? (
        <div className={styles.editContainer}>
          <input
            className={styles.editInput}
            type="text"
            placeholder={userFirstame}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            className={styles.editInput}
            type="text"
            placeholder={userLastname}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <button className={styles.editButton} onClick={updateProfile}>
            Save
          </button>
        </div>
      ) : null}
      {!editMode ? (
        <button className={styles.editButton} onClick={toggle}>
          Edit Name
        </button>
      ) : null}
    </div>
  );
}

export default Profil;