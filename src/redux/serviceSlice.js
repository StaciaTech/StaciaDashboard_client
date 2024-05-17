import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allService: [],
  service: [],
  primaryShowcase: [],
  archive: [],
  detailsValue: [],
};
const initialStates = {
  des: "",
  image: "",
  altText: "",
  form: [{ id: 1, heading: "", description: "" }],
  pImage: "",
  pAlterNativeText: "",
  heading: "",
  domainName: "",
  hashTag: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    allService: (state, action) => {
      state.allService = [...action.payload];
    },
    newData: (state, action) => {
      state.service = [...action.payload];
    },
    primaryShowcaseService: (state, action) => {
      state.primaryShowcase = [...action.payload];
    },
    changePrimaryCard: (state, action) => {
      state.primaryShowcase = [...action.payload];
    },
    archiveCard: (state, action) => {
      state.archive = [...action.payload];
    },
    detailsValue: (state, action) => {
      state.detailsValue = [...action.payload];
    },
  },
});

export const serviceFormReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "UPDATE_SERVICE_FORM_DATA":
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
  allService,
  primaryShowcaseService,
  changePrimaryCard,
  archiveCard,
  detailsValue,
} = serviceSlice.actions;
export default serviceSlice.reducer;
