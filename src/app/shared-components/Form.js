import React from 'react';
import {
  NativeSelect,
  TextField as Text,
  Checkbox,
  Switch,
  FormControlLabel
} from '@material-ui/core';

import RadioGroup from '@material-ui/core/RadioGroup';

export const CheckBox = ({ input, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
      />
    }
    label={label}
  />
);

export const Select = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <NativeSelect label={label} floatingLabelText={label}
      errorText={touched && error} {...input} {...custom} children={children} />
  );

export const TextField = ({
  label,
  input,
  startAdornment,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <Text
      label={label}
      floatingLabelText={label}
      error={touched && invalid}
      helperText={touched && error}
      startAdornment={startAdornment}
      {...input}
      {...custom}
    />
  );

export const SlideToggle = ({
  label,
  labelPlacement,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <FormControlLabel
      control={
        <Switch
          checked={input.value ? true : false}
          onChange={input.onChange}
          {...input}
          {...custom}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  );

export const Radios = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
  />
);
