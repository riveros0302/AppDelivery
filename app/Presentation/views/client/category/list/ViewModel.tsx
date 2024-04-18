import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Category } from "../../../../../Domain/entities/Category";
import { GetAllCategoryUseCase } from "../../../../../Domain/useCases/category/GetAllCategory";

export default function ClientCategoryListViewModel() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const result = await GetAllCategoryUseCase();
    setCategories(result);
  };

  return { categories, getCategories };
}
