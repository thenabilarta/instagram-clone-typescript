import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import loginBanner from "../../assets/instagramloginbanner.png";
import logo from "../../assets/loginlogo.png";
import styles from "./login.module.css";
import { loginUser } from "../../store/actions/auth";

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [imageListCounter, setImageListCounter] = useState(0);
  const [mobileMode, setMobileMode] = useState(false);

  const auth = useSelector((state: any) => state.auth);

  const history = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      history("/");
    }
  }, [auth.isLoggedIn, history]);

  console.log(auth);

  const dispatch = useDispatch<any>();

  const onSubmit = (values: any) => {
    console.log(values);

    let dataToSubmit = {
      username: values.username,
      password: values.password,
    };

    dispatch(loginUser(dataToSubmit)).then((res: any) => {
      console.log(res);
      if (!res.payload.isLoggedIn) {
        setIsError(true);
      } else {
        // document.cookie = `token=${res.payload.token};`;
        // window.location.href = "/";
        history("/");
      }
    });

    // setIsError(false);

    // dispatch(login(dataToSubmit)).then((res) => {
    //   if (!res.payload.loggedIn) {
    //     setIsError(true);
    //   } else {
    //     document.cookie = `token=${res.payload.token};`;
    //     window.location.href = "/";
    //   }
    // });
  };

  const imageList = [
    "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
    "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg",
    "https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg",
    "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
    "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
  ];

  setTimeout(() => {
    if (imageListCounter === imageList.length - 1) {
      setImageListCounter(0);
    } else {
      setImageListCounter(imageListCounter + 1);
    }
  }, 5000);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleForgotPassword = () => {
    history("/forgot-password");
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
    <div className={styles.loginWrapper}>
      {!mobileMode && (
        <div className={styles.bannerWrapper}>
          <img className={styles.outerBanner} src={loginBanner} alt="" />
          <div className={styles.innerBanner}>
            <img src={imageList[imageListCounter]} alt="" />
          </div>
        </div>
      )}
      <div className={styles.loginBoxWrapper}>
        <div className={styles.loginBox}>
          <div className={styles.loginBoxHeader}>
            <img src={logo} alt="" />
          </div>
          <div>
            <div style={{ padding: "1rem 1.5rem 0.1rem 1.5rem" }}>
              {isError && (
                <Alert
                  style={{ margin: "0.5rem 0" }}
                  message="Username or Password not found."
                  type="error"
                />
              )}
              <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Username"
                    style={{ height: 36 }}
                    data-test="input-username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    style={{ height: 36 }}
                    data-test="input-password"
                  />
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      data-test="button-login-submit"
                    >
                      Submit
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
              <Row>
                <Button
                  style={{ padding: 0, fontSize: 12, margin: "auto" }}
                  type="link"
                  onClick={handleForgotPassword}
                >
                  Forgot your password?
                </Button>
              </Row>
            </div>
          </div>
        </div>
        <div className={styles.registerBox}>
          Don't have an account?{" "}
          <strong
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              history("/register");
            }}
          >
            Sign up
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Login;
