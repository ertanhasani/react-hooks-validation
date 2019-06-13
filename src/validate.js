import methods from "./methods";

export default function validate(object) {
  const {
    min,
    max,
    array,
    number,
    required,
    value,
    email,
    boolean,
    regex,
    date,
    format,
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
  } = object;

  if (!required && !value) return true;
  if (depend && !methods.depend(value, depend)) return false;
  else if (depend) return true;
  if (min && !methods.min(value, min)) return false;
  if (max && !methods.max(value, max)) return false;
  if (array && !methods.array(value)) return false;
  if (number && !methods.number(value)) return false;
  if (required && !methods.required(value)) return false;
  if (email && !methods.email(value)) return false;
  if (boolean && !methods.boolean(value)) return false;
  if (regex && !methods.regex(value, regex)) return false;
  if (date && !methods.date(value, format)) return false;
  if (greater && !methods.greater(value, greater)) return false;
  if (less && !methods.less(value, less)) return false;
  if (lowercase && !methods.lowercase(value)) return false;
  if (uppercase && !methods.uppercase(value)) return false;
  if (hasValue(valid) && !methods.valid(value, valid)) return false;
  if (is && !methods.is(value, is)) return false;
  if (contains && !methods.contains(value, contains)) return false;

  if (hasValue(invalid) && methods.invalid(value, invalid)) return false;
  if (isNot && methods.isNot(value, isNot)) return false;
  if (containsNot && methods.containsNot(value, containsNot)) return false;

  return true;
}

function hasValue(value) {
  return value !== undefined;
}
