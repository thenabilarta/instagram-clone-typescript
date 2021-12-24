import { useNavigate } from "react-router-dom";
import styles from "./navbarmobile.module.css";
import instagramlogo from "../../assets/instagramlogo.png";

function Navbar() {
  const history = useNavigate();

  return (
    <div className={styles.navbarWrapperMobile}>
      <div className={styles.navbarInnerWrapperMobile}>
        <div className={styles.navbarMobile}>
          <div className={styles.logoWrapperMobile}>
            <img
              onClick={() => history("/")}
              className={styles.logoMobile}
              src={instagramlogo}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
