import React, { useState } from 'react';
import styles from './CategoryPickerModal.module.css';
import { CategoryEditModal } from '../CategoryEditModal/CategoryEditModal';

type Category = { name: string; color: string; };
interface CategoryPickerModalProps {
  onClose: () => void;
  onSelectCategory: (category: any) => void;
}

export function CategoryPickerModal({ onClose, onSelectCategory }: CategoryPickerModalProps) {
  const [categories, setCategories] = useState<Category[]>([
    { name: '친구', color: '#ffc9c9' }, { name: '할 일', color: '#d0bfff' },
    { name: '공부', color: '#91a7ff' }, { name: '마감일', color: '#ff922b' },
  ]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h4>카테고리 선택</h4>
            <button className={styles.editButton} onClick={() => setEditModalOpen(true)}>편집</button>
          </div>
          <div className={styles.grid}>
            {categories.map((category) => (
              <div key={category.name} className={styles.item} onClick={() => onSelectCategory(category)}>
                <div className={styles.iconWrapper}><div className={styles.colorCircle} style={{ backgroundColor: category.color }}></div></div>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <CategoryEditModal
          onClose={() => setEditModalOpen(false)}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </>
  );
}