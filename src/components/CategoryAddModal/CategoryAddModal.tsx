// src/components/CategoryAddModal/CategoryAddModal.tsx

import React, { useState } from 'react';
import styles from './CategoryAddModal.module.css';

// 8가지 색상 팔레트 정의
const COLORS = [
  'rgb(255, 138, 138)', // 연핑크 (요청하신 '친구' 카테고리 기본 색상)
  'rgb(255 173 75)',
  'rgb(255 228 44)',
  'rgb(52 183 0)',
  '#81c7ff',
  'rgb(0 86 226)',
  'rgb(140 121 255)',
  'rgb(120 120 120)',
];

// 부모 컴포넌트로부터 받을 props 타입 정의
interface CategoryAddModalProps {
  onClose: () => void;
  onAddCategory: (category: { name: string; color: string }) => void;
  existingCategories: Array<{ name:string; color: string }>;
}

export function CategoryAddModal({ onClose, onAddCategory }: CategoryAddModalProps) {
  const [categoryName, setCategoryName] = useState('');
  // 요청사항에 따라 첫 번째 색상을 기본 선택 값으로 설정
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSave = () => {
    // 카테고리 이름이 비어있는지 확인
    if (!categoryName.trim()) {
      alert('카테고리 이름을 입력하세요.');
      return;
    }
    // 선택된 색상이 없는 경우 확인 (현재 코드는 항상 기본값이 있으므로 이 경우는 거의 없음)
    if (!selectedColor) {
      alert('색상을 선택하세요.');
      return;
    }
    // onAddCategory 함수를 호출하여 부모 컴포넌트로 새 카테고리 정보 전달
    onAddCategory({ name: categoryName, color: selectedColor });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* 1. 상단 뒤로가기 버튼 */}
        <header className={styles.header}>
          <button onClick={onClose} className={styles.backButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        {/* 2. 카테고리 이름 입력 필드 */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="카테고리를 입력하세요"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={styles.categoryInput}
          />
        </div>

        <div className={styles.colorPickerContainer}>
          {/* 3. 색상 선택 헤더 */}
          <div className={styles.colorPickerHeader}>
            <span>&lt;</span>
            <h4>색상 선택</h4>
            <span>&gt;</span>
          </div>
          {/* 4. 8가지 색상 선택 그리드 */}
          <div className={styles.colorGrid}>
            {COLORS.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
              >
                <div className={styles.colorDot} style={{ backgroundColor: color }}>
                  {/* 5. 선택된 색상에 체크 표시 */}
                  {selectedColor === color && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 비공개 카테고리 토글 */}
        <div className={styles.privateToggleContainer}>
          <span>비공개 카테고리</span>
          <label className={styles.switch}>
            <input type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>

        {/* 6. 저장 버튼 */}
        <button onClick={handleSave} className={styles.saveButton}>
          저장
        </button>
      </div>
    </div>
  );
}