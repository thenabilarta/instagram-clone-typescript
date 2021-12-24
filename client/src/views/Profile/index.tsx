import { useEffect, useState, useLayoutEffect } from "react";
import { logoutUser } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import NavbarMobile from "../../components/NavbarMobile";
import styles from "./profile.module.css";
import axios from "axios";
import { readCookie } from "../../utils/utils";
import { Button } from "antd";
import { REACTURL } from "../../config/env";

function Profile() {
  const dispatch = useDispatch();
  const [userFeeds, setUserFeeds] = useState([]);
  const [, setMobileMode] = useState(false);

  const state = useSelector((state: any) => state.auth);

  useEffect(() => {
    fetchFeed();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFeed = () => {
    console.log(REACTURL);

    if (state.id) {
      axios
        .get(`${REACTURL}/api/feeds/${state.id}`, {
          headers: {
            Authorization: `Bearer ${readCookie("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserFeeds(res.data);
        });
    }
  };

  function useWindowSize() {
    const [size, setSize] = useState([0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width] = useWindowSize();

  useEffect(() => {
    if (width < 990) {
      setMobileMode(true);
    } else {
      setMobileMode(false);
    }
  }, [width]);

  return (
    <>
      <Navbar />
      {width < 640 && <NavbarMobile />}
      <div className="mainWrapper">
        <div className={styles.profileWrapper}>
          <div className={styles.profileHeader}>
            <div className={styles.profilePictureWrapper}>
              <div className={styles.profilePicture}>
                {state.profilePic && <img src={state.profilePic} alt="" />}
              </div>
            </div>
            <div className={styles.profileDescriptionWrapper}>
              <div className={styles.username}>
                {state.username && state.username}
                <Button
                  type="primary"
                  onClick={() => {
                    console.log("logout");
                    dispatch(logoutUser());
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </div>
              <div className={styles.info}>
                <p className={styles.descriptionText}>
                  {userFeeds.length} posts
                </p>
                {/* <p className={styles.descriptionText}>177 followers</p>
                <p className={styles.descriptionText}>914 following</p> */}
              </div>
              <div className={styles.description}>
                <p className={styles.descriptionText}>This is description</p>
                <p className={styles.descriptionText}>www.example.com</p>
              </div>
            </div>
            {/* <p>This is profile</p>
          <strong
            onClick={() => {
              console.log("logout");
              dispatch(logoutUser());
              window.location.reload();
            }}
          >
            Logout
          </strong> */}
          </div>
          <div className={styles.profileBody}>
            {userFeeds.map((u: any, index) => (
              <div className={styles.profilePost} key={index}>
                <img src={u.image_url} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
