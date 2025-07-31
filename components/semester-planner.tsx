"use client"

import { useState, useEffect } from "react"
import { Calendar, Plus, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

interface Goal {
  id: string
  title: string
  description: string
  deadline: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

export function SemesterPlanner() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "medium" as "high" | "medium" | "low",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedGoals = localStorage.getItem("semester-goals")
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("semester-goals", JSON.stringify(goals))
  }, [goals])

  const addGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        ...newGoal,
        completed: false,
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", description: "", deadline: "", priority: "medium" })
      setIsDialogOpen(false)
    }
  }

  const toggleGoal = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
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

  const completedGoals = goals.filter((goal) => goal.completed).length
  const totalGoals = goals.length
  const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Semester Progress</h3>
          <Target className="h-5 w-5 text-teal-600" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-teal-700 dark:text-teal-300">
            <span>
              {completedGoals} of {totalGoals} goals completed
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-teal-200 dark:bg-teal-800 rounded-full h-2">
            <motion.div
              className="bg-teal-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Academic Goals</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Complete Research Paper"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe your goal..."
                />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as "high" | "medium" | "low" })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button onClick={addGoal} className="w-full bg-teal-600 hover:bg-teal-700">
                Add Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                goal.completed
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`mt-1 transition-colors ${
                      goal.completed ? "text-green-600" : "text-gray-400 hover:text-teal-600"
                    }`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${
                        goal.completed
                          ? "text-green-800 dark:text-green-200 line-through"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {goal.title}
                    </h4>
                    {goal.description && (
                      <p
                        className={`text-sm mt-1 ${
                          goal.completed ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {goal.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {goals.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No goals set yet. Add your first academic goal to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
