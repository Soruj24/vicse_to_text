export function ThemeToggle() {
  return (
    <div className="relative">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-black/20 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[1.2rem] w-[1.2rem]"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <span className="sr-only">Dark mode</span>
      </div>
    </div>
  )
}
