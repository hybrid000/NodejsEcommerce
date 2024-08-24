import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./context/AuthContext";
import App from './App'
const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(<AuthProvider>
<HelmetProvider>

    <App />
</HelmetProvider>
</AuthProvider>
)


