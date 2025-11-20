// src/types.ts

export type Category = {
    name: string;
    color: string;
  };
  
  export type Event = {
    date: string;
    title: string;
    type: 'schedule' | 'todo';
    color: string;
  };