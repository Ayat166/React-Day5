import axios from "axios";
import React, { useEffect, useState,useContext  } from "react";
import { Navbar, Nav, Container, Button, Badge, Dropdown ,Form} from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";

function UpperNavBar() {
  const [data, loadData] = useState([]);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        loadData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  //console.log(data)

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            My E-Commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {data.slice(0, 5).map((item) => {
                const linkPath = `/products/${item.slug}`;
                return (
                  <Nav.Link
                    as={Link}
                    to={linkPath}
                    key={item.slug}
                    className={location.pathname === linkPath ? "active" : ""}
                  >
                    {item.name}
                  </Nav.Link>
                );
              })}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="outline-success"
                type="submit"
                as={Link}
                to={searchTerm.trim() ? `/search-products/${searchTerm}` : "/"}
                disabled={!searchTerm.trim()}
              >
                Search
              </Button>
              {/* Cart Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary">
                  Cart <Badge bg="danger">{cart.length}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: "300px" }}>
                  {cart.length === 0 ? (
                    <Dropdown.Item>No items in cart</Dropdown.Item>
                  ) : (
                    cart.map((item) => (
                      <Dropdown.Item key={item.id}>
                        {item.title} - ${item.price}
                        <Button
                          variant="light"
                          size="sm"
                          className="ms-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ❌
                        </Button>
                      </Dropdown.Item>
                    ))
                  )}
                  
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default UpperNavBar;
