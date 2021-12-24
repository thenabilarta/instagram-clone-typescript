/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "../store/actions/auth";

// eslint-disable-next-line func-names
export default function (
  ComposedClass: any,
  loading: any,
  setLoading: any
): any {
  const history = useNavigate();

  function AuthenticationCheck() {
    const dispatch = useDispatch<any>();

    useEffect(() => {
      let isMounted = true;

      if (isMounted) {
        dispatch(auth()).then((res: any) => {
          if (!res.payload.isLoggedIn) {
            history("/login");
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ComposedClass loading={loading} setLoading={setLoading} />;
  }
  return AuthenticationCheck();
}
