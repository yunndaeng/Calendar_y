import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { DatePicker } from './components/DatePicker';
import { EventModal } from './components/EventModal';
import { ScheduleModal } from './components/ScheduleModal/ScheduleModal';
import { CategoryPickerModal } from './components/CategoryPickerModal/CategoryPickerModal';
import { CategoryEditModal } from './components/CategoryEditModal/CategoryEditModal';
import { CategoryAddModal } from './components/CategoryAddModal/CategoryAddModal';

// 타입 정의
type Event = { date: string; title: string; type: 'schedule' | 'todo'; color: string; };
type Category = { name: string; color: string; };

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { name: '친구', color: '#ffc9c9' }, { name: '할 일', color: '#d0bfff' },
    { name: '공부', color: '#91a7ff' }, { name: '마감일', color: '#ff922b' },
  ]);

  // 모든 모달을 관리할 단일 상태
  const [activeModal, setActiveModal] = useState<string | null>(null);
  // ScheduleModal에서 사용할 임시 카테고리 상태 (선택된 카테고리 저장용)
  const [tempCategory, setTempCategory] = useState<Category>({ name: '카테고리', color: '#f1f3f5' });

  // --- 핸들러 함수들 ---
  const handleSaveSchedule = (title: string, category: Category) => {
    if (selectedDate) {
      const newEvent: Event = { date: format(selectedDate, 'yyyy-MM-dd'), title, type: 'schedule', color: category.color };
      setEvents((prev) => [...prev, newEvent]);
    }
    setActiveModal(null); // 모든 모달 닫기
  };

  const handleSaveTodo = (title: string, type: 'schedule' | 'todo') => {
    if (selectedDate) {
      const newEvent: Event = { date: format(selectedDate, 'yyyy-MM-dd'), title, type, color: type === 'todo' ? '#d0bfff' : '#a5d8ff' };
      setEvents(prev => [...prev, newEvent]);
    }
    // '할일'은 추가 후에도 창 유지 (setActiveModal(null) 없음)
  };

  const handleDeleteEvent = (indexToDelete: number) => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const dayEvents = events.filter(e => e.date === dateStr);
    const eventToDelete = dayEvents[indexToDelete];
    setEvents(prevEvents => prevEvents.filter(event => event !== eventToDelete));
  };

  const handlePickerConfirm = (year: number, month: number) => {
    const newDate = new Date(); newDate.setFullYear(year); newDate.setMonth(month);
    setDirection(newDate > currentDate ? 1 : -1); setCurrentDate(newDate); setActiveModal(null);
  };

  const handleGoToToday = () => {
    const today = new Date(); setDirection(today > currentDate ? 1 : -1); setCurrentDate(today); setActiveModal(null);
  };

  const prevMonth = () => { setDirection(-1); setCurrentDate(subMonths(currentDate, 1)); };
  const nextMonth = () => { setDirection(1); setCurrentDate(addMonths(currentDate, 1)); };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; }; }) => {
    if (info.offset.x > 100) prevMonth(); else if (info.offset.x < -100) nextMonth();
  };

  const handleDateClick = (day: Date) => {
    if (!isSameMonth(day, monthStart)) return;
    setSelectedDate(day);
    setActiveModal('event');
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
    setActiveModal('categoryEdit'); // 카테고리 추가 후 편집 화면으로 복귀
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const daysOfWeek: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="app-container">
      <header className="calendar-header">
        <div className="header-left" onClick={() => setActiveModal('datePicker')}>
          <h1>{format(currentDate, 'yyyy년 M월')}</h1>
          <span className="dropdown-arrow">▼</span>
        </div>
      </header>

      <div className="calendar-body-container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.main key={format(currentDate, 'yyyy-MM')} className="calendar-content" custom={direction} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd} initial={{ opacity: 0, x: direction * 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -100 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="days-of-week">{daysOfWeek.map((day) => (<div key={day} className="day">{day}</div>))}</div>
            <div className="date-grid-wrapper">
              <div className="date-grid">
                {days.map((day, i) => {
                  const dayEvents = events.filter((event) => event.date === format(day, 'yyyy-MM-dd'));
                  return (
                    <div key={i} className={`date-cell ${!isSameMonth(day, monthStart) ? 'other-month' : ''} ${isToday(day) ? 'today' : ''}`} onClick={() => handleDateClick(day)}>
                      <div className="day-number"><span>{format(day, 'd')}</span></div>
                      <div className="events-container">
                        {dayEvents.map((event, index) => (<div key={index} className={`event-item ${event.type === 'todo' ? 'todo-item' : ''}`} style={{ backgroundColor: event.color }}>{event.title}</div>))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.main>
        </AnimatePresence>
      </div>

      <footer className="tab-bar">
        <div className="tab-item">홈</div><div className="tab-item">캘린더</div><div className="tab-item">할일</div>
      </footer>

      {/* --- Modals managed by activeModal state --- */}
      {activeModal === 'datePicker' && (
      <DatePicker 
        initialDate={currentDate} 
        onConfirm={handlePickerConfirm} 
        onClose={() => setActiveModal(null)} // ✨ 닫기 기능 연결
       onGoToToday={handleGoToToday} />)}

      {activeModal === 'event' && selectedDate && (
        <EventModal
          date={selectedDate}
          events={events.filter(e => e.date === format(selectedDate, 'yyyy-MM-dd'))}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveTodo}
          onDelete={handleDeleteEvent}
          onOpenSchedule={() => setActiveModal('schedule')}
        />
      )}
      {activeModal === 'schedule' && (
        <ScheduleModal
          onClose={() => setActiveModal('event')}
          onSave={handleSaveSchedule}
          onOpenCategoryPicker={() => setActiveModal('categoryPicker')}
          selectedCategory={tempCategory} // ✨ 임시 카테고리 상태 전달
        />
      )}
      {activeModal === 'categoryPicker' && (
        <CategoryPickerModal
          onClose={() => setActiveModal('schedule')}
          onSelect={(category) => {
            setTempCategory(category); // ✨ 선택된 카테고리를 임시 상태에 저장
            setActiveModal('schedule');
          }}
          categories={categories}
          onEdit={() => setActiveModal('categoryEdit')}
        />
      )}
      {activeModal === 'categoryEdit' && (
        <CategoryEditModal
          onClose={() => setActiveModal('categoryPicker')}
          categories={categories}
          setCategories={setCategories}
          onAdd={() => setActiveModal('categoryAdd')}
        />
      )}
      {activeModal === 'categoryAdd' && (
        <CategoryAddModal
          onClose={() => setActiveModal('categoryEdit')}
          onAddCategory={handleAddCategory}
          existingCategories={categories}
        />
      )}
    </div>
  );
}
export default App;