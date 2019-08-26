import React, { useState, useEffect } from "react";
import validate from "./validate";

export default function useValidation(object, depended = null) {
  if (!object.name)
    throw new Error(
      "You should add a 'name' property on your object and provide a value for it!"
    );
  else if (object.contains && !Array.isArray(object.contains))
    throw new Error("'contains' should be an Array!");
  else if (object.containsNot && !Array.isArray(object.containsNot))
    throw new Error("'containsNot' should be an Array!");

  if (object.defaultValue === undefined) object.defaultValue = '';
  if (object.value === undefined) object.value = object.defaultValue;

  const [value, setValue] = useState(object.value);
  const [error, setError] = useState(null);

  function onChange(newValue) {
    if (object.disabled) return false;
    setValue(newValue);
    object.depend = depended;
    object.value = newValue;
    setError(!validate(object));
  }

  function reset() {
    setValue(object.defaultValue);
    setError(null);
  }

  useEffect(() => {
    object.depend = depended;
    if (object.value) setError(!validate(object));
  }, []);

  if (object.error === null && (object.value !== '' && object.value !== null && object.value !== undefined)) {
    setError(!validate(object));
  }

  if (object.error != true && !object.required) {
    object.error = false;
  }
  else object.error = error;

  return {
    name: object.name,
    value,
    error: object.error,
    onChange,
    required: object.required,
    defaultValue: object.defaultValue,
    reset: reset
  };
}

export function validateAll(schema) {
  var err = [];
  Object.keys(schema).forEach(key => {
    if (
      schema[key].error ||
      schema[key].error === null ||
      !validate(schema[key])
    )
      err.push(schema[key].name);
  });
  if (err.length > 0) return err;
  return null;
}

export function reset(schema) {
  Object.keys(schema).forEach(key => {
    schema[key].reset();
  });
}