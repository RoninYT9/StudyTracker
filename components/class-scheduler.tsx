"use client"

import { useState, useEffect } from "react"
import { Plus, MapPin, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface ClassItem {
  id: string
  name: string
  instructor: string
  location: string
  time: string
  day: string
  color: string
  notes?: string
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-teal-500",
]

export function ClassScheduler() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [newClass, setNewClass] = useState({
    name: "",
    instructor: "",
    location: "",
    time: "",
    day: "Monday",
    color: colors[0],
    notes: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedClasses = localStorage.getItem("class-schedule")
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("class-schedule", JSON.stringify(classes))
  }, [classes])

  const addClass = () => {
    if (newClass.name && newClass.time && newClass.day) {
      const classItem: ClassItem = {
        id: Date.now().toString(),
        ...newClass,
      }
      setClasses([...classes, classItem])
      setNewClass({
        name: "",
        instructor: "",
        location: "",
        time: "",
        day: "Monday",
        color: colors[Math.floor(Math.random() * colors.length)],
        notes: "",
      })
      setIsDialogOpen(false)
    }
  }

  const deleteClass = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id))
  }

  const getClassesForDayAndTime = (day: string, time: string) => {
    return classes.filter((cls) => cls.day === day && cls.time === time)
  }

  return (
    <div className="space-y-6">
      {/* Add Class Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Schedule</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-800 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Add New Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  placeholder="e.g., Mathematics 101"
                />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                  placeholder="e.g., Dr. Smith"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newClass.location}
                  onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
                  placeholder="e.g., Room 101"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Day</Label>
                  <select
                    id="day"
                    value={newClass.day}
                    onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <select
                    id="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <div className="flex space-x-2 mt-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewClass({ ...newClass, color })}
                      className={`w-8 h-8 rounded-full ${color} ${
                        newClass.color === color ? "ring-2 ring-gray-400" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newClass.notes}
                  onChange={(e) => setNewClass({ ...newClass, notes: e.target.value })}
                  placeholder="Additional notes..."
                />
              </div>
              <Button onClick={addClass} className="w-full bg-teal-600 hover:bg-teal-700">
                Add Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Schedule Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="font-semibold text-gray-900 dark:text-white p-2">Time</div>
            {days.map((day) => (
              <div key={day} className="font-semibold text-gray-900 dark:text-white p-2 text-center">
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-6 gap-2">
                <div className="p-2 text-sm text-gray-600 dark:text-gray-400 font-medium">{time}</div>
                {days.map((day) => {
                  const dayClasses = getClassesForDayAndTime(day, time)
                  return (
                    <div key={`${day}-${time}`} className="min-h-[60px] p-1">
                      {dayClasses.map((cls) => (
                        <motion.div
                          key={cls.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`${cls.color} text-white p-2 rounded-md text-xs relative group cursor-pointer`}
                        >
                          <div className="font-medium truncate">{cls.name}</div>
                          {cls.instructor && <div className="opacity-90 truncate">{cls.instructor}</div>}
                          {cls.location && (
                            <div className="opacity-80 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">{cls.location}</span>
                            </div>
                          )}

                          {/* Hover tooltip */}
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                            <div className="bg-gray-900 text-white p-2 rounded-md text-xs whitespace-nowrap">
                              <div className="font-medium">{cls.name}</div>
                              {cls.instructor && <div>Instructor: {cls.instructor}</div>}
                              {cls.location && <div>Location: {cls.location}</div>}
                              {cls.notes && <div>Notes: {cls.notes}</div>}
                              <button
                                onClick={() => deleteClass(cls.id)}
                                className="mt-1 text-red-300 hover:text-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {classes.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No classes scheduled yet. Add your first class to get started!</p>
        </div>
      )}
    </div>
  )
}
