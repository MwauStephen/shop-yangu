import React from "react";

const SelectContainer = ({ data, register }) => {
  return (
    <select
      {...register}
      style={{
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "0.8rem",
      }}
    >
      {data.map((item, index) => {
        return (
          <option
            value={item.shopName}
            key={index}
            style={{
              padding: "0.5rem",
            }}
          >
            {item.shopName}
          </option>
        );
      })}
    </select>
  );
};

export default SelectContainer;
