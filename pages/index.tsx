import ErrorBoundary from '../components/ErrorBoundary'
import Weather from '../components/weather'

export default function Home() {
  return (
    <ErrorBoundary>
   <Weather/>
    </ErrorBoundary>
  )
}