import Link from 'next/link'
import { useRouter } from 'next/router'
import Search from '../components/search';

export default function Page() {
  const router = useRouter()
  const id:string | string[] | undefined = router.query.id;

  return (
    <div>
          <Search id={id}/>
    </div>
  )
}