import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import instagramlogo from "../../assets/instagramlogo.png";
import {
  HomeOutlined,
  MessageOutlined,
  HeartOutlined,
  HomeFilled,
  MessageFilled,
  PlusCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Fragment } from "react";

function Navbar() {
  const history = useNavigate();

  const location = useLocation();

  const path = location.pathname;

  const state = useSelector((state: any) => state);

  // const onChange = (e) => {
  //   console.log(e);
  // };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarInnerWrapper}>
        <div className={styles.navbar}>
          <div className={styles.logoWrapper}>
            <img
              onClick={() => history("/")}
              className={styles.logo}
              src={instagramlogo}
              alt=""
            />
          </div>
          {/* <div className={styles.inputWrapper}>
            <Input placeholder="Search" allowClear onChange={onChange} />
          </div> */}
          <div className={styles.menuWrapper}>
            {path === "/" ? (
              <>
                <HomeFilled className={styles.menuIcon} />
              </>
            ) : (
              <>
                <HomeOutlined
                  className={styles.menuIcon}
                  onClick={() => {
                    history("/");
                  }}
                />
              </>
            )}

            {path === "/message" ? (
              <MessageFilled className={styles.menuIcon} />
            ) : (
              <MessageOutlined
                className={styles.menuIcon}
                onClick={() => {
                  history("/message");
                }}
              />
            )}

            {path === "/create" ? (
              <PlusCircleFilled className={styles.menuIcon} />
            ) : (
              <Fragment>
                <input
                  type="file"
                  style={{ display: "none" }}
                  name="inputPost"
                  id="inputPost"
                  accept="image/jpeg"
                  data-test="input-feed"
                  onChange={(e) => {
                    console.log(e.target.files);
                    history(
                      "/create",

                      {
                        state: {
                          media: e.target.files,
                        },
                      }
                    );
                  }}
                />
                <label htmlFor="inputPost" className={styles.menuIcon}>
                  <PlusCircleOutlined />
                </label>
              </Fragment>
            )}

            <HeartOutlined className={styles.menuIcon} />
            <div
              className={styles.profilePicture}
              onClick={() => {
                history("/profile");
              }}
            >
              <img src={state.auth.profilePic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
