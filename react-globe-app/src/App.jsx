import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Email submitted:', email)
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <h1>City AI</h1>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener">FB</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener">IN</a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener">X</a>
          </div>
        </header>

        <div className="globe-container">
          <iframe 
            src="https://my.spline.design/planetbw-f8f404c0bd70dfef5908d623a953d7da/" 
            style={{width: '100%', height: '100%', border: 'none'}}
            loading="lazy"
            fetchpriority="auto"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          />
        </div>

        <div className="input-section">
          <div className="input-wrapper">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ask Anything"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
              <input type="submit" value="Enter" className="submit-button" />
            </form>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-left">
            <a href="https://www.linkedin.com/in/arihantchoudhary/" target="_blank" rel="noopener">
              © City AI
            </a>
          </div>
          <div className="footer-center">
            <a href="https://shop.swissthemes.design/buy/a3b21e43-58dc-4561-94e3-c99ae6e91327" target="_blank" rel="noopener">
              Complete Global Supply Chain Intelligence
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
