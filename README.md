# Vertral Tasks

Vertral Tasks is a responsive Personal Task Manager built for the React assignment. Users can capture daily work, organize it by category, filter their list, and keep their progress after refreshing the browser.

## Features

- Add tasks with Work, Personal, or Urgent categories
- Edit, complete, and delete tasks
- Filter by All, Active, or Completed status
- Filter by category
- Live active and completed task counts
- Persist tasks with `localStorage`
- Responsive desktop and mobile layout
- Project Guide page at `/guide` with the assignment checklist

## Technologies

- React 19
- Vite
- React functional components
- TypeScript
- CSS
- Browser `localStorage`

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Use the **Project guide** link in the header to review the assignment requirements.

For a production build:

```bash
npm run build
npm run preview
```

## Screenshots

Add 2-3 screenshots of the running task manager here before submitting. Recommended captures:

1. The task dashboard with active, completed, and categorized tasks.
2. The filtered empty state after selecting a status or category.
3. The Project Guide page at `/guide`.

## Known limitations

- Tasks are stored only in the current browser; there is no account or server sync.
- Drag-and-drop ordering and due dates are not included in this version.
