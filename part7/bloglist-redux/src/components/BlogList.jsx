import { useSelector } from "react-redux";
import Blog from "./Blog";
import AddBlogForm from "./AddBlogForm";

export const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <AddBlogForm />
      {blogs &&
        blogs.map((blog) => <Blog key={blog.id} blog={blog}/>)}
    </div>
  );
};  
