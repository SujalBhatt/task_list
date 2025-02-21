import { useState } from "react";
import axios from "axios";
import "./TaskForm.css";

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("To Do");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !dueDate.trim()) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.post("http://localhost:3000/tasks", { title, dueDate, priority, status });
            setTitle("");
            setDueDate("");
            setPriority("Medium");
            setStatus("To Do");
            onTaskCreated();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="border p-2 rounded"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 rounded"
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
        </form>
    );
}