import React from 'react';
import styles from './CategoryPickerModal.module.css';
import type { Category } from '../../types';

interface CategoryPickerModalProps {
  onClose: () => void; // 부모(App)에게 닫기 신호
  onSelect: (category: Category) => void; // 부모(App)에게 선택된 카테고리 전달
  categories: Category[]; // 부모(App)로부터 받은 전체 카테고리 목록
  onEdit: () => void; // 부모(App)에게 편집 창 열기 신호
}

export function CategoryPickerModal({ onClose, onSelect, categories, onEdit}: CategoryPickerModalProps) {
  // isEditModalOpen state 삭제

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h4>카테고리 선택</h4>
          <button className={styles.editButton} onClick={onEdit}>편집</button>
        </div>
        <div className={styles.grid}>
          {categories.map((category) => (
            <div key={category.name} className={styles.item} onClick={() => onSelect(category)}>
              <div className={styles.iconWrapper}>
                <div className={styles.colorCircle} style={{ backgroundColor: category.color }}></div>
              </div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    // CategoryEditModal 렌더링 코드는 App.tsx로 이동했으므로 삭제
  );
}