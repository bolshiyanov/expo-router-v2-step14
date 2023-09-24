import React, { useMemo } from "react";
import { Link } from "expo-router";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import transformLanguageData from "@/components/LanguageComponents/TranslateComponent/transformLanguageData";
import { DataShopTypeInterface } from "@/constants/types/dataShopType";
import { useAppSelector } from "@/components/utils/hooks/redux";
import { __ } from "@/components/LanguageComponents/TranslateComponent/systemTranslatre";
import Colors from "config";
import { transformDate } from "@/components/utils/transformDate";
import { currency } from "config";
interface RenderItemProps {
  langPage: any;
  item: DataShopTypeInterface;
}

const ShopSmallCardScreen: React.FC<RenderItemProps> = ({ langPage, item }) => {
  const theme = useAppSelector((state) => state.themeSlice.theme);
  const selectedTheme = theme === "dark" ? Colors.dark : Colors.light;
  const isProduction = process.env.NODE_ENV === "production";

  const sortType = useAppSelector((state) => state.sortTypeSlice.sortType);
  let typeSort = "";
  if (sortType === "publishDateNew" || sortType === "publishDateOld") {
    typeSort = "dateCreate";
  }

  if (sortType === "totalReadsLot" || sortType === "totalReadsLittle") {
    typeSort = "totalReads";
  }

  if (sortType === "likesLot" || sortType === "likesLittle") {
    typeSort = "like";
  }

  const bottonText = __("Add");

  return (
    <Link
      href={`/${langPage}/shop/${
        isProduction ? item.path + ".html" : item.path
      }`}
      asChild
    >
      <Pressable>
        <View
          style={[
            styles.card,
            { backgroundColor: selectedTheme.backgroundNav },
          ]}
        >
          <Image style={styles.image} source={{ uri: item.image }} />

          <View style={styles.contentContainer}>
            <View style={styles.topContentContainer}>
              <View style={styles.titleContainer}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[styles.title, { color: selectedTheme.text }]}
                >
                  {transformLanguageData("name", langPage, item)}
                </Text>
              </View>
              <View
                style={[
                  styles.descriptionContainer,
                  { borderLeftColor: selectedTheme.borderBottomLine },
                ]}
              >
                <View
                  style={[
                    styles.gradientOverlay,
                    {
                      backgroundColor: "transparent",
                      backgroundImage: `linear-gradient(to bottom, ${selectedTheme.transporentTop},
                 ${selectedTheme.backgroundNav} )`,
                    },
                  ]}
                />
                <Text
                  ellipsizeMode="tail"
                  style={[
                    styles.description,
                    { color: selectedTheme.subTitle },
                  ]}
                >
                  {transformLanguageData("descriptions", langPage, item)}
                </Text>
              </View>
            </View>

            <View style={styles.bottomContentContainer}>
              <View style={styles.buttonContainer}>
                <Text
                  style={[
                    styles.button,
                    {
                      color: selectedTheme.tint,
                      borderColor: selectedTheme.borderLine,
                    },
                  ]}
                >
                  {bottonText}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                {item.price > 0 && (
                  <>
                    <Text
                      style={[
                        styles.number,
                        { color: selectedTheme.borderBottomLine },
                      ]}
                    >
                      {item.price}
                    </Text>
                    <Text
                      style={[
                        styles.number,
                        { color: selectedTheme.borderBottomLine },
                      ]}
                    >
                      {currency}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
          {item.offer !== "" && (
            <View style={styles.offerContentContainer}>
              <Text style={styles.offer}>{item.offer}</Text>
            </View>
          )}
        </View>
        {typeSort !== "" && (
        <View
          style={[
            styles.numberContainer,
            { backgroundColor: selectedTheme.backgroundNav },
          ]}
        >
          <Text
            style={[styles.transformDate, { color: selectedTheme.borderBottomLine }]}
          >
            {transformDate(item[typeSort])}
          </Text>
        </View>
      )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: 270,
    height: 330,
    marginHorizontal: 4,
    paddingHorizontal: 4,
    marginBottom: 100,
  },
  image: {
    aspectRatio: 1,
    width: "90%",
    marginTop: -90,
  },
  contentContainer: {
    display: "flex",
    height: 183,

    padding: 12,
    width: "100%",
  },

  topContentContainer: {
    width: "100%",
    overflow: "hidden",
    height: 110,
    minHeight: 110,
    marginBottom: 6,
  },
  titleContainer: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 22,
  },
  descriptionContainer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    borderLeftWidth: 5,
    position: "relative",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  description: {
    width: "100%",
    fontSize: 16,
    paddingLeft: 6,
    lineHeight: 18,
  },
  bottomContentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    overflow: "hidden",
    height: 45,
    minHeight: 45,
    marginBottom: 6,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    padding: 6,
    paddingBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: "center",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "50%",
    minWidth: "50%",
    marginRight: 12,
  },
  number: {
    fontSize: 28,
    padding: 2,
  },
  offerContentContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    top: -80,
    left: 30,
    borderRadius: 25,
    backgroundColor: "red",
  },
  offer: {
    fontWeight: "800",
    color: "white",
    fontSize: 18,
    padding: 6,
    paddingBottom: 8,
  },
  numberContainer: {
    position: "absolute",
    right: 30,
    top: -73,
    padding: 3,
    borderRadius: 8,
    minWidth: 24,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  transformDate: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  }
});

export default React.memo(ShopSmallCardScreen);
