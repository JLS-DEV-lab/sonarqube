import { Outlet } from 'react-router-dom'
import { Homepage } from "@pages";

function App() {
  return (
    <div>
      <Outlet
        context={{
          /** Refs */

          /** State */

          /** Form data */
        }}
      />
      <Homepage />
    </div>
  )
}

export default App
