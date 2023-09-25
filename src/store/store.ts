import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsData from "./reducers/PostsDataSlice";
import postsSearch from "./reducers/PostsSearchSlice";
import shopSearch from "./reducers/ShopsSearchSlice";
import likeSlice from "./reducers/LikeSlice";
import readSlice from "./reducers/ReadSlice";
import sliderSlice from "./reducers/SliderSlice";
import themeSlice from "./reducers/ThemeSlice";
import langSlice from "./reducers/LangSlice";
import sortTypeSlice from "./reducers/SortTypeSlice";
import postsScrollToUpSlice from "./reducers/ScrollToUpSlice";
import headerShownSlice from "./reducers/HeaderShownSlice";
import categorySlice from "./reducers/CategorySlice";

import shopData from "./reducers/ShopDataSlice";

const rootReducer = combineReducers({
  postsData,
  shopData,
  postsSearch,
  shopSearch,
  likeSlice,
  readSlice,
  themeSlice,
  langSlice,
  sortTypeSlice,
  headerShownSlice,
  postsScrollToUpSlice,
  sliderSlice,
  categorySlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
