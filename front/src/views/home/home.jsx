import { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import { products as initialProducts } from "../../helpers/homeProducts"; // Asegúrate de que la ruta sea correcta
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearNotification } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const notification = useSelector((state) => state.user.notification);
  const userLogged = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(`Estado de logueo del usuario ${userLogged}`);

  useEffect(() => {
    setProducts(initialProducts);
    if (notification) {
      toast.success(notification, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      dispatch(clearNotification());
    }
  }, [notification, dispatch]);

  const handleButtonClick = () => {
    if(userLogged) {
      navigate("/setAppointment");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={styles.homeContainer}>
      <ToastContainer />
      <header className={styles.header}>
        <h1 className={styles.title}>¡Pide ya tu muñeco tejido personalizado!</h1>
        <p className={styles.subtitle}>Cada muñeco es único, hecho a mano con amor y dedicación.</p>
        <br />
        <button className={styles.ctaButton} onClick={handleButtonClick}>¡Ordena Ahora!</button>
      </header>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <Card
            key={product.productTitle}
            productImg={product.productImg}
            productTitle={product.productTitle}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
