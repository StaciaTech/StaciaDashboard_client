export const updateFormData = (field, value) => {
  return { type: "UPDATE_FORM_DATA", field, value };
};
export const updateServiceFormData = (field, value) => {
  return { type: "UPDATE_SERVICE_FORM_DATA", field, value };
};
