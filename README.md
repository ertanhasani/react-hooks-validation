# react-hooks-validation

#### Install react-hooks-validation

`npm i react-hooks-validation`

> You should have `momentjs` installed in order to make it work. `momentjs` is required because it handles date parsing and formatting. You can install it by: `npm i moment`.

## How to use it

### [DEMO](https://codesandbox.io/s/lingering-moon-t6w36)

### useValidation(object)

`useValidation(object)` expects an object to be passed in.
ex:

```
const firstNameObj = {
    name: 'firstName',
    defaultValue: '',
    required: true
}
const firstName = useValidation(firstNameObj);
```

`useValidation(object)` returns a new object:

```
{
    name: 'name', //name
    value: '', //the current value
    error: false, //returns true or false to let us know if validation is ok or not
    required: false, //returns true or false if field is required or not
    defaultValue: '', //returns defaultValue if we provided one
    onChange: function(value), //we need to call onChange everytime we need to change a value
    reset: function() //we call that if we need to reset validation for that field
}
```

### validateAll(object)

`validateAll(object)` expects an object that contains objects from `useValidation(object)`. And it returns `null` if no error, or it returns an `array` of names that failed validation.
ex. if both firstName and lastName failed here is what array looks like:
`['firstName', 'lastName']`

### reset(object)
`reset(object)` expects an object that contains objects from `useValidation(object)`. And it will reset the validation for the object, and all values will be set to their `defaultValue`s.

## DEMO

Here is a simple demo of how to use `useValidation(object)`, `validateAll(object)` and `reset(object)` together:

```
import useValidation, { validateAll, reset } from 'react-hooks-validation';

function MyClass(){
    const schema = {
        firstName: {
            name: 'firstName',
            defaultValue: '',
            required: true
        },
        lastname: {
            name: 'lastName',
            defaultValue: '',
            required: true
        }
    };

    const data = {
        firstName: useValidation(schema.firstName),
        lastName: useValidation(schema.lastName)
    }

    function handleChange({currentTarget: input}){
        data[input.name].onChange(value);
    }

    function handleOnSubmit(e){
        e.preventDefault();
        reset(data);
    }

    return(
        <form onSubmit={handleOnSubmit}>
            <div>
                <label>First Name:</label>
                <input type='text' name='firstName' value={firstName.value} onChange={handleChange} />
                {firstName.error && <p>This field should not be blank</p>}
            </div>
            <div>
                <label>Last Name:</label>
                <input type='text' name='lastName' value={lastName.value} onChange={handleChange} />
                {lastName.error && <p>This field should not be blank</p>}
            </div>
            <div>
                <button type='submit' disabled={validateAll(data)}>SUBMIT</button>
            </div>
        </form>
    )
}

```

### useValidation(object, depended)

There is another option to use `useValidation(object, depended)` by passing a second argument called `depended`, which is if that value is depended on other value.
ex. We all expect `confirmPassword` to be equal to `password`, so we can use it there:

```
    const schema = {
        password: {
            name: 'password',
            defaultValue: '',
            required: true,
            min: 6,
            max: 16
        },
        confirmPassword: {
            name: 'confirmPassword',
            defaultValue: '',
            required: true
        }
    };

    const data = {
        password: useValidation(schema.password)
    }
    data.confirmPassword = useValidation(schema.confirmPassword, data.password);
```

## Properties

- **name** : string `required`. Used to determine the name of the input

- **value**: value `required`. Used to determine the default value. You can let as empty string if you dont want it to have a value at the beginning.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo' //the default value will be 'Kosovo' now
    }
}
```

- **required**: boolean `default: false`. Used to determine if a value is required or not.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
        required: true // this will be required now
    },
    country: { //this one will not be required
        name: 'country',
        defaultValue: 'Kosovo'
    }
}
```

- **disabled**: boolean `default : false`. Used to determine if a value should be disabled for changes.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        disabled: true //now you will not be able to change this value
    }
}
```

- **number**: boolean `optional`. Used to determine if the value should be number.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    age: {
        name: 'age',
        defaultValue: 2,
        number: true // we will require this to be number now
    }
}
```

