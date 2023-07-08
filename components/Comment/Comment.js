import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";

const padStart = (value) => {
  return String(value).padStart(2, "0");
};

export const transformDate = (dateNow) => {
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const date = new Date(dateNow);
  const minutes = date.getMinutes();
  const hour = date.getHours();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const fixedData = year;
  return `${padStart(day)} ${months[month]}, ${year} | ${padStart(
    hour
  )}:${padStart(minutes)}`;
};

import {
  container,
  avatar,
  messageWrapper,
  message,
  date,
} from "./CommentStyles";

const Comment = ({ comment }) => {
  const { name } = useSelector(selectUser);
  const isUserAuthor = comment.author === name ? true : false;

  return (
    <View style={[container, isUserAuthor && { flexDirection: "row-reverse" }]}>
      <Image
        source={
          isUserAuthor
            ? require("../../assets/userImage.jpg")
            : require("../../assets/guestAvatar.jpg")
        }
        style={avatar}
      />
      <View
        style={[
          messageWrapper,
          isUserAuthor && { borderTopRightRadius: 0, borderTopLeftRadius: 6 },
        ]}
      >
        <Text style={message}>{comment.message}</Text>
        <Text style={[date, isUserAuthor && { textAlign: "left" }]}>
          {transformDate(comment.addedOn)}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
