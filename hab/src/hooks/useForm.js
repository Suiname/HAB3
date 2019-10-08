import { useState } from 'react';

const useForm = (initialState, submitCallback) => {

  const [values, setValues] = useState(initialState);

  const handleSubmit = (event) => {
    !!event && event.preventDefault();
    submitCallback(values);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const resetValues = () => setValues(initialState);

  return {
    handleChange,
    handleSubmit,
    values,
    resetValues,
  }
};

export default useForm;