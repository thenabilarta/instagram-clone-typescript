import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import styles from "./profile.module.css";
import axios from "axios";
import { readCookie } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { REACTURL } from "../../config/env";

function Profile() {
  const [userFeeds, setUserFeeds] = useState([]);
  const [userProfile, setUserProfile] = useState<any>({});

  const state = useSelector((state: any) => state.auth);

  const params = useParams();

  useEffect(() => {
    fetchFeed();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = () => {
    axios
      .get(`${REACTURL}/api/users/` + params.id, {
        headers: {
          Authorization: `Bearer ${readCookie("token")}`,
        },
      })
      .then((res) => {
        console.log("user", res.data);
        setUserProfile(res.data[0]);
      });
  };

  const fetchFeed = () => {
    axios
      .get(`${REACTURL}/api/feeds/${params.id}`, {
        headers: {
          Authorization: `Bearer ${readCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserFeeds(res.data);
      });
  };

  console.log(state);

  return (
    <>
      <Navbar />
      <div className="mainWrapper">
        <div className={styles.profileWrapper}>
          <div className={styles.profileHeader}>
            <div className={styles.profilePictureWrapper}>
              <div className={styles.profilePicture}>
                {userProfile.profilePictureSRC && (
                  <img src={userProfile.profilePictureSRC} alt="" />
                )}
              </div>
            </div>
            <div className={styles.profileDescriptionWrapper}>
              <div className={styles.username}>
                {userProfile.username && userProfile.username}
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
