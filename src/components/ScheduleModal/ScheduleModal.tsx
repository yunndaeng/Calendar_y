import React, { useState } from 'react';
import styles from './ScheduleModal.module.css';
import { CategoryPickerModal } from '../CategoryPickerModal/CategoryPickerModal';

type Category = { name: string; color: string; };
interface ScheduleModalProps {
  onClose: () => void;
  onSave: (title: string, category: Category) => void;
}

export function ScheduleModal({ onClose, onSave }: ScheduleModalProps) {
  const [title, setTitle] = useState('');
  const [isCategoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>({ name: '카테고리', color: '#f1f3f5' });

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCategoryPickerOpen(false);
  };

  const handleSave = () => { if (title.trim()) { onSave(title, selectedCategory); } };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.header}>
            <button onClick={onClose} className={styles.iconButton}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M18 6L6 18" stroke="#333" strokeWidth="2" strokeLinecap="round"/><path d="M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <button className={styles.iconButton} onClick={handleSave}>
                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M20 6L9 17L4 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className={styles.titleInputWrapper} style={{ borderLeftColor: selectedCategory.color }}>
            <input type="text" placeholder="일정 제목" className={styles.titleInput} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </div>
          <div className={styles.tags} onClick={() => setCategoryPickerOpen(true)}>
            <div className={styles.tag} style={{ backgroundColor: selectedCategory.color, color: selectedCategory.name === '카테고리' ? '#333' : 'white' }}>
              {selectedCategory.name}
            </div>
          </div>
          <div className={styles.addItem}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#3498db" d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
            <span>항목 추가</span>
          </div>
        </div>
      </div>
      {isCategoryPickerOpen && (
        <CategoryPickerModal
          onClose={() => setCategoryPickerOpen(false)}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </>
  );
}