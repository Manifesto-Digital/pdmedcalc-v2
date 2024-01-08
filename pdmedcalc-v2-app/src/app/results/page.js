import { redirect } from 'next/navigation'
import Back from "../components/back/Back"

export default function Results(req) {
    console.log(req.searchParams)
    if (!req.searchParams.medicine) { redirect('/'); }

    return (
        <main>
            <Back href='/calculator' text='Back to calulator' />
            <p>You are now on the results page</p>
        </main>
    )
}