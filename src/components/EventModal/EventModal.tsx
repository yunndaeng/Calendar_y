import React, { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './EventModal.module.css';
import { SwipeableEventItem } from '../SwipeableEventItem/SwipeableEventItem';

// App.tsx로부터 받을 데이터 타입 정의
interface EventModalProps {
  date: Date;
  events: { title: string; color: string }[];
  onClose: () => void;
  onSave: (title: string) => void;
  onDelete: (index: number) => void;
  onCategorySelect: (category: string) => void;
}

export function EventModal({
  date,
  events,
  onClose,
  onSave,
  onDelete,
  onCategorySelect,
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleSave = () => {
    if (title.trim() === '') return;
    onSave(title);
    setTitle('');
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{format(date, 'M월 d일 (EEE)', { locale: ko })}</h3>
        </div>

        <ul className={styles.eventList}>
          {events.map((event, index) => (
            <SwipeableEventItem
              key={index}
              event={event}
              onDelete={() => onDelete(index)}
            />
          ))}
        </ul>

        <div
          className={styles.addTodoContainer}
          onClick={() => setCategoryModalOpen(true)}
        >
          <span>+ 할 일을 추가하세요</span>
        </div>
      </div>

      {isCategoryModalOpen && (
        <div
          className={styles.categoryModalBackdrop}
          onClick={(e) => {
            e.stopPropagation(); // 배경 클릭 시 이벤트 전파 중단
            setCategoryModalOpen(false);
          }}
        >
          <div
            className={styles.categoryModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>카테고리 선택</h4>
            <div className={styles.categoryGrid}>
              <div
                className={styles.categoryItem}
                onClick={() => onCategorySelect('schedule')}
              >
                <div className={`${styles.icon} ${styles.iconSchedule}`}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
                    <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="2" />
                    <line x1="7" y1="2" x2="7" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="17" y1="2" x2="17" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span>일정</span>
              </div>
              <div className={styles.categoryItem}>
                <div className={`${styles.icon} ${styles.iconTodo}`}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 12L10 16L18 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>할일</span>
              </div>
              <div className={styles.categoryItem}>
                <div className={`${styles.icon} ${styles.iconInterval}`}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 12H20M4 12L8 8M4 12L8 16M20 12L16 8M20 12L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>구간</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}