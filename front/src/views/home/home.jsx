import { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import { products as initialProducts } from "../../helpers/homeProducts"; // Asegúrate de que la ruta sea correcta
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearNotification } from "../../slices/userSlice";

export default function Home() {
  const [products, setProducts] = useState([]);
  const notification = useSelector((state) => state.user.notification);
  const dispatch = useDispatch();

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

  return (
    <div className={styles.homeContainer}>
      <ToastContainer />
      <h1 className={styles.title}>¡Pide ya tu muñeco tejido!</h1>
      {products.map((product) => (
        <Card
          key={product.productTitle}
          productImg={product.productImg}
          productTitle={product.productTitle}
          description={product.description}
        />
      ))}
    </div>
  );
}
