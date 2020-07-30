// import React from 'react';

// const Select = (props) => {
//   const { options, ...rest } = props;

//   const attribs = { ...rest };
//   if (Array.isArray(options)) {
//     const myOptions = options.map((opcao, i) => (
//       <option key={i} value={opcao.value}>
//         {opcao.label}
//       </option>
//     ));
//     return <select {...attribs}>{myOptions}</select>;
//   }
// };

// export default Select;

import React, { useRef, useEffect } from 'react';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: (selectRef) => {
        selectRef.select.clearValue();
      },
    });

    function parseSelectValue(selectValue) {
      if (!multiple) {
        return selectValue ? selectValue.id : '';
      }

      return selectValue ? selectValue.map((option) => option.id) : [];
    }
  }, [fieldName, registerField, multiple]);

  // function getDefaultValue() {
  //   if (!defaultValue) return null;

  //   if (!multiple) {
  //     return options.find((option) => option.id === defaultValue);
  //   }

  //   return options.filter((option) => defaultValue.includes(option.id));
  // }

  return (
    <>
      {/*
      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.title}
        {...rest}
      /> */}

      <Select
        value={defaultValue}
        name={fieldName}
        options={options}
        isMulti={multiple}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
