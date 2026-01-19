import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"


export default function PageNotFound() {
  return (
    <div>
      Page Not Found.
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  )
}
