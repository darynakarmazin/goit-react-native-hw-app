import MessageIcon from "../../assets/icons/MessageIcon";
import ThumbsUpIcon from "../../assets/icons/ThumbsUpIcon";
import MapIcon from "../../assets/icons/MapIcon";
import PostImage from "../PostImage/PostImage";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addLike } from "../../redux/posts/postsOperations";
import { selectUID } from "../../redux/auth/authSelectors";

import {
  title,
  infoContainer,
  infoWrapper,
  positioning,
  counts,
  locationText,
} from "./PostStyles";

const Post = ({
  post: { id, image, name, likesCount, location, comments },
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUID);

  const messagePressHandler = (id) => {
    navigation.navigate("CommentsScreen", id);
  };

  const mapPressHandler = () => {
    navigation.navigate("MapScreen", location.coordinates);
  };

  return (
    <View>
      <PostImage source={image} />
      <Text style={title}>{name}</Text>
      <View style={infoContainer}>
        <View style={positioning}>
          <View style={infoWrapper}>
            <TouchableOpacity onPress={() => messagePressHandler(id)}>
              <MessageIcon commentsCount={comments.length} />
            </TouchableOpacity>
            <Text style={[counts, !comments.length && { color: "#BDBDBD" }]}>
              {comments.length}
            </Text>
          </View>
          {route.name === "ProfileScreen" && (
            <View style={infoWrapper}>
              <TouchableOpacity onPress={() => dispatch(addLike({ uid, id }))}>
                <ThumbsUpIcon likesCount={likesCount} />
              </TouchableOpacity>
              <Text style={[counts, !likesCount && { color: "#BDBDBD" }]}>
                {likesCount}
              </Text>
            </View>
          )}
        </View>
        <View style={infoWrapper}>
          <TouchableOpacity onPress={() => mapPressHandler(id)}>
            <MapIcon />
          </TouchableOpacity>
          <Text style={locationText}>
            {route.name === "ProfileScreen"
              ? `${location.country}`
              : `${location.region}, ${location.country}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Post;
