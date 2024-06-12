import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Acerca de Nosotros</h1>
      <p className={styles.description}>
        Somos un equipo de artesanos dedicados a crear muñecos tejidos únicos y personalizados. Cada pieza es hecha a mano con los mejores materiales, garantizando calidad y durabilidad. Nos apasiona lo que hacemos y ponemos nuestro corazón en cada muñeco que creamos.
      </p>
      <h2 className={styles.subtitle}>Nuestra Misión</h2>
      <p className={styles.description}>
        Nuestra misión es ofrecer productos artesanales de alta calidad que traigan alegría y confort a nuestros clientes. Creemos en la sostenibilidad y en el apoyo a los artesanos locales, y nos esforzamos por minimizar nuestro impacto ambiental.
      </p>
      <h2 className={styles.subtitle}>Contáctanos</h2>
      <p className={styles.description}>
        Si tienes alguna pregunta o deseas hacer un pedido personalizado, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte a crear el muñeco perfecto para ti o tus seres queridos.
      </p>
    </div>
  );
}