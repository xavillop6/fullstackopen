import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log('NOT', notification);
  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  return <div className={type}>{message}</div>;
};

export default Notification;
