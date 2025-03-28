"use client"
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="hidden h-[1.5rem] w-[1.3rem] dark:block" />
      <Moon className="h-5 w-5 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}