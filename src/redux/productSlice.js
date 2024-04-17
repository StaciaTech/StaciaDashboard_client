import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProduct: [],
  productList: [],
  primaryShowcase: [],
  archive: [],
};

const initialStates = {
  waterMark:"",
  des:"",
  altText:"",
  image:"",
  pDes1:'',
  pDes2:"",
  pImage:"",
  pAltText:"",
  heading:"",
  domainName:"",
  hashTag:[],
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    allProduct: (state, action) => {
      state.allProduct = [...action.payload];
    },
    newData: (state, action) => {
      state.productList = [...action.payload];
    },
    primaryShowcase: (state, action) => {
      state.primaryShowcase = [...action.payload];
    },
    changePrimaryCard: (state, action) => {
      state.primaryShowcase = [...action.payload];
    },
    archiveCard: (state, action) => {
      state.archive = [...action.payload];
    },
  },
});
export const formReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};
export const {
  newData,
  primaryShowcase,
  changePrimaryCard,
  archiveCard,
  allProduct,
} = productSlice.actions;
export default productSlice.reducer;

