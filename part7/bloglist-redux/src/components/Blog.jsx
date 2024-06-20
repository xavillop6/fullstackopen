import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    try {
      dispatch(addLike(blog));
    } catch (error) {
      dispatch(
        setNotification(
          { message: "error when updating a blog", type: "error" },
          5,
        ),
      );
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog));
      } catch (error) {
        dispatch(
          setNotification(
            { message: "error when removing a blog", type: "error" },
            5,
          ),
        );
      }
    }
  };

  const showRemove = blog.user.username === user.username;
  const showWhenVisible = { display: showDetails ? "" : "none" };

  return (
    <div style={blogStyle} className="blog">
      <div className="whenHidden">
        {blog.title} {blog.author}{" "}
        <button className="viewButton" onClick={toggleShowDetails}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible} className="whenVisible">
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}{" "}
          <button className="likeButton" onClick={handleLike}>
            likes
          </button>
        </div>
        <div>{blog.user !== null && blog.user.name}</div>
        {showRemove && (
          <button className="removeButton" onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
