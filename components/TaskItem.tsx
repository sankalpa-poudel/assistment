"use client";

import { Task } from "@/src/types/task";
import { FormEvent, useState } from "react";
type TaskItemProps = { task: Task; onToggle: (id: string) => void; onDelete: (id: string) => void; onEdit: (id: string, title: string) => void };

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTitle = title.trim();
    if (!nextTitle) return;
    if (nextTitle !== task.title) onEdit(task.id, nextTitle);
    setIsEditing(false);
  }

  return <article className={`task-item ${task.completed ? "is-complete" : ""}`}>
    <button className="check-button" type="button" onClick={() => onToggle(task.id)} aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`}>{task.completed && <span aria-hidden="true">✓</span>}</button>
    {isEditing ? <form className="edit-form" onSubmit={handleSubmit}><label className="sr-only" htmlFor={`edit-${task.id}`}>Edit task title</label><input id={`edit-${task.id}`} value={title} maxLength={100} autoFocus onChange={(event) => setTitle(event.target.value)} /><button type="submit" aria-label="Save task" title="Save task">Save</button><button type="button" onClick={() => { setTitle(task.title); setIsEditing(false); }} aria-label="Cancel editing" title="Cancel editing">Cancel</button></form> : <div className="task-copy"><h3>{task.title}</h3><span className={`task-tag tag-${task.category.toLowerCase()}`}>{task.category}</span></div>}
    {!isEditing && <div className="task-actions"><button type="button" onClick={() => setIsEditing(true)} aria-label={`Edit ${task.title}`} title="Edit task">↗</button><button type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`} title="Delete task">×</button></div>}
  </article>;
}