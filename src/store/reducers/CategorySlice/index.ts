//In this clise will save active array categories
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dataCategoryShops from "@/data/dataCategoryShops";
import { categotyShopInterface } from "@/constants/types/categotyShopType";

interface CategoryInterface {
  checkedIdCategory: string;
  checkedNameCategory: string;
  categories: categotyShopInterface[];
}

const initialState: CategoryInterface = {
  checkedIdCategory: "",
  checkedNameCategory: "",
  categories: [],
};
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryIdCheckedAction: (state, action) => {
      const checkedCategoryString = action.payload;
      if (checkedCategoryString === state.checkedIdCategory) {
        state.checkedIdCategory = ""
      }
       else state.checkedIdCategory = checkedCategoryString;
    },
    categoryNameCheckedAction: (state, action) => {
      const checkedCategoryNameString = action.payload;
      if (checkedCategoryNameString === state.checkedNameCategory) {
        state.checkedNameCategory = ""
      }
       else state.checkedNameCategory = checkedCategoryNameString;
    },
    fetchCategoriesData: (state) => {
      state.categories.push(...dataCategoryShops);
    },
  },
});

export const { categoryIdCheckedAction, categoryNameCheckedAction, fetchCategoriesData } =
  categorySlice.actions;

export default categorySlice.reducer;