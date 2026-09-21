"use client";

import { Task } from "@/src/types/task";
import TaskItem from "@/components/TaskItem";
type TaskListProps = { tasks: Task[]; onToggle: (id: string) => void; onDelete: (id: string) => void; onEdit: (id: string, title: string) => void };

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (!tasks.length) return <div className="empty-state"><span className="empty-icon">✦</span><h3>No tasks in this view</h3><p>Everything is clear here. Add something new or change the filters.</p></div>;
  return <div className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)}</div>;
}