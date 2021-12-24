/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useLayoutEffect } from "react";
import { Input, Row, notification } from "antd";
import { IconType } from "antd/lib/notification";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import NavbarMobile from "../../components/NavbarMobile";
import styles from "./create.module.css";
import { readCookie } from "../../utils/utils";
import { REACTURL } from "../../config/env";

function Create({ location }: { location?: any }): JSX.Element {
  console.log(location.state.media);

  const [imageAttr, setImageAttr] = useState({});
  const [imageSRC, setImageSRC] = useState({});
  const [caption, setCaption] = useState("");
  const [mobileMode, setMobileMode] = useState(false);

  const history = useNavigate();

  const auth = useSelector((state: any) => state.auth);

  const file = location.state.media[0];

  const { TextArea } = Input;

  useEffect(() => {
    setImageSRC(URL.createObjectURL(file));
    setImageAttr(file);
  }, []);

  const openNotificationWithIcon = (
    type: IconType,
    msg: any,
    desc: any
  ): void => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  const post = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${readCookie("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("files", imageAttr as Blob);
    formData.append("caption", caption);

    axios
      .post(`${REACTURL}/api/feeds`, formData, config)
      .then((res) => {
        console.log(res.data);
        openNotificationWithIcon("success", "Success", "Post has been created");
        history("/");
      })
      .catch((err) => {
        openNotificationWithIcon("error", "Error", "Unexpected error");
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

  useEffect(() => {
    if (width < 639) {
      setMobileMode(true);
    } else {
      setMobileMode(false);
    }
  }, [width]);

  return (
    <>
      <Navbar />
      {mobileMode && <NavbarMobile />}
      <div className="mainWrapper">
        <div
          className={styles.createWrapper}
          style={{ margin: mobileMode ? "0 1rem" : "auto" }}
        >
          <div className={styles.createHeader}>
            <CloseOutlined
              className={styles.menuIcon}
              onClick={() => {
                history("/");
              }}
            />
            <p style={{ marginBottom: 0 }}>New Post</p>
            <strong
              onClick={() => post()}
              style={{ color: "#0095f6", cursor: "pointer" }}
              data-test="input-feed-submit"
            >
              Share
            </strong>
          </div>
          <div className={styles.createBody}>
            <div className={styles.profilePicture}>
              <img src={auth.profilePic} alt="" />
            </div>
            <div className={styles.inputWrapper}>
              <TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder="Write a caption..."
                bordered={false}
                onChange={(e) => setCaption(e.target.value)}
                data-test="input-feed-caption"
              />
            </div>
            <div className={styles.postImage}>
              <img src={imageSRC as string} alt="" />
            </div>
          </div>
          <div className={styles.createFooter}>
            <Row className={styles.footerItem}>
              <p style={{ marginBottom: 0 }}>Add Location</p>
              <RightOutlined className={styles.menuIcon} />
            </Row>
            <Row className={styles.footerItem}>
              <p style={{ marginBottom: 0 }}>Tag People</p>
              <RightOutlined className={styles.menuIcon} />
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
