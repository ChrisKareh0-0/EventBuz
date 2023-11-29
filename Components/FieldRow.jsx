// components/FieldRow.js

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from 'react-select/creatable';


function FieldRow({ field, onInputChange, onDelete, isOnlyField, onValueChange }) {
  const { id, name, type, isRequired } = field;
  const [inputValue, setInputValue] = useState(''); // To manage the input of CreatableSelect
  const [value, setValue] = useState([]); // To manage the value (selected options) of CreatableSelect


  const components = {
    DropdownIndicator: null,
  };

  useEffect(() =>{
    onValueChange(value)
  }, [value])

  const handleKeyDown = (event) => {
    if (!inputValue) return;

    const createOption = (input) => {
        // Assuming this function creates an option object from the input string
        return { label: input, value: input };
    };

    switch (event.key) {
        case 'Enter':
        case 'Tab':
            setValue(prev => [...prev, createOption(inputValue)]);
            setInputValue('');
            event.preventDefault();
            break;
        // Other cases as needed
    }
};

  return (
    <>    
    <div className="fieldRow" >
      {/* <button onClick={() => onDelete(id)}>Delete</button> */}
      {!isOnlyField && (

        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => onDelete(id)}
          style={{ color: "red", fontSize: "15px" }}
        />
      )}

      <div>
        <label style={{ color: "white", whiteSpace: "nowrap", marginTop: 6 }}>
          Field Name
        </label>
        <input
          type="text"
          placeholder="Enter field name"
          value={name}
          onChange={(e) => onInputChange(id, "name", e)}
          style={{ backgroundColor: "#3b3b3b", marginLeft: 30 }}
        />
      </div>
      <div>
        <label style={{ color: "white" }}>Type</label>
        <select value={type} onChange={(e) => onInputChange(id, "type", e)}>
          <option>Text</option>
          <option>Number</option>
          <option>Website</option>
          <option>Email</option>
          <option>Boolean</option>
          <option>Conditional Boolean</option>
          <option>DropDown</option>
        </select>
      </div>
      <div>
        <label style={{ color: "white" }}>Required</label>
        <input
          type="checkbox"
          checked={isRequired}
          onChange={(e) => onInputChange(id, "isRequired", e)}
        />
      </div>
      <style jsx>
        {`
          input[type="text"] {
            display: block;
            width: 450px;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;
            color: #fff;
          }
          select {
            display: block;
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;
            color: #fff;
            background-color: #3b3b3b;
            -webkit-appearance: none; /* Removes default styling for select elements in WebKit browsers */
            -moz-appearance: none; /* Removes default styling for select elements in Mozilla browsers */
            appearance: none; /* Standard syntax to remove default styling */
          }
          .css-1xc3v61-indicatorContainer{
            display: none !important;
          } 
        `}
      </style>
    </div>
    {type === 'DropDown' && (
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={(newValue) => setValue(newValue)}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="DropDown Menu Elements"
          value={value}
          styles={{
            input: (base) => ({
              ...base,
              color: 'white', // Set text color to white
            })
          }}
        />
      )}
    </>

  );
}

export default FieldRow;
