import React from 'react'
import "./Footer.css"

const Footer = () => {
  let date = new Date();
  return (
    <div>
      <footer>
        © MoneyMate {date.getFullYear()}
      </footer>
    </div>
  )
}

export default Footer
