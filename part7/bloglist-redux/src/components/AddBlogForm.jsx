import { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const handleAddBlog = (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(newBlog));

      dispatch(
        setNotification(
          {
            message: `a new blog ${title} by ${author} added`,
            type: "success",
          },
          5,
        ),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setNotification(
          {
            message: "error when adding a new blog",
            type: "error",
          },
          5,
        ),
      );
    }
  };

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </Togglable>
  );
};

export default AddBlogForm;
