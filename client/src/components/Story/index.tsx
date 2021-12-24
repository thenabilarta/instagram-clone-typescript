import React from "react";
import styles from "./story.module.css";

function Story({ user }: { user: any }) {
  if (user) {
    return (
      <div className={styles.story}>
        <div className={styles.storyLine}>
          <div className={styles.storyImage}>
            <img src={user.profilePictureSRC} alt="" />
          </div>
        </div>
        <div className={styles.storyUsername}>
          <p>{user.username}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Story;
