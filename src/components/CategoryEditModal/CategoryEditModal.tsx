import React from 'react';
import styles from './CategoryEditModal.module.css';

// 타입 정의
type Category = { name: string; color: string; };

interface CategoryEditModalProps {
    onClose: () => void; // 부모(App)에게 닫기 신호
    categories: Category[]; // 부모(App)로부터 받은 전체 카테고리 목록
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>; // 부모(App)의 상태 변경 함수
    onAdd: () => void; // 부모(App)에게 추가 창 열기 신호
}

export function CategoryEditModal({ onClose, categories, setCategories, onAdd }: CategoryEditModalProps) {
    // isAddingCategory state 및 handleAddCategory 함수 삭제

    // CategoryAddModal 렌더링 로직 삭제

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <button onClick={onClose} className={styles.backButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <h4>카테고리 편집</h4>
                    <button onClick={onAdd} className={styles.addButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4V20M4 12H20" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 17L20 17M4 12L20 12M4 7L20 7" stroke="#ced4da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}