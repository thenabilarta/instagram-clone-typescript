import React, { useState } from "react";
import styles from "./feed.module.css";
import { Input } from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  MessageOutlined,
  HeartFilled,
} from "@ant-design/icons";
import kacangpanjang from "../../assets/kacangpanjang.jpg";
import axios from "axios";
import { readCookie } from "../../utils/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { REACTURL } from "../../config/env";

const Feed = ({
  feed,
  fetchFeed,
  userId,
}: {
  feed: any;
  fetchFeed: any;
  userId: any;
}) => {
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [activeLike, setActiveLike] = useState(false);

  const history = useNavigate();

  const hoursPosted = () => {
    const hour = (moment().unix() - feed.created_at) / 3600;

    if (hour < 1) {
      return "JUST NOW";
    }

    if (hour < 24) {
      return Math.floor(hour) + " HOURS AGO";
    }

    if (hour > 24 && hour <= 24 * 2) {
      return "1 DAY AGO";
    }

    if (hour > 48 && hour < 24 * 7) {
      return Math.floor(hour / 24) + " DAYS AGO";
    }

    if (hour > 24 * 7) {
      return "MORE THAN A WEEK AGO";
    }
  };

  const createComment = (post_id: any) => {
    axios
      .post(
        `${REACTURL}/api/comments`,
        { text: comment, post_id },
        {
          headers: {
            Authorization: `Bearer ${readCookie("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setComment("");
        fetchFeed();
      });
  };

  const likeAPost = (feed_id: any, owner: any, user_id: any) => {
    axios
      .post(
        `${REACTURL}/api/likes`,
        { feed_id, owner, user_id },
        {
          headers: {
            Authorization: `Bearer ${readCookie("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // setComment("");
        if (res.data.status === "error") {
          return;
        } else {
          fetchFeed();
        }
      });
  };

  const unlikeAPost = (feed_id: any, user_id: any) => {
    axios
      .post(
        `${REACTURL}/api/likes/unlike`,
        { feed_id, user_id },
        {
          headers: {
            Authorization: `Bearer ${readCookie("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchFeed();
      });
  };

  const onUsernameClick = (id: any) => {
    if (userId === id) {
      history("/profile");
    } else {
      history("/profile/" + id);
    }
  };

  const renderComment = (feed: any) => {
    if (feed.comments.length > 0) {
      if (!openComment) {
        return (
          <p
            style={{
              marginBottom: 5,
              opacity: 0.5,
              cursor: "pointer",
            }}
            onClick={() => setOpenComment(true)}
          >
            View all {feed.comments.length} comments
          </p>
        );
      }

      if (openComment) {
        return (
          <div>
            {feed.comments.map((f: any) => {
              return (
                <p
                  key={f.id}
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <strong>{f.username}</strong> {f.text}
                </p>
              );
            })}
          </div>
        );
      }
    }
  };

  return (
    <div className={styles.feedWrapper} key={feed.id}>
      <div className={styles.feedHeader}>
        <div className={styles.feedHeaderImageWrapper}>
          <img
            src={
              feed.profilePictureSRC !== ""
                ? feed.profilePictureSRC
                : kacangpanjang
            }
            alt=""
          />
        </div>
        <p
          className={styles.feedUsername}
          onClick={() => onUsernameClick(feed.user_id)}
        >
          {feed.username}
        </p>
      </div>
      <div
        className={styles.feed}
        onDoubleClick={() => {
          setActiveLike(true);
          setTimeout(() => {
            setActiveLike(false);
          }, 500);
          likeAPost(feed.id, feed.user_id, userId);
        }}
      >
        <img src={feed.image_url} alt="" />
        <HeartFilled className={activeLike ? styles.active : ""} />
      </div>
      <div className={styles.feedFooter}>
        <div className={styles.feedFooterIconWrapper}>
          <div>
            {feed.likes.includes(userId) ? (
              <HeartFilled
                className={styles.feedFooterIcon}
                style={{ color: "red" }}
                onClick={() => {
                  console.log("unlike");
                  unlikeAPost(feed.id, userId);
                }}
              />
            ) : (
              <HeartOutlined
                className={styles.feedFooterIcon}
                onClick={() => {
                  console.log("like");
                  setActiveLike(true);
                  setTimeout(() => {
                    setActiveLike(false);
                  }, 500);
                  likeAPost(feed.id, feed.user_id, userId);
                }}
              />
            )}

            <CommentOutlined className={styles.feedFooterIcon} />
            <MessageOutlined className={styles.feedFooterIcon} />
          </div>
        </div>
        <div className={styles.feedFooterText}>
          {feed.likes.length > 0 && (
            <p style={{ marginBottom: 0 }}>{feed.likes.length} likes</p>
          )}
          <div>
            <strong>{feed.username}</strong> {feed.caption}
          </div>
          {renderComment(feed)}
          <p
            style={{
              fontSize: 10,
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            {hoursPosted()}
          </p>
        </div>
        <div className={styles.feedFooterComment}>
          <Input
            style={{ padding: 0 }}
            placeholder="Add a comment..."
            bordered={false}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <strong
            style={{
              color: "#0095f6",
              opacity: comment.length > 0 ? 1 : 0.3,
              cursor: comment.length > 0 ? "pointer" : "default",
            }}
            onClick={() => createComment(feed.id)}
          >
            Post
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Feed;
