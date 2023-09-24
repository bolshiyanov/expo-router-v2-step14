import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";
import Colors from "config";

const DATA = [
  {
    title: "Category",
    id: 0,
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Filters",
    id: 1,
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Types",
    id: 2,
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "KeyWords",
    id: 3,
    data: ["Cheese Cake", "Ice Cream"],
  },
];

const CategoriesMenuComponent = () => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  return (
    <View
      style={[
        styles.containerForMenu,
        {
          backgroundColor: selectedTheme.backgroundNav,
          borderRightColor: selectedTheme.borderLine,
        },
      ]}
    >
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: selectedTheme.backgroundNav,
            borderRightColor: selectedTheme.borderLine,
          },
        ]}
      >
        <SectionList
          sections={DATA}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text  numberOfLines={1}
              ellipsizeMode="tail"style={[styles.title, { color: selectedTheme.text }]}>
                {item}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { title, id } }) => (
            <View
              style={[
                styles.headerContainer,
                { borderColor: id === 0 ? selectedTheme.backgroundNav : selectedTheme.borderLine},
              ]}
            >
              <Text  numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.header, { color: selectedTheme.text }]}>
                {title}
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerForMenu: {
    position: "absolute",
    left: 0,
    top: 60,
    width: 180,
    borderRightWidth: 1,
    height: "100%",
    zIndex:2
  },
  
  container: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "flex-start",
    width: "100%",
    paddingRight: 12,
  },
  
  item: {
    marginBottom: 12,
    marginLeft: 6
  },
  headerContainer: {
    borderTopWidth: 1,
    marginVertical: 12,
    padding: 6,
    marginRight: 18
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
    

  },
  title: {
    fontSize: 14,
  },
});

export default CategoriesMenuComponent;
