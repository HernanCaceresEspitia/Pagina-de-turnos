import sample from "../../assets/sample1.jpg";
import styles from "./Card.module.css";

export default function Card() {
  return (
    <div className={styles.cardContainer}>
      <img src={sample} alt="Product sample" />
      <div className={styles.textArea}>
        <h4>Únicos y Personalizados</h4>
        <p>
          Cada uno de nuestros muñecos de lana tejidos está hecho a mano con
          dedicación y cuidado, lo que garantiza que cada pieza sea única. Al
          ofrecer personalización, puedes tener un muñeco que refleje tus
          características favoritas o que capture la esencia de un ser querido.
          Esto convierte a nuestros muñecos en regalos perfectos para cualquier
          ocasión especial, desde cumpleaños hasta aniversarios, añadiendo un
          toque personal y memorable que no se encuentra en productos fabricados
          en masa.
        </p>
      </div>
    </div>
  );
}
