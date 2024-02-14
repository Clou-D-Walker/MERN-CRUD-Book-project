import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function EditBook() {
  const navigate = useNavigate();
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();

      setBookId(data._id);
      setTitle(data.title);
      setSlug(data.slug);
      setStars(data.stars);
      setCategories(data.category);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBook = async (e) => {
    e.preventDefault();

    // console.table([title, slug]);

    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
        console.log(response.ok);
      } else {
        console.log("Failed to submit data");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const removeBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/books/" + bookId,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/books");
        console.log("Book removed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <p>
        This is where we use nodeJS, ExpressJS and MongoDB to grab some data.
        The data below is pulled from MongoDB database.
      </p>

      <button onClick={removeBook} className="delete">
        Delete Book
      </button>

      {submitted ? (
        <p>Data submitted successful</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail </label>
            {image ? (
              <img src={`${image}`} alt="preview image" />
            ) : (
              <img
                src={`http://localhost:8000/uploads/${thumbnail}`}
                alt="preview image"
              />
            )}

            <input
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png "
            />
          </div>

          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>
                Slug
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                Stars
                <input
                  type="text"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                Description
                <textarea
                  rows="4"
                  cols="50"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                Categories (comma-separated)
                <input
                  type="text"
                  value={categories}
                  onChange={handleCategoryChange}
                />
              </label>
            </div>

            <input type="submit" style={{ cursor: "pointer" }} />
          </div>
        </form>
      )}
    </div>
  );
}

export default EditBook;
