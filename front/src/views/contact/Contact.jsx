import styles from "./contact.module.css";

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1>Contacto</h1>
      <p>Puedes contactarnos a través de los siguientes medios:</p>
      <ul>
        <li>Email: soyhenry@soyhenry.com</li>
        <li>Teléfono: +123456789</li>
        <li>Dirección: Bogotá, Colombia</li>
      </ul>
    </div>
  );
};

export default Contact;