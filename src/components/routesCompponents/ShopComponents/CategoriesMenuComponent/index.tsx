import React from "react";
import { useAppSelector, useAppDispatch } from "@/components/utils/hooks/redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Colors from "config";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { categoryIdCheckedAction, categoryNameCheckedAction } from "@/store/reducers/CategorySlice";
import uniqueData from "@/components/utils/uniqueData";

const CategoriesMenuComponent = ({ langPage }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;

  const categoryArray = useAppSelector(
    (state) => state.categorySlice.categories
  );
  const currentName = useAppSelector((state)=> state.categorySlice.checkedNameCategory)

 
  
  const category = uniqueData(categoryArray.map((item) =>
    transformLanguageData("category", langPage, item)
  ));

  const dispatch = useAppDispatch();

  const toggleCategory = (categoryArray, item) => {
    
    for (let i = 0; i < categoryArray.length; i++) {
      const category = categoryArray[i];
      for (const key in category) {
        if (category[key] === item) {
          const id = category.categoryId;
          dispatch(categoryNameCheckedAction(item));
          dispatch(categoryIdCheckedAction(id));
          return null;
        }
      }
    }
  };

  const filters = ["French Fries", "Onion Rings", "Fried Shrimps"];
  const types = ["Water", "Coke", "Beer"];
  const keyWords = ["Cheese Cake", "Ice Cream"];

  const translatedCategory = __("Category");
  const translatedFilters = __("Filters");
  const translatedTypes = __("Types");
  const translatedKeyWords = __("Key words");

  const DATA = [
    {
      title: translatedCategory,
      id: 0,
      data: category,
    },
    // {
    //   title: translatedFilters,
    //   id: 1,
    //   data: filters,
    // },
    // {
    //   title: translatedTypes,
    //   id: 2,
    //   data: types,
    // },
    // {
    //   title: translatedKeyWords,
    //   id: 3,
    //   data: keyWords,
    // },
  ];

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
              <TouchableOpacity onPress={() => toggleCategory(categoryArray, item )}>
                
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.title, { color: 
                    currentName === item 
                    ? selectedTheme.borderBottomLine
                  : selectedTheme.text }]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({ section: { title, id } }) => (
            <View
              style={[
                styles.headerContainer,
                {
                  borderColor:
                    id === 0
                      ? selectedTheme.backgroundNav
                      : selectedTheme.borderLine,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.header, { color: selectedTheme.text }]}
              >
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
    zIndex: 2,
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
    marginLeft: 6,
  },
  headerContainer: {
    borderTopWidth: 1,
    marginVertical: 12,
    padding: 6,
    marginRight: 18,
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