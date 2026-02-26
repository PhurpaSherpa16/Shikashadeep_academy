import { useLocation } from "react-router-dom"


export default function AddUser() {
    const location = useLocation()
    const role = location.state?.role || 'N/A'

  return (
    <div>
        {role && <p>Role: {role}</p>}
    </div>
  )
}
