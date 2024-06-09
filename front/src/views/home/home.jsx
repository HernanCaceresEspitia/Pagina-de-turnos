import { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import { products as initialProducts } from "../../helpers/homeProducts"; // Asegúrate de que la ruta sea correcta

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  return (
    <div>
      <h1>Nuestros productos</h1>
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

