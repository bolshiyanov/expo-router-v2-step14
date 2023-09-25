//In this clise will save active array categories
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dataCategoryShops from "@/data/dataCategoryShops";
import { categotyShopInterface } from "@/constants/types/categotyShopType";

interface CategoryInterface {
  checkedCategory: string[];
  categories: categotyShopInterface[];
}

const initialState: CategoryInterface = {
  checkedCategory: [],
  categories: [],
};
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryCheckedAction: (state, action) => {
      const checkedCategoryArray = action.payload.split(",");
      state.checkedCategory = checkedCategoryArray;
    },
    fetchCategoriesData: (state) => {
      state.categories.push(...dataCategoryShops);
    },
  },
});

export const { categoryCheckedAction, fetchCategoriesData } =
  categorySlice.actions;

export default categorySlice.reducer;
