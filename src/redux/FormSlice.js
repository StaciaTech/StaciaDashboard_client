import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  form: [
    {
      id: `container-${uuidv4()}`,
      title: "first Container",
      formDescription:
        "Lorem Ipsum has been the industry's standard dummy text ever standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      items: [],
    },
  ],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createForm: (state, action) => {
      const { overContainerIndex, newItems } = action.payload;
      state.form[overContainerIndex].items.push(newItems);
    },

    updateFormOverQuestion: (state, action) => {
      const { overContainerIndex, newItems, overItemIndex } = action.payload;
      state.form[overContainerIndex].items.splice(
        overItemIndex + 1,
        0,
        newItems
      );
    },

    //update Question value for each question
    updateItemQuestion: (state, action) => {
      const { containerIndex, questionIndex, newQuestion } = action.payload;
      state.form[containerIndex].items[questionIndex].question = newQuestion;
    },
    //update Required for each question
    updateRequiredChange: (state, action) => {
      const { questionIndex, containerIndex, value } = action.payload;
      state.form[containerIndex].items[questionIndex].required = value;
    },

    //detele question
    deleteQuestion: (state, action) => {
      const { questionI, containerIndex } = action.payload;
      state.form[containerIndex].items.splice(questionI, 1);
    },

    //update Singele choice option value
    updateSingleChoiceOp: (state, action) => {
      const { optionIndex, questionIndex, containerIndex, option } =
        action.payload;
      state.form[containerIndex].items[questionIndex].options[
        optionIndex
      ].optionText = option;
    },

    //delete option
    deleteSingleChoiseOption: (state, action) => {
      const { optionIndex, questionIndex, containerIndex } = action.payload;
      state.form[containerIndex].items[questionIndex].options.splice(
        optionIndex,
        1
      );
    },

    //Add option
    addOptionSingleChoiceop: (state, action) => {
      const { questionIndex, containerIndex } = action.payload;
      const Question = state.form[containerIndex].items[questionIndex];
      state.form[containerIndex].items[questionIndex].options.push({
        id: `item-${uuidv4()}`,
        optionText: `Option ${Question.options.length + 1}`,
      });
    },
    //add option from pro
    addOptionSingleChoiceopPro: (state, action) => {
      const { optionIndex, questionIndex, containerIndex } = action.payload;
      const Question = state.form[containerIndex].items[questionIndex];
      state.form[containerIndex].items[questionIndex].options.splice(
        optionIndex + 1,
        0,
        {
          id: `item-${uuidv4()}`,
          optionText: `Option ${Question.options.length + 1}`,
        }
      );
    },

    updatevalueFrom: (state, action) => {
      const { name, value, activeContainerIndex, questionIndex } =
        action.payload;
      const updatedForm = state.form.map((container, cIndex) => {
        if (cIndex !== activeContainerIndex) {
          return container;
        }
        return {
          ...container,
          items: container.items.map((item, iIndex) => {
            if (iIndex !== questionIndex) {
              return item;
            }
            return {
              ...item,
              [name]: value,
            };
          }),
        };
      });
      return {
        ...state,
        form: updatedForm,
      };
    },

    updateFormTitile: (state, action) => {
      const { value, activeContainerIndex } = action.payload;
      return {
        ...state,
        form: state.form.map((container, cIndex) => {
          if (cIndex === activeContainerIndex) {
            return {
              ...container,
              title: value,
            };
          }
          return container;
        }),
      };
    },

    updateFormDescription: (state, action) => {
      const { value, activeContainerIndex } = action.payload;
      return {
        ...state,
        form: state.form.map((container, cIndex) => {
          if (cIndex === activeContainerIndex) {
            return {
              ...container,
              formDescription: value,
            };
          }
          return container;
        }),
      };
    },

    cloneQuestion: (state, action) => {
      const { id, containerIndex } = action.payload;
      return {
        ...state,
        form: state.form.map((container, cIndex) => {
          if (container.id === containerIndex) {
            return {
              ...container,
              items: container.items.filter((item) => {
                return item.id === id;
              }),
            };
          }
          return container;
        }),
      };
    },

    addMultiChoice: (state, action) => {
      const { id, containerIndex, text } = action.payload;

      return produce(state, (draft) => {
        const container = draft.form.find((c) => c.id === containerIndex);

        if (container !== -1) {
          const question = container.items.find((q) => q.id === id);

          if (question !== -1) {
            if (text === "column") {
              question.column.push({
                id: uuidv4(),
                columnText: `Column ${question.column.length + 1}`, // Use column.length for unique naming
              });
            } else if (text === "row") {
              question.row.push({
                id: uuidv4(),
                rowText: `Row ${question.row.length + 1}`, // Use column.length for unique naming
              });
            }
          }
        }
      });
    },

    deleteMultiChoice: (state, action) => {
      const { id, containerIndex, text, optionId } = action.payload;
      const container = state.form.find((c) => c.id === containerIndex);
      if (container) {
        const question = container.items.find((item) => item.id === id);
        if (question) {
          if (text === "row") {
            const optionIndex = question.row.findIndex(
              (r) => r.id === optionId
            );
            question.row.splice(optionIndex, 1);
          } else if (text === "column") {
            const optionIndex = question.column.findIndex(
              (o) => o.id === optionId
            );
            question.column.splice(optionIndex, 1);
          }
        }
      }
    },
    changeMultipleOption: (state, action) => {
      const { value, optionId, containerIndex, id, text } = action.payload;
    },
  },
});

export const {
  createForm,
  updateFormOverQuestion,
  updateRequiredChange,
  deleteSingleChoiseOption,
  addOptionSingleChoiceop,
  updatevalueFrom,
  addOptionSingleChoiceopPro,
  updateFormTitile,
  updateFormDescription,
  updateItemQuestion,
  deleteQuestion,
  addMultiChoice,
  deleteMultiChoice,
  changeMultipleOption,
  updateSingleChoiceOp,
} = formSlice.actions;
export default formSlice.reducer;
