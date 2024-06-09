import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default function Card({
  productImg,
  productTitle,
  description,
}) {
  return (
    <div className={styles.cardContainer}>
      <img src={productImg} alt="Product sample" />
      <div className={styles.textArea}>
        <h4>{productTitle}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  productImg: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
