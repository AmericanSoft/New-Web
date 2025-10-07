// <= 60 سطر
import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { CATEGORY_MAP_AR_TO_EN, SERVICE_VALUES } from "./contact";

export default function ServiceSelect({ lang, value, onChange, t }) {
  const options = lang === "ar" ? Object.keys(CATEGORY_MAP_AR_TO_EN) : SERVICE_VALUES;

  return (
    <FormControl mt={4}>
      <FormLabel>{lang === "ar" ? "الخدمة" : "Service"}</FormLabel>
      <Select
        name="category_name"
        placeholder={lang === "ar" ? "اختر الخدمة" : "Select a service"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((label) => {
          const val = lang === "ar" ? CATEGORY_MAP_AR_TO_EN[label] : label;
          return (
            <option key={val} value={val}>
              {label}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
}
