import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AllProducts() {
  const [data, setData] = useState([]);
  const { category,searchQuery } = useParams();


  useEffect(()=>{
    
    let url = "https://dummyjson.com/products"; 
    if (searchQuery) {
        url = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else if (category) {
        url = `https://dummyjson.com/products/category/${category}`;
    }

    //console.log(category)
    axios.get(url)
      .then((response) => {
        setData(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },[category,searchQuery]);
  //console.log(searchQuery)

  return (
    <Container className="mt-4">
      <Row className="g-4"> 
        {data.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3}> 
            <Card className="h-100 shadow-sm"> 
              <Card.Img variant="top" src={item.thumbnail} alt={item.title} />
              <Card.Body>
                <Card.Title className="fw-bold">{item.title}</Card.Title>
                <Card.Text className="text-muted small">{item.description}</Card.Text>
                <Button variant="primary" className="w-100" as={Link}
                  to={`/product/${item.id}`}
                  >View Product</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllProducts;
