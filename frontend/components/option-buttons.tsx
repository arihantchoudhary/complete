"use client"

interface OptionButtonsProps {
  options: string[]
  onSelect: (option: string) => void
}

export function OptionButtons({ options, onSelect }: OptionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className="px-4 py-2 bg-white border border-blue-200 rounded-md text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
