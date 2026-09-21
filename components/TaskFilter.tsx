"use client";

import { TaskCategory } from "@/src/types/task";

export type StatusFilter = "All" | "Active" | "Completed";
export type CategoryFilter = "All" | TaskCategory;
type TaskFilterProps = { status: StatusFilter; category: CategoryFilter; onStatusChange: (value: StatusFilter) => void; onCategoryChange: (value: CategoryFilter) => void };
const statuses: StatusFilter[] = ["All", "Active", "Completed"];
const categories: CategoryFilter[] = ["All", "Work", "Personal", "Urgent"];

export default function TaskFilter({ status, category, onStatusChange, onCategoryChange }: TaskFilterProps) {
  return <div className="filter-bar" aria-label="Task filters">
    <div className="segmented-control" role="group" aria-label="Filter by status">{statuses.map((option) => <button key={option} className={status === option ? "is-selected" : ""} onClick={() => onStatusChange(option)} type="button" aria-pressed={status === option}>{option}</button>)}</div>
    <div className="category-filters" role="group" aria-label="Filter by category">{categories.map((option) => <button key={option} className={`${category === option ? "is-selected" : ""} category-${option.toLowerCase()}`} onClick={() => onCategoryChange(option)} type="button" aria-pressed={category === option}><span className="category-dot" aria-hidden="true" />{option}</button>)}</div>
  </div>;
}