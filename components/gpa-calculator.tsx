"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Calculator, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface Course {
  id: string
  name: string
  grade: string
  credits: number
  gradePoints: number
}

const gradeScale: { [key: string]: number } = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
}

export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([])
  const [newCourse, setNewCourse] = useState({
    name: "",
    grade: "A",
    credits: 3,
  })

  useEffect(() => {
    const savedCourses = localStorage.getItem("gpa-courses")
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("gpa-courses", JSON.stringify(courses))
  }, [courses])

  const addCourse = () => {
    if (newCourse.name && newCourse.grade && newCourse.credits > 0) {
      const course: Course = {
        id: Date.now().toString(),
        name: newCourse.name,
        grade: newCourse.grade,
        credits: newCourse.credits,
        gradePoints: gradeScale[newCourse.grade] || 0,
      }
      setCourses([...courses, course])
      setNewCourse({ name: "", grade: "A", credits: 3 })
    }
  }

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const calculateGPA = () => {
    if (courses.length === 0) return 0

    const totalGradePoints = courses.reduce((sum, course) => sum + course.gradePoints * course.credits, 0)
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0
  }

  const currentGPA = calculateGPA()
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)

  const getGradeColor = (grade: string) => {
    const gradePoint = gradeScale[grade] || 0
    if (gradePoint >= 3.7) return "text-green-600 dark:text-green-400"
    if (gradePoint >= 3.0) return "text-blue-600 dark:text-blue-400"
    if (gradePoint >= 2.0) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return "text-green-600 dark:text-green-400"
    if (gpa >= 3.0) return "text-blue-600 dark:text-blue-400"
    if (gpa >= 2.0) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* GPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-teal-900 dark:text-teal-100">Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGPAColor(currentGPA)}`}>{currentGPA.toFixed(2)}</div>
            <p className="text-xs text-teal-700 dark:text-teal-300 mt-1">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCredits}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Credit hours</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{courses.length}</div>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Total courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Course Form */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Add Course
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter your course details to calculate your GPA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                placeholder="e.g., Calculus I"
              />
            </div>
            <div>
              <Label htmlFor="grade">Grade</Label>
              <select
                id="grade"
                value={newCourse.grade}
                onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {Object.keys(gradeScale).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade} ({gradeScale[grade].toFixed(1)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="6"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <Button onClick={addCourse} className="mt-4 bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </CardContent>
      </Card>

      {/* Courses List */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Course List</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your enrolled courses and grades
          </CardDescription>
        </CardHeader>
        <CardContent>
          {courses.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence>
                {courses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>Credits: {course.credits}</span>
                        <span className={`font-medium ${getGradeColor(course.grade)}`}>Grade: {course.grade}</span>
                        <span>Points: {course.gradePoints.toFixed(1)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCourse(course.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No courses added yet. Add your first course to calculate your GPA!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* GPA Progress Bar */}
      {courses.length > 0 && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">GPA Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current GPA</span>
                <span className={`font-medium ${getGPAColor(currentGPA)}`}>{currentGPA.toFixed(2)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    currentGPA >= 3.7
                      ? "bg-green-500"
                      : currentGPA >= 3.0
                        ? "bg-blue-500"
                        : currentGPA >= 2.0
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentGPA / 4.0) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
