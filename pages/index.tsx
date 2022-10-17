import ErrorBoundary from '../components/ErrorBoundary'
import Search from '../components/search'

export default function Home() {
  return (
    <ErrorBoundary>
   <Search />
    </ErrorBoundary>
  )
}