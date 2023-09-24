import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { useAppSelector } from "@/components/utils/hooks/redux";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { ScrollView } from "react-native-gesture-handler";
import FooterComponent from "@/components/FooterComponent";
import { transformDate } from "@/components/utils/transformDate";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import ColorButtons from "../../ColorButtons";
import LikeComponent from "@/components/LikeComponent";
import Colors from "config";

const BlogPagesComponent = ({ langPage }) => {
  const data = useAppSelector((state) => state.shopData);
  const isProduction = process.env.NODE_ENV === "production";
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const [expanded, setExpanded] = useState(false);
  const [openFullContent, setOpenFullContent] = useState(false);

  const toggleImageSize = () => {
    setExpanded(!expanded);
  };

  const publishTitile = __("Published");
  const readMore = __("Read more");

  const { path } = useLocalSearchParams();

  let updatedPath = path;
  if (isProduction && typeof updatedPath === "string") {
    updatedPath = updatedPath.replace(".html", "");
  }
  const selectedPath = Array.isArray(updatedPath)
    ? updatedPath[0]
    : updatedPath;
  const item = data.find((c) => c.path.toString() === selectedPath);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: selectedTheme.background }]}
    >
      {item && (
        <>
          <TouchableOpacity onPress={toggleImageSize}>
            <Image
              style={expanded ? styles.expandedImage : styles.originalImage}
              source={{ uri: item.image }}
            />
            <TouchableOpacity
              onPress={toggleImageSize}
              style={styles.expandedImageText}
            >
              <Text>{expanded ? " 16 : 9 " : " 1 : 1 "}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={styles.boxDetailsContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.titleContainer}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: selectedTheme.text,
                    },
                  ]}
                >
                  {" "}
                  {transformLanguageData("name", langPage, item)}{" "}
                </Text>
                <LikeComponent id={item.id} numbersLike={item.like} page= "shop"/>
              </View>

              <ColorButtons
                type={item.type}
                secondType={item.secondType}
                keyWords={item.keyWords}
                route="../"
                justifyContent={"flex-start"}
                page="shop"
              />
{/* 
              <PostComponent id={item.id} />

              <TotalRead id={item.id} />

              <ReadComponent id={item.id} onClick={openFullContent} /> */}

              {item.descriptionsEn && (
                <>
                  <Text
                    style={[
                      styles.detailsText,
                      {
                        color: selectedTheme.subTitle,
                        borderColor: selectedTheme.borderBottomLine,
                      },
                    ]}
                  >
                    {transformLanguageData("descriptions", langPage, item)}
                  </Text>
                  {openFullContent && (
                    <>
                      <Image
                        style={styles.expandedImage}
                        source={{ uri: item.image }}
                      />
                      <Text
                        style={[
                          styles.detailsText,
                          { color: selectedTheme.subTitle },
                        ]}
                      >
                        {transformLanguageData("descriptions", langPage, item)}
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                        <Text>{"\n\n"}</Text>
                        {transformLanguageData("descriptions", langPage, item)}
                      </Text>
                    </>
                  )}
                  {!openFullContent && (
                    <TouchableOpacity onPress={() => setOpenFullContent(true)}>
                      <Text
                        style={[
                          styles.button,
                          { color: selectedTheme.subTitle },
                        ]}
                      >
                        {readMore}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
        </>
      )}
      <FooterComponent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  originalImage: {
    width: "100%",
    aspectRatio: 24 / 9,
    alignSelf: "center",
  },
  expandedImage: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  expandedImageText: {
    position: "absolute",
    bottom: 5,
    right: 5,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 4,
    textTransform: "uppercase",
    marginBottom: 24,
  },
  publishedTitle: {
    fontSize: 16,
    marginHorizontal: 4,
    marginTop: 16,
    marginBottom: 12,
  },
  boxDetailsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    width: "100%",
  },

  detailsContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    maxWidth: 800,
    width: "100%",
  },
  detailsTexHeader: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
    paddingLeft: 12,
    width: "100%",
    borderLeftWidth: 5,
  },

  detailsText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    padding: 16,
    width: "100%",
  },
  button: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24,

  },
});

export default React.memo(BlogPagesComponent);
