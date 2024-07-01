import { useSelector } from "react-redux";
import Blog from "./Blog";
import AddBlogForm from "./AddBlogForm";
import { Row } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <h3>Blogs</h3>
      <AddBlogForm />
      <Row xs={1} md={2} className="g-4">
      {blogs &&
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
        </Row>
    </div>
  );
};  

export default BlogList