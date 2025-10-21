import React from 'react'; // useState 불필요
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './EventModal.module.css';
import { SwipeableEventItem } from '../SwipeableEventItem/SwipeableEventItem';
// CategoryPickerModal import 불필요

// App.tsx로부터 받을 데이터 타입 정의
type Category = {
  name: string;
  color: string;
};

interface EventModalProps {
  date: Date;
  events: { title: string; color: string; type: 'schedule' | 'todo'; }[];
  onClose: () => void;
  onSave: (title: string, type: 'schedule' | 'todo') => void;
  onDelete: (index: number) => void;
  onOpenSchedule: () => void; // onCategorySelect -> onOpenSchedule
}

export function EventModal({
  date,
  events,
  onClose,
  onSave, // onSave는 App.tsx에서 handleSaveTodo와 연결됨
  onDelete,
  onOpenSchedule, // App.tsx의 setActiveModal('schedule')과 연결됨
}: EventModalProps) {

  // CategoryPickerModal 관련 useState 삭제

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

        {/* '+ 할 일 추가' 버튼 클릭 시 onOpenSchedule 호출 */}
        <div className={styles.addTodoContainer} onClick={onOpenSchedule}>
          <span>+ 할 일을 추가하세요</span>
        </div>
      </div>

      {/* CategoryPickerModal 렌더링 코드 삭제 */}
    </div>
  );
}