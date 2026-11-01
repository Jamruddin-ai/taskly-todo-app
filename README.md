# Taskly — SaaS Productivity & Todo Dashboard

A modern, high-performance SaaS productivity dashboard and Kanban task management web application inspired by contemporary neumorphic and soft-glass aesthetics.

![Taskly Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Features

- **🎯 Kanban Task Board**:
  - Drag-and-drop tasks between workflow columns (`To Do`, `In Progress`, `Under Review`, `Completed`).
  - View switcher: **Focus Tab View** (compact column focus) and **All Columns Grid View** (full Kanban board).
  - Detailed task cards with Priority indicators (`Urgent 🔥`, `High`, `Medium`, `Low`), due dates, assignee avatar stacks, comment counts, attachment counters, and subtask checklists.
  - Confetti celebration upon moving a task to *Completed*!
- **⏱ Pomodoro Timer Widget**:
  - Beautiful pastel gradient glass card with start, pause, and reset controls.
- **📝 Quick Notes Widget**:
  - Live in-place editable scratchpad with auto-save to browser LocalStorage.
- **📅 Interactive Calendar Widget**:
  - Color-coded date highlights for milestone reviews, meetings, and sprint deadlines.
  - Interactive day selection to filter and focus on day-specific deliverables.
- **🎥 Meet Schedule & Simulated Video Call**:
  - Video preview card with microphone and camera toggle states.
  - Interactive *"Join Meet"* modal for simulated daily scrums.
- **💬 Team Chat Widget**:
  - Real-time conversation feed with timestamps, read receipts, and simulated responses.
- **🌓 Dark & Light Mode**:
  - Seamless theme toggling with theme persistence.
- **⌨️ Keyboard Shortcuts**:
  - `⌘S` / `Ctrl+S` quick task creation launcher.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Jamruddin-ai/taskly-todo-app.git
cd taskly-todo-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📄 License
MIT
