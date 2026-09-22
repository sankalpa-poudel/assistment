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

function GuideView() {
  const requirements = [
    ["Reusable components", "Header, task form, filters, list, and task item keep each responsibility clear."],
    ["State and effects", "React state powers the task workflow, while useEffect syncs tasks with localStorage."],
    ["Forms and events", "The controlled task form validates input and handles submission without a page reload."],
    ["Conditional rendering", "Empty states, filter results, editing mode, and completion states respond to the current data."],
    ["Responsive design", "The two-column workspace becomes a comfortable single-column layout on smaller screens."],
  ];

  return <>
    <Header activeCount={0} totalCount={0} showSummary={false} />
    <main className="guide-shell">
      <section className="guide-intro"><p className="eyebrow">Assignment companion</p><h1>Build notes for<br /><em>Vertral Tasks.</em></h1><p className="guide-lede">A simple project guide for the Personal Task Manager assignment. Use the task view to demonstrate the app, and this page to explain how it meets the brief.</p><a className="guide-cta" href="/">Open task manager <span aria-hidden="true">↗</span></a></section>
      <section className="guide-grid" aria-label="Project documentation">
        <article className="guide-panel guide-panel-wide"><p className="eyebrow">01 / Overview</p><h2>Personal Task Manager</h2><p>Vertral Tasks helps users collect daily work, organize it by category, and make steady progress without losing track of what is finished. Tasks remain available after a refresh, so the app is useful beyond a single session.</p><div className="guide-meta"><span>React</span><span>Client-side persistence</span><span>Responsive UI</span></div></article>
        <article className="guide-panel"><p className="eyebrow">02 / Core features</p><ul className="guide-list"><li>Add tasks with Work, Personal, or Urgent tags</li><li>Edit, complete, and delete any task</li><li>Filter by status and category</li><li>See live active and completed counts</li><li>Keep tasks in localStorage</li></ul></article>
        <article className="guide-panel"><p className="eyebrow">03 / Requirements met</p><ul className="requirement-list">{requirements.map(([title, detail]) => <li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ul></article>
        <article className="guide-panel guide-panel-wide guide-checklist"><div><p className="eyebrow">04 / Submission checklist</p><h2>Ready to walk through</h2></div><div className="checklist-items"><span><b>01</b> Run <code>npm install</code></span><span><b>02</b> Run <code>npm run dev</code></span><span><b>03</b> Add and complete a task</span><span><b>04</b> Refresh to prove persistence</span></div></article>
      </section>
    </main>
    <footer className="app-footer"><Logo /><span>Built for a clearer mind.</span></footer>
  </>;
}

function TaskView() {
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
    setStatus("All");
    setCategory("All");
  }
  function toggleTask(id: string) { setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)); }
  function deleteTask(id: string) { setTasks((current) => current.filter((task) => task.id !== id)); }
  function editTask(id: string, title: string) { setTasks((current) => current.map((task) => task.id === id ? { ...task, title } : task)); }

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  return <><Header activeCount={activeCount} totalCount={tasks.length} /><main className="app-shell"><section className="hero-copy"><div><p className="eyebrow">Your personal command center</p><h1>Make space<br /><em>for what matters.</em></h1></div><p className="hero-note">A calm place to collect the loose ends, make a little progress, and keep moving.</p></section><section className="workspace" aria-label="Task manager"><TaskForm onAddTask={addTask} /><div className="task-section"><div className="section-heading"><div><p className="eyebrow">Your day, sorted</p><h2>Tasks <span>{activeCount}</span></h2></div><p className="completion-note">{completedCount} completed <span aria-hidden="true">/</span> {tasks.length} total</p></div><TaskFilter status={status} category={category} onStatusChange={setStatus} onCategoryChange={setCategory} /><TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} /></div></section></main><footer className="app-footer"><Logo /><span>Built for a clearer mind.</span></footer></>;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  function navigate(event: React.MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("/")) return;
    event.preventDefault();
    window.history.pushState({}, "", href);
    setPath(href);
  }
  return <div onClick={(event) => { const link = (event.target as HTMLElement).closest("a"); if (link?.getAttribute("href")?.startsWith("/")) navigate({ currentTarget: link } as React.MouseEvent<HTMLAnchorElement>); }}>{path === "/guide" ? <GuideView /> : <TaskView />}</div>;
}
