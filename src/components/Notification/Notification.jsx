import { useGlobalSearch } from "../../context/Search&Notification";
import ListNotifi from "../listNotifi/ListNotifi";
import NotifiBar from "../notifiBar/NotifiBar";
import "./notification.scss";

const Notification = () => {
  const { isNotifiOpen } = useGlobalSearch();
  return (
    <div className={isNotifiOpen ? "show-notifi " : "notifi"}>
      <NotifiBar />
      <ListNotifi />
    </div>
  );
};

export default Notification;
