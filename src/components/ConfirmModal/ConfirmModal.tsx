// src/components/ConfirmModal/ConfirmModal.tsx

import React from 'react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <p>정말 삭제하시겠습니까?</p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onCancel}>취소</button>
          <button className={styles.confirmButton} onClick={onConfirm}>삭제</button>
        </div>
      </div>
    </div>
  );
}