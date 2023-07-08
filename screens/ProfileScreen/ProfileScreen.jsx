import Post from "../../components/Post/Post";
// import ProfileTabBar from "../../../components/ProfileTabBar/ProfileTabBar";
import Avatar from "../../components/Avatar/Avatar";
// import LogOutIcon from "../../../img/svg/LogOutIcon";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts } from "../../redux/posts/postsSelectors";
import { selectUser, selectUID } from "../../redux/auth/authSelectors";
import { logOut } from "../../redux/auth/authOperations";
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  scrollContainer,
  container,
  avatarWrapper,
  logOutBtn,
  userName,
} from "./ProfileScreenStyles";

const ProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const uid = useSelector(selectUID);
  const { posts } = useSelector(selectPosts);
  const [isAvatarShown, setIsAvatarShown] = useState(true);
  const userPosts = posts.filter((post) => post.userId === uid);

  const logoutBtnPressHandler = () => {
    dispatch(logOut());
  };

  const avatarToggle = () => {
    setIsAvatarShown((state) => !state);
  };

  return (
    <>
      <View
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <ImageBackground
          source={require("../../assets/photo-bg.png")}
          style={{
            flex: 1,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={[
          scrollContainer,
          userPosts.length < 2 && { flex: 1 },
        ]}
      >
        <View style={[container, userPosts.length < 2 && { flex: 1 }]}>
          <View style={avatarWrapper}>
            <Avatar isAvatarShown={isAvatarShown} avatarToggle={avatarToggle} />
            <TouchableOpacity
              onPress={() => logoutBtnPressHandler()}
              style={{ marginLeft: "auto", marginRight: 16, marginTop: 10 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={userName}>{user.name}</Text>
          {userPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              commentsCount={post.comments.length}
              navigation={navigation}
              route={route}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
