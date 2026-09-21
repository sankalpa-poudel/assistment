"use client";

import { FormEvent, useState } from "react";
import { TaskCategory } from "@/src/types/task";
import Logo from "@/components/Logo";

type TaskFormProps = { onAddTask: (title: string, category: TaskCategory) => void };
const categories: TaskCategory[] = ["Work", "Personal", "Urgent"];

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Work");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Give your task a name first.");
      return;
    }
    onAddTask(cleanTitle, category);
    setTitle("");
    setError("");
  }

  return <form className="task-form" onSubmit={handleSubmit} noValidate>
    <div className="form-heading"><div><Logo compact /><p className="eyebrow">Capture a thought</p><h2>What needs doing?</h2></div><span className="keyboard-hint">Enter ↵</span></div>
    <label className="sr-only" htmlFor="task-title">Task title</label>
    <input id="task-title" value={title} onChange={(event) => { setTitle(event.target.value); if (error) setError(""); }} placeholder="e.g. Prepare the project brief" maxLength={100} aria-invalid={Boolean(error)} aria-describedby={error ? "task-error" : undefined} />
    <div className="form-row"><label className="select-wrap"><span className="sr-only">Task category</span><select value={category} onChange={(event) => setCategory(event.target.value as TaskCategory)}>{categories.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><button className="add-button" type="submit">Add task <span aria-hidden="true">+</span></button></div>
    {error && <p className="form-error" id="task-error">{error}</p>}
  </form>;
}