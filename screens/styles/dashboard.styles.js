import { StyleSheet, Dimensions } from "react-native";
import { APP_MAIN_BG_COLOR } from "../../utils/constants";

export const windowHeight = Dimensions.get("window").height;

export const profileStyles = StyleSheet.create({
  container: {
    backgroundColor: APP_MAIN_BG_COLOR,
    top: 0,
    height: windowHeight * 0.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  personName: {
    color: "white",
    marginTop: 5,
  },
  scoreContainer: {
    position: "absolute",
    top: "15%",
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  scoreText: {
    color: "white",
    fontWeight: "bold",
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
});

export const profilePhotoStyles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export const levelProgressStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    bottom: 0,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginRight: 15,
  },
  progressBar: {
    width: 100,
    height: 7,
    backgroundColor: "transparent",
  },
});

export const badgeStyles = StyleSheet.create({
  outerContainer: {
    flexWrap: "wrap",
    margin: 15,
  },
  imageContainer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "black",
    height: 90,
    borderRadius: 5,
    marginTop: 5,
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
  },
});

export const inProgressStyles = StyleSheet.create({
  outerContainer: {
    flexWrap: "wrap",
    margin: 15,
    marginTop: 5,
  },
  imageContainer: {
    padding: 10,
    marginTop: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailContainer: {
    width: "75%",
    alignContent: "center",
    overflow: "hidden",
    // textOverflow: "hidden",
  },
  detailContainerText: {
    fontSize: 12,
    // textOverflow: "ellipsis",
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  scoreContainer: {
    position: "absolute",
    bottom: "15%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    borderRadius: 20,
    color: "black",
    backgroundColor: "#D3D3D3",
    right: 0,
  },
  scoreText: {
    color: "black",
    fontSize: 10,
  },
});
