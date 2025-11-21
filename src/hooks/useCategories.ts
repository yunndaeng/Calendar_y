import { useState } from 'react';
import type { Category } from '../types';

// 기본 카테고리 데이터
const DEFAULT_CATEGORIES: Category[] = [
  { name: '친구', color: '#ffc9c9' },
  { name: '할 일', color: '#d0bfff' },
  { name: '공부', color: '#91a7ff' },
  { name: '마감일', color: '#ff922b' },
];

export const EMPTY_CATEGORY: Category = { 
  name: '카테고리', 
  color: 'rgb(149 149 149)' 
};

export const useCategories = () => {
  // 카테고리 목록 상태
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  // 1. 카테고리 추가 기능
  const addCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  // 2. 카테고리 삭제 기능 (이름으로 삭제)
  const deleteCategory = (categoryName: string) => {
    setCategories((prev) => prev.filter((cat) => cat.name !== categoryName));
  };

  // 3. 카테고리 수정 기능 (색상 변경 등)
  const updateCategory = (oldName: string, updatedCategory: Category) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.name === oldName ? updatedCategory : cat))
    );
  };

  // 4. 카테고리 재정렬 기능
  const reorderCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
  };

  // 밖에서 쓸 수 있게 함수들과 데이터를 반환(return)해줍니다.
  return {
    categories,
    setCategories,
    addCategory,
    deleteCategory,
    updateCategory,
    reorderCategories,
  };
};