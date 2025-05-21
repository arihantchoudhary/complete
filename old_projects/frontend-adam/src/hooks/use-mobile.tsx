
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const RESIZE_DEBOUNCE_TIME = 100

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const debounceTimeout = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      // Clear existing timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      
      // Set new timeout
      debounceTimeout.current = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, RESIZE_DEBOUNCE_TIME)
    }

    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Add event listeners
    mql.addEventListener("change", handleResize)
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      mql.removeEventListener("change", handleResize)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return !!isMobile
}

