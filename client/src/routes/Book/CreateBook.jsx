import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);

  const createBook = async (e) => {
    e.preventDefault();

    console.table([title, slug]);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });

      // const response = await fetch("http://localhost:8000/api/books", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({
      //     title: title,
      //     slug: slug,
      //     stars: stars,
      //     description: description,
      //     categories: categories,
      //   }),
      // });

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

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use nodeJS, ExpressJS and MongoDB to grab some data.
        The data below is pulled from MongoDB database.
      </p>

      {submitted ? (
        <p>Data submitted successful</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>
              Upload Thumbnail
              <img src={image} alt="preview image" />
              <input
                onChange={onImageChange}
                type="file"
                accept="image/gif, image/jpeg, image/png "
              />
            </label>
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

export default CreateBook;
