import { EditOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logo } from "../../imports/image";
import { users } from "../../imports/import";
import { MetaData } from "../../imports/index";
import { UpdateAdultInitiate } from "../../Redux/Action/ActionFilmadult";
import { ProfileGateStyle } from "../../Style/ProfileGateStyle/ProfileGateStyle";
const ProfileGate = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { refreshTokens, profile } = useSelector((state) => state.auth);
  const { updateAdult } = useSelector((state) => state.adult);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };
  const handleGoToHome = (adult) => {
    dispatch(UpdateAdultInitiate(adult, refreshTokens));
  };
  useEffect(() => {
    if (updateAdult.msg === "kid") {
      navigate("/home");
    } else if (updateAdult.msg === "adult") {
      navigate("/home");
    } else if (updateAdult.msg === "") {
      navigate("/browse");
    }
  }, [updateAdult]);
  return (
    <>
      <ProfileGateStyle />
      <MetaData title="Choose Adult" />
      <div className="container">
        <img src={logo} className="logo" alt="" />
        <div className="info">
          <span className="title">
            {isEdit ? "Manage Profile:" : "Who's watching?"}
          </span>
          <ul className="user-container">
            {users.map((user, index) => (
              <li
                className="user"
                key={index}
                onClick={() => handleGoToHome(user.adult)}
              >
                <img
                  className={isEdit ? "edit" : ""}
                  src={user.avatar}
                  alt=""
                />
                {isEdit && (
                  <span className="edit-icon">
                    <EditOutlined />
                  </span>
                )}
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <span className="edit-profile">
          {isEdit ? (
            <a className="done" href="/" onClick={handleClick}>
              Done
            </a>
          ) : (
            <a href="/" onClick={handleClick}>
              Manage Profile
            </a>
          )}
        </span>
      </div>
    </>
  );
};

export default ProfileGate;
