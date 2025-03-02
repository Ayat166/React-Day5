import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

function UpperNavBar() {
  const [data, loadData] = useState([]);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
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
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default UpperNavBar;
