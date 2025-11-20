import React, { useState } from 'react';
import styles from './ScheduleModal.module.css';
import type { Category } from '../../types';

interface ScheduleModalProps {
  onClose: () => void; // 부모(App)에게 닫기 신호
  onSave: (title: string, category: Category) => void; // 부모(App)에게 저장 신호
  onOpenCategoryPicker: () => void; // 부모(App)에게 카테고리 피커 열기 신호
  selectedCategory: Category; // 부모(App)로부터 받은 현재 선택된 카테고리
}

export function ScheduleModal({ onClose, onSave, onOpenCategoryPicker, selectedCategory }: ScheduleModalProps) {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onSave(title, selectedCategory);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <button onClick={onClose} className={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M18 6L6 18" stroke="#333" strokeWidth="2" strokeLinecap="round"/><path d="M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button className={styles.iconButton} onClick={handleSave}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className={styles.titleInputWrapper} style={{ borderLeftColor: selectedCategory.color }}>
          <input type="text" placeholder="일정 제목" className={styles.titleInput} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        </div>
        <div className={styles.tags} onClick={onOpenCategoryPicker}>
          <div className={styles.tag} style={{ backgroundColor: selectedCategory.color, color:'white' }}>
            {selectedCategory.name}
          </div>
        </div>
        <div className={styles.addItem}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#3498db" d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/></svg>
          <span>항목 추가</span>
        </div>
      </div>
    </div>
    // CategoryPickerModal 렌더링 코드는 App.tsx로 이동했으므로 삭제
  );
}