import React from "react";
import { Field } from "redux-form";
import Downshift from "downshift";
import { TextField } from './Form';
import {
    Icon,
    IconButton,
    InputAdornment,
    MenuItem
} from '@material-ui/core';

const itemToString = item => (item ? item : "");

const DownShiftInput = ({ input, meta, label, items, fields, index, textFieldClassName, placeholder }) => (
    <>
    {typeof input.value=="object"?input.onChange(""):input.onChange(input.value)}
    <Downshift
        {...input}
        onStateChange={({ inputValue }) => {
            return input.onChange(inputValue);
        }}
        itemToString={itemToString}
       selectedItem={typeof input.value=="object"?"":input.value}
    >
        {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
        }) => {
            // var filteredItems=[];
            // items.forEach(item => {
            //     if(item!=selectedItem){
            //         filteredItems.push(item)
            //     }
            // });
            const filteredItems = items.filter((item,index) => {
                console.log('item ====> ',index,item);
                console.log('inputValue ====> ',inputValue);
                return item.toString().includes(inputValue)
            })
            return (
                <div>
                    <div style={{ position: "relative" }}>
                        <Field
                            className={textFieldClassName}
                            component={TextField}
                            {...getInputProps({
                                name: input.name,
                                onBlur: input.onBlur
                            })}
                            placeholder={placeholder}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => fields.remove(index)}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        {isOpen &&
                            !!filteredItems.length && (
                                <div style={{ maxHeight: '300px', overflowY: 'auto', boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)' }}>
                                    {filteredItems.map((item, index) => (
                                        <MenuItem {...getItemProps({
                                            key: item,
                                            index,
                                            item,
                                            style: {
                                                backgroundColor:
                                                    highlightedIndex === index ? "lightgray" : "white",
                                                fontWeight: selectedItem === item ? "bold" : "normal"
                                            }
                                        })} button>

                                            {item}
                                        </MenuItem>

                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            );
        }}
    </Downshift>
    </>
);

const TypeAheadField = props => <Field component={DownShiftInput} {...props} />;

export default TypeAheadField;


