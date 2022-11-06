import React from 'react';
import TextField from '@mui/material/TextField';

function InputField({
  label, onChange, value, placeholder,
}) {
  return (
    <TextField
      label={label}
      value={value}
      placeholder={placeholder}
      autoComplete="given-name"
      required
      fullWidth
      onChange={onChange}
      autoFocus
    />
  );
}

export default InputField;
