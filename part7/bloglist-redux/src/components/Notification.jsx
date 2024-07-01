import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }


  const { message, type } = notification;

  const variant = type === "error" ? "danger" : "success";


  return <Alert variant={variant}>{message}</Alert>;
};

export default Notification;
