"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Calendar, Flag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  deadline: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "completed"
}

const columns = [
  { id: "todo", title: "To Do", color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  },
]

export function AssignmentTracker() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    deadline: "",
    priority: "medium" as "high" | "medium" | "low",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  useEffect(() => {
    const savedAssignments = localStorage.getItem("assignments")
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments))
  }, [assignments])

  const addAssignment = () => {
    if (newAssignment.title && newAssignment.deadline) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        ...newAssignment,
        status: "todo",
      }
      setAssignments([...assignments, assignment])
      setNewAssignment({
        title: "",
        description: "",
        subject: "",
        deadline: "",
        priority: "medium",
      })
      setIsDialogOpen(false)
    }
  }

  const moveAssignment = (id: string, newStatus: "todo" | "in-progress" | "completed") => {
    setAssignments(
      assignments.map((assignment) => (assignment.id === id ? { ...assignment, status: newStatus } : assignment)),
    )
  }

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString()
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, status: "todo" | "in-progress" | "completed") => {
    e.preventDefault()
    if (draggedItem) {
      moveAssignment(draggedItem, status)
      setDraggedItem(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Assignment Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assignment Board</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Add New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  placeholder="e.g., Math Homework Chapter 5"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="Assignment details..."
                />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newAssignment.deadline}
                  onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={newAssignment.priority}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, priority: e.target.value as "high" | "medium" | "low" })
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button onClick={addAssignment} className="w-full bg-teal-600 hover:bg-teal-700">
                Add Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`p-4 rounded-lg border-2 border-dashed ${column.color} min-h-[400px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as "todo" | "in-progress" | "completed")}
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              {column.title}
              <Badge variant="secondary" className="ml-2">
                {assignments.filter((a) => a.status === column.id).length}
              </Badge>
            </h4>

            <div className="space-y-3">
              <AnimatePresence>
                {assignments
                  .filter((assignment) => assignment.status === column.id)
                  .map((assignment) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, assignment.id)}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm">{assignment.title}</h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto"
                        >
                          ×
                        </Button>
                      </div>

                      {assignment.subject && (
                        <Badge variant="outline" className="text-xs mb-2">
                          {assignment.subject}
                        </Badge>
                      )}

                      {assignment.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{assignment.description}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(assignment.priority)}>
                          <Flag className="h-3 w-3 mr-1" />
                          {assignment.priority}
                        </Badge>

                        <div
                          className={`text-xs flex items-center ${
                            isOverdue(assignment.deadline) ? "text-red-600" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(assignment.deadline).toLocaleDateString()}
                        </div>
                      </div>

                      {isOverdue(assignment.deadline) && assignment.status !== "completed" && (
                        <div className="mt-2 text-xs text-red-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Overdue
                        </div>
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No assignments yet. Add your first assignment to get started!</p>
        </div>
      )}
    </div>
  )
}
