
import React, { useEffect, useState ,useContext} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col ,Image} from "react-bootstrap";
import { CartContext } from "../components/CartContext";

function ProductDetails() {
  const [product, loadProduct] = useState({});
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        loadProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Image src={product.thumbnail} alt={product.title} fluid rounded />
          </Col>
          <Col md={6}>
            <h2>{product.title}</h2>
            <p className="text-muted">{product.category}</p>
            <h4 className="text-success">${product.price}</h4>
            <p>{product.description}</p>
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add to Cart 🛒
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetails;