- **min**: number `optional`. Used to determine minimum length for strings and arrays or minimum number for numbers.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
        min: 2 //the minimum required length of the value is 2
    },
    age: {
        name: 'age',
        defaultValue: 18,
        number: true,
        min: 18 //the minimum required number is 18
    },
    projects: {
        name: 'projects',
        defaultValue: [],
        array: true,
        min: 2 //the array shuld have minimum 2 elements
    }
}
```

- **max**: number `optional`. Used to determine maximum length for strings and arrays or maximum number for numbers.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
        max: 30 // the maximum value length is 30 characters
    },
    age: {
        name: 'age',
        defaultValue: 18,
        number: true,
        min: 18, //the mimumum number required is 18
        max: 60 // the maximum number can be 60
    },
    projects: {
        name: 'projects',
        defaultValue: [],
        array: true,
        max: 2 //the array shuld have maximum 2 elements
    }
}
```

- **array**: boolean `optional`. Used to determine if the value should be array.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    countries: {
        name: 'countries',
        defaultValue: ['Kosovo', 'Albania', 'United States', 'Sweden'],
        array: true // we will require value to be array
    }
}
```

- **email**: boolean `optional`. Used to determine if the value should match an email pattern.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    email: {
        name: 'email',
        defaultValue: '',
        email: true // this value now will need to match an email pattern
    }
}
```

- **boolean**: boolean `optional`. Used to determine if the value should be boolean.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    acceptTerms: {
        name: 'acceptTerms',
        defaultValue: false,
        boolean: true // this value needs to be boolean now
    }
}
```

- **regex**: regex `optional`. Used to validate a value agains a regular expression.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: '',
        regex : /^[a-zA-Z]+$/ //now the value should match the regex pattern
    }
}
```

- **date**: boolean `optional`. Used to determine if the value should be a date.
  - **format**: string `optional`. Used to determine the format of the date.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    birthday: {
        name: 'birthday',
        defaultValue: '',
        date: true // the value will need to be in a date format, and it will try to parse any format
    },
    startDate: {
        name: 'startDate',
        defaultValue: '',
        date: true, // the value will need to be in a date format
        format: 'DD.MM.YYYY' // and will need to be in this format.
    }
}
```

- **greater**: number `optional`. Used to determine that the string and array length or number should be greater than that.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
        greater: 2 // the value length should be more than 2
    },
    experience: {
        name: 'experience',
        defaultValue: 3,
        number: true,
        greater: 2 // the number should be greater than 2
    },
    projects: {
        name: 'projects',
        defaultValue: [],
        array: true,
        greater: 2 //the array shuld have more than 2 elements
    }
}
```

- **less**: number `optional`. Used to determine that string length or number should be less than that.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',,
        less: 100 // the value length should be less than 100
    },
    experience: {
        name: 'experience',
        defaultValue: 1,
        number: true,
        less: 2 // the number should be less than 2
    },
    projects: {
        name: 'projects',
        defaultValue: [],
        array: true,
        less: 4 //the array shuld have less than 4 elements
    }
}
```

- **uppercase**: boolean `optional`. Used to determine if the string should be uppercase.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'KOSOVO',
        uppercase: true // now the value should be in uppercase
    }
}
```

- **lowercase**: boolean `optional`. Used to determine if the string should be lowercase.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'kosovo',
        lowercase: true // now the value should be in lowercase
    }
}
```

- **valid**: value `optional`. Used to determine which value is valid.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        valid: 'Kosovo' //now the value should match the 'Kosovo' string
    },
    age: {
        name: 'age',
        defaultValue: 18,
        number: true,
        valid: 18 //now the value should be 18
    }
}
```

- **is**: array `optional`. Used to determine that the value should be one of the array elements.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        is: ['Kosovo', 'Albania'] // now the value should be one of values in this array
    }
}
```

- **contains**: value `optional`. Used to determine that the value should contain that value in.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        contains: 'os' // the value should contain 'os' string inside
    }
}
```

- **invalid**: value `optional`. Used to determine which value is invalid. `The opposite of valid.`

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        invalid: 'Africa' // the value should not be 'Africa'
    }
}
```

- **isNot**: array `optional`. Used to determine that the value shold not be one of the array elements. `The opposite of is.`

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        isNot: ['Africa', 'Australia'] // the value should not be one of the elements in this arrat
    }
}
```

- **containsNot**: value `optional`. Used to determine that the value should not contain that value in.

```
const data = {
    firstName: {
        name: 'firstName',
        defaultValue: '',
    },
    country: {
        name: 'country',
        defaultValue: 'Kosovo',
        containsNot: 'a' //the value should not contain 'a'.
    }
}
```
