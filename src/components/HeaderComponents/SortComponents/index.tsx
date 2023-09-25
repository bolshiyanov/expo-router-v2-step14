import React, { useState } from "react";
import { Platform, Pressable, View, Text, StyleSheet } from "react-native";
import { TabBarIcon } from "@/components/navigatorComponents/tab-bar-icon";
import { useAppDispatch, useAppSelector } from "@/components/utils/hooks/redux";
import { searchedPostsData } from "@/store/reducers/PostsSearchSlice";
import { searchedShopData } from "@/store/reducers/ShopsSearchSlice";
import { sortTypeSliceAction } from "@/store/reducers/SortTypeSlice";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";
import { useWidth } from "@/components/utils/useWidth";

const SortingComponent = ({ page }) => {
  const postsData = useAppSelector((state) => state.postsData);
  const shopData = useAppSelector((state) => state.shopData);

  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const [sortingOption, setSortingOption] = useState("");

  const dispatch = useAppDispatch();

  const handleSortingChange = (option: string) => {
    if (option === sortingOption) {
      setSortingOption(null);
    } else {
      setSortingOption(option);

      const sortedData = handleSort(option);
      if (page === "blog") {
        dispatch(searchedPostsData(sortedData));
      } else {
        dispatch(searchedShopData(sortedData));
      }
      dispatch(sortTypeSliceAction(option));
    }
  };

  const messageInUpOfSorting = `${
    page === "blog" ? __("Published") : __("ItemsAddDate")
  }`;
  const messageInMiddleOfSorting = `${page === "blog" ? __("Reads") : __("TotalAddToCart")}`;
  const messageInBottonOfSorting = `${page === "blog" ? __("Likes") : __("Likes")}`;

  const handleSort = (option) => {
    
    const withOutZeroPublishedData = page === "blog"
  ? postsData.filter((item) => item.dateCreate !== 0)
  : shopData.filter((item) => item.dateCreate !== 0);
  
  const withOutZeroReadData = page === "blog"
  ? postsData.filter( (item) => item.totalReads !== 0 )
  : shopData.filter( (item) => item.totalReads !== 0 )

    const withOutZeroLikeData = page === "blog"
    ? postsData.filter((item) => item.like !== 0)
    : shopData.filter((item) => item.like !== 0)

    let sortedData = [];
    switch (option) {
      case "publishDateNew":
        sortedData = [...withOutZeroPublishedData].sort(
          (a, b) => a.dateCreate - b.dateCreate
        );
        break;

      case "publishDateOld":
        sortedData = [...withOutZeroPublishedData].sort(
          (a, b) => b.dateCreate - a.dateCreate
        );
        break;

      case "totalReadsLot":
        sortedData = [...withOutZeroReadData].sort(
          (a, b) => a.totalReads - b.totalReads
        );
        break;

      case "totalReadsLittle":
        sortedData = [...withOutZeroReadData].sort(
          (a, b) => b.totalReads - a.totalReads
        );
        break;

      case "likesLot":
        sortedData = [...withOutZeroLikeData].sort((a, b) => b.like - a.like);
        break;

      case "likesLittle":
        sortedData = [...withOutZeroLikeData].sort((a, b) => a.like - b.like);
        break;

      default:
        // Handle default case or other sorting options
        break;
    }

    return sortedData;
  };
  return (
    <View
      style={[styles.container, { marginLeft: page === "shop" && useWidth(768) ? 180 : 0 }]}
    >
      <View style={styles.sortingsContainer}>
        {/* firstSorting */}
        <View style={styles.sortingContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, { color: selectedTheme.subTitle }]}
          >
            {messageInUpOfSorting}
          </Text>
          <View style={styles.iconsContainer}>
            <View style={[styles.iconContainer]}>
              <Pressable onPress={() => handleSortingChange("publishDateNew")}>
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={
                      sortingOption === "publishDateNew"
                        ? selectedTheme.borderBottomLine
                        : selectedTheme.iconColors
                    }
                    style={{
                      marginHorizontal: 6,
                      marginTop: 5,
                      ...(Platform.OS === "web" && {
                        transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                      }),
                      ...(pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      }),
                    }}
                    name="arrow-down-wide-short-solid"
                  />
                )}
              </Pressable>
            </View>
            <View style={[styles.iconContainer]}>
              <Pressable onPress={() => handleSortingChange("publishDateOld")}>
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={
                      sortingOption === "publishDateOld"
                        ? selectedTheme.borderBottomLine
                        : selectedTheme.iconColors
                    }
                    style={{
                      marginHorizontal: 6,
                      marginTop: 5,
                      ...(Platform.OS === "web" && {
                        transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                      }),
                      ...(pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      }),
                    }}
                    name="arrow-up-short-wide-solid"
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {/* secondSorting */}
        <View style={styles.sortingContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, { color: selectedTheme.subTitle }]}
          >
            {messageInMiddleOfSorting}
          </Text>
          <View style={styles.iconsContainer}>
            <View style={[styles.iconContainer]}>
              <Pressable onPress={() => handleSortingChange("totalReadsLot")}>
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={
                      sortingOption === "totalReadsLot"
                        ? selectedTheme.borderBottomLine
                        : selectedTheme.iconColors
                    }
                    style={{
                      marginHorizontal: 6,
                      marginTop: 5,
                      ...(Platform.OS === "web" && {
                        transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                      }),
                      ...(pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      }),
                    }}
                    name="arrow-down-wide-short-solid"
                  />
                )}
              </Pressable>
            </View>
            <View style={[styles.iconContainer]}>
              <Pressable
                onPress={() => handleSortingChange("totalReadsLittle")}
              >
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={
                      sortingOption === "totalReadsLittle"
                        ? selectedTheme.borderBottomLine
                        : selectedTheme.iconColors
                    }
                    style={{
                      marginHorizontal: 6,
                      marginTop: 5,
                      ...(Platform.OS === "web" && {
                        transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                      }),
                      ...(pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      }),
                    }}
                    name="arrow-up-short-wide-solid"
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {/* thirdSorting */}
        <View style={styles.sortingContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.title, { color: selectedTheme.subTitle }]}
          >
            {messageInBottonOfSorting}
          </Text>
          <View style={styles.iconsContainer}>
            <View style={[styles.iconContainer]}>
              <Pressable onPress={() => handleSortingChange("likesLot")}>
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={
                      sortingOption === "likesLot"
                        ? selectedTheme.borderBottomLine
                        : selectedTheme.iconColors
                    }
                    style={{
                      marginHorizontal: 6,
                      marginTop: 5,
                      ...(Platform.OS === "web" && {
                        transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                      }),
                      ...(pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      }),
                    }}
                    name="arrow-down-wide-short-solid"
                  />
                )}
              </Pressable>
            </View>
            <View style={[styles.iconContainer]}>
              <Pressable onPress={() => handleSortingChange("likesLittle")}>
                {({ pressed, hovered }) => (
                  <TabBarIcon
                    color={
                      sortingOption === "likesLittle"
                        ? selectedTheme.borderBottomLine
                        : selectedTheme.iconColors
                    }
                    style={{
                      marginHorizontal: 6,
                      marginTop: 5,
                      ...(Platform.OS === "web" && {
                        transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
                      }),
                      ...(pressed && {
                        transform: [{ scale: 0.9 }],
                        opacity: 0.8,
                      }),
                    }}
                    name="arrow-up-short-wide-solid"
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 12,
    marginRight: 20,
  },
  title: {
    marginHorizontal: 12,
    marginVertical: 6,
    fontSize: 16,
  },
  sortingsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  sortingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    width: "100%",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: 60,
  },
  iconContainer: {},
});

export default SortingComponent;