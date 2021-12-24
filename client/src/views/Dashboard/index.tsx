import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";
import Navbar from "../../components/Navbar";
import NavbarMobile from "../../components/NavbarMobile";
import Story from "../../components/Story";
import Feed from "../../components/Feed";
import { useSelector } from "react-redux";
import { readCookie } from "../../utils/utils";
import { REACTURL } from "../../config/env";

function Dashboard() {
  const [feeds, setFeeds] = useState([]);
  const [userStory, setUserStory] = useState([]);

  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    fetchFeed();
    fetchUser();
  }, []);

  const fetchFeed = () => {
    axios
      .get(`${REACTURL}/api/feeds`, {
        headers: {
          Authorization: `Bearer ${readCookie("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFeeds(res.data);
      });
  };

  const fetchUser = () => {
    axios
      .get(`${REACTURL}/api/users`, {
        headers: {
          Authorization: `Bearer ${readCookie("token")}`,
        },
      })
      .then((res) => {
        setUserStory(res.data);
      });
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

  function ShowRightProfile() {
    const [width] = useWindowSize();
    let offset = (width - 935) / 2;

    if (width > 613 + 293 + 28) {
      return (
        <div
          className={styles.rightWrapper}
          style={{
            left: 613 + offset + 28,
          }}
        >
          <div className={styles.rightWrapperHeader}>
            <div className={styles.rightWrapperHeaderImageWrapper}>
              <img src={auth.profilePic} alt="" />
            </div>
            <div className={styles.rightWrapperHeaderText}>
              <p>@{auth.username}</p>
              <p>{auth.email}</p>
            </div>
          </div>
          <div className={styles.rightWrapperFooter}>
            <p>
              About Help Press API Jobs Privacy Terms Locations Top Accounts
              Hashtags Language
            </p>
            <p>© 2021 INSTAGRAM FROM FACEBOOK</p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <Navbar />
      {width < 640 && <NavbarMobile />}
      <div className="mainWrapper">
        <div className={styles.dashboardWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.storyWrapper}>
              {userStory.length > 0 &&
                userStory.map((user: any) => (
                  <Story user={user} key={user.username} />
                ))}
              {/* <Story /> */}
            </div>
            {feeds.length > 0 &&
              feeds.map((feed: any) => (
                <Feed
                  feed={feed}
                  key={feed.id}
                  fetchFeed={fetchFeed}
                  userId={auth.id}
                />
              ))}
          </div>
          {ShowRightProfile()}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
