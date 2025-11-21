import React from 'react';
import { useState } from 'react';
import styles from './CategoryEditModal.module.css';
import type { Category } from '../../types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CategoryFormModal } from '../CategoryFormModal/CategoryFormModal';

// 드래그 가능한 아이템 컴포넌트 
function SortableItem({ category }: { category: Category }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: category.name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className={styles.listItem}>
            <div className={styles.leftContent}>
                <div className={styles.colorDot} style={{ backgroundColor: category.color }}></div>
                <span>{category.name}</span>
            </div>

            {/* 오른쪽 햄버거 아이콘에 리스너(listeners)를 달아서 여기를 잡아야만 드래그되게 함 */}
            <div {...listeners} className={styles.rightContent}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 17L20 17M4 12L20 12M4 7L20 7" stroke="#ced4da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}

interface CategoryEditModalProps {
    onClose: () => void; // 부모(App)에게 닫기 신호
    categories: Category[]; // 부모(App)로부터 받은 전체 카테고리 목록
    onAdd: () => void; // 부모(App)에게 추가 창 열기 신호
    onUpdateCategory: (oldName: string, newCategory: Category) => void; // 부모(App)에게 카테고리 수정 신호
    onDeleteCategory: (categoryName: string) => void; // 부모(App)에게 카테고리 삭제 신호
    onReorderCategories: (newCategories: Category[]) => void; // 부모(App)에게 카테고리 재정렬 신호
}



export function CategoryEditModal({ onClose, categories, onAdd, onUpdateCategory, onDeleteCategory, onReorderCategories }: CategoryEditModalProps) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = categories.findIndex((item) => item.name === active.id);
            const newIndex = categories.findIndex((item) => item.name === over.id);

            // 순서를 바꾼 새 배열을 만들어서 부모에게 전달
            const newOrder = arrayMove(categories, oldIndex, newIndex);
            onReorderCategories(newOrder);
        }
    };

    if (editingCategory) {
        return (
          <CategoryFormModal
            onClose={() => setEditingCategory(null)} // 닫으면 다시 목록으로
            onSaveCategory={() => {}} // 수정 모드에선 안 씀
            existingCategories={categories}
            initialCategory={editingCategory} // ✨ 수정할 데이터 전달
            onUpdateCategory={onUpdateCategory} // ✨ 수정 함수 전달
            onDeleteCategory={onDeleteCategory} // ✨ 삭제 함수 전달
          />
        );
      }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <button onClick={onClose} className={styles.backButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <h4>카테고리 편집</h4>
                    <button onClick={onAdd} className={styles.addButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 4V20M4 12H20" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>
                <div className={styles.categoryList}>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={categories.map(c => c.name)} strategy={verticalListSortingStrategy}>
                            {categories.map((category) => (
                                <div 
                                    key={category.name}
                                    onClick={() => setEditingCategory(category)}
                                    style={{ cursor: 'pointer' }}
                                >
                                <SortableItem category={category} />
                                </div>
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>

                {editingCategory && (
                    <CategoryFormModal
                        onClose={() => setEditingCategory(null)}
                        onSaveCategory={() => {}}
                        existingCategories={categories}
                        initialCategory={editingCategory}
                        onUpdateCategory={(oldName, newCategory) => {
                            onUpdateCategory(oldName, newCategory);
                            setEditingCategory(null);
                        }}
                        onDeleteCategory={(categoryName) => {
                            onDeleteCategory(categoryName);
                            setEditingCategory(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}