import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import CreateBook from "./CreateBook";

function Book() {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if(setSelectedCategory){
          url += `?category=${selectedCategory}`;
          console.log(url);
        }
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError("Error fetching data. Please try again later");
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Books</h1>
      <p>
        This is where we use node JS, Express and MongoDB to grab some data .
        The data below is pulled from a mongoDB database{" "}
      </p>

      <p>
        <Link to='/createbook' >
          + Add New Book
        </Link>
      </p>

      <h2>Fetch Example</h2>
      {/* <pre>{JSON.stringify(data,null, 2)}</pre> */}

      <div className="filters">
        <label htmlFor="">Categories</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>

          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">Other</option>

        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <ul className="books">
          {data?.map((book) => {
            return (
              <li key={book._id}>
                <Link to={`/books/${book.slug}`}>
                  <img
                    src={`http://localhost:8000/uploads/${book.thumbnail}`}
                    alt={book.title}
                  />
                  <h3> {book.title} </h3>
                </Link>
                {console.log(book.title)}
              </li>
            );
          })}
          {console.log(data.length)}
        </ul>
      )}
    </div>
  );
}

export default Book;
