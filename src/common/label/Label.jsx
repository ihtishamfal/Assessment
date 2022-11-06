import React from 'react';

function Label({ text, htmlFor, labelclassName }) {
  return (
    <label className={`${labelclassName} label`} htmlFor={htmlFor}>
      {text}
    </label>
  );
}

export default Label;
