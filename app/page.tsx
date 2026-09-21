"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import TaskFilter, { CategoryFilter, StatusFilter } from "@/components/TaskFilter";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Logo from "@/components/Logo";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { Task, TaskCategory } from "@/src/types/task";

const starterTasks: Task[] = [
  { id: "welcome-1", title: "Sketch out the week ahead", category: "Work", completed: false, createdAt: 1 },
  { id: "welcome-2", title: "Book a table for Friday", category: "Personal", completed: false, createdAt: 2 },
  { id: "welcome-3", title: "Send the launch notes", category: "Urgent", completed: true, createdAt: 3 },
];

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("vertral-tasks", starterTasks);
  const [status, setStatus] = useState<StatusFilter>("All");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesStatus = status === "All" || (status === "Completed" ? task.completed : !task.completed);
    const matchesCategory = category === "All" || task.category === category;
    return matchesStatus && matchesCategory;
  }), [category, status, tasks]);

  function addTask(title: string, taskCategory: TaskCategory) {
    setTasks((current) => [{ id: crypto.randomUUID(), title, category: taskCategory, completed: false, createdAt: Date.now() }, ...current]);
  }
  function toggleTask(id: string) { setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)); }
  function deleteTask(id: string) { setTasks((current) => current.filter((task) => task.id !== id)); }
  function editTask(id: string, title: string) { setTasks((current) => current.map((task) => task.id === id ? { ...task, title } : task)); }

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  return <>
    <Header activeCount={activeCount} totalCount={tasks.length} />
    <main className="app-shell">
      <section className="hero-copy"><div><p className="eyebrow">Your personal command center</p><h1>Make space<br /><em>for what matters.</em></h1></div><p className="hero-note">A calm place to collect the loose ends, make a little progress, and keep moving.</p></section>
      <section className="workspace" aria-label="Task manager"><TaskForm onAddTask={addTask} /><div className="task-section"><div className="section-heading"><div><p className="eyebrow">Your day, sorted</p><h2>Tasks <span>{activeCount}</span></h2></div><p className="completion-note">{completedCount} completed <span aria-hidden="true">/</span> {tasks.length} total</p></div><TaskFilter status={status} category={category} onStatusChange={setStatus} onCategoryChange={setCategory} /><TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} /></div></section>
    </main>
    <footer className="app-footer"><Logo /><span>Built for a clearer mind.</span></footer>
  </>;
}
