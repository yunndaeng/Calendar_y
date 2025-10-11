// src/components/CategoryEditModal/CategoryEditModal.tsx

import React, { useState } from 'react';
import { CategoryAddModal } from '../CategoryAddModal/CategoryAddModal';
import styles from './CategoryEditModal.module.css';

type Category = {
  name: string;
  color: string;
};

interface CategoryEditModalProps {
  onClose: () => void;
  categories: Category[]; // CategoryPickerModal로부터 받아올 카테고리 목록
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export function CategoryEditModal({ onClose, categories, setCategories }: CategoryEditModalProps) {
  // 1. 카테고리 추가 모달을 보여줄지 말지 결정하는 상태
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = (newCategory: Category) => {
    // 기존 categories 배열에 newCategory를 추가하여 새로운 배열을 만듦
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setIsAddingCategory(false);
  };

  if (isAddingCategory) {
    return (
      <CategoryAddModal
        onClose={() => setIsAddingCategory(false)}
        onAddCategory={handleAddCategory} // 다음 단계에서 만들 함수
        existingCategories={categories}
      />
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <button
            onClick={() => {
              console.log("CategoryEditModal의 뒤로가기 버튼 클릭됨!"); // ✨ 디버깅 코드
              onClose();
            }}
            className={styles.backButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h4>카테고리 편집</h4>
          <button onClick={() => setIsAddingCategory(true)} className={styles.addButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <div key={category.name} className={styles.listItem}>
              <div className={styles.leftContent}>
                <div className={styles.colorDot} style={{ backgroundColor: category.color }}></div>
                <span>{category.name}</span>
              </div>
              <div className={styles.rightContent}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 17L20 17M4 12L20 12M4 7L20 7" stroke="#ced4da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}