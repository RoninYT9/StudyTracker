"use client"

import { useState, useEffect } from "react"
import { Calendar, BookOpen, CheckSquare, Calculator, User, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SemesterPlanner } from "@/components/semester-planner"
import { ClassScheduler } from "@/components/class-scheduler"
import { AssignmentTracker } from "@/components/assignment-tracker"
import { GPACalculator } from "@/components/gpa-calculator"
import { LoginModal } from "@/components/login-modal"
import { motion, AnimatePresence } from "framer-motion"

export default function StudentPlanner() {
  const [darkMode, setDarkMode] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Load user data
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Show login modal on first visit
      setShowLoginModal(true)
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    setShowLoginModal(true)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">StudyTracker</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-gray-600 dark:text-gray-300">
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setShowLoginModal(true)} size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="px-4 py-3 space-y-2">
                  <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start">
                    {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </Button>
                  {user ? (
                    <>
                      <div className="text-sm text-gray-700 dark:text-gray-300 px-3 py-2">Welcome, {user.name}</div>
                      <Button variant="outline" size="sm" onClick={handleLogout} className="w-full bg-transparent">
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setShowLoginModal(true)} size="sm" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Planner & Study Tracker</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your academic life and boost your productivity
              </p>
            </div>

            <Tabs defaultValue="planner" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <TabsTrigger value="planner" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Planner</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Tasks</span>
                </TabsTrigger>
                <TabsTrigger value="gpa" className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4" />
                  <span className="hidden sm:inline">GPA</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="planner">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Semester Planner</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Plan your academic goals and track milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SemesterPlanner />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Class Scheduler</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Organize your weekly class schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClassScheduler />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Assignment Tracker</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Track your assignments and deadlines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AssignmentTracker />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gpa">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">GPA Calculator</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Calculate and track your GPA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GPACalculator />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Designed by <span className="font-semibold text-teal-600">Ronin</span>
            </div>
          </div>
        </footer>

        {/* Login Modal */}
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      </div>
    </div>
  )
}
