import moment from "moment";

function min(value, nr) {
  return ('string' === typeof value ? value.length : value) >= nr;
}

function max(value, nr) {
  return ('string' === typeof value ? value.length : value) <= nr;
}

function required(value) {
  if ("string" === typeof value) {
    return !(value.trim().length === 0 || value === null || value === undefined || value.length === 0);
  }
  else {
    return !(value === null || value === undefined || value.length === 0)
  }
}

function number(value) {
  return !isNaN(value);
}

function array(value) {
  return Array.isArray(value);
}

function email(value) {
  var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(value);
}

function boolean(value) {
  return "boolean" === typeof value;
}

function regex(value, exp) {
  return exp.test(value);
}

function date(value, format = "") {
  var date;
  if (!format) date = moment(value);
  else date = moment(value, format);
  return date.isValid();
}

function greater(value, nr) {
  return (isNaN(value) ? value.length : value) > nr;
}

function less(value, nr) {
  return (isNaN(value) ? value.length : value) < nr;
}

function uppercase(value) {
  return value.toUpperCase() === value;
}

function lowercase(value) {
  return value.toLowerCase() === value;
}

function valid(value, validValue) {
  return value === validValue;
}

function is(value, arr) {
  return arr.includes(value);
}

function depend(value, depended) {
  return value === depended.value;
}

function contains(value, content) {
  return value.includes(content);
}

function invalid(value, invalidValue) {
  return value === invalidValue;
}

function isNot(value, arr) {
  return !arr.includes(value);
}

function containsNot(value, content) {
  return !value.includes(content);
}

export default {
  min,
  max,
  required,
  number,
  array,
  email,
  boolean,
  regex,
  date,
  greater,
  less,
  uppercase,
  lowercase,
  valid,
  is,
  depend,
  contains,
  invalid,
  isNot,
  containsNot
};
