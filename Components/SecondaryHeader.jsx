import { useRouter } from "next/router"

const SecondaryHeader = () => {
    const router = useRouter();

    return (
        <div style={{top: 90}} className="secondary-et-hero-tabs-container">

            <a className="secondary-et-hero-tab" href="#tab-es6">My Panel</a>
            <a className="secondary-et-hero-tab" onClick={() => {router.push({
            pathname: '/dataDetails',
            query: {eventPage: false}
            })}}>My Profile</a>
            <a className="secondary-et-hero-tab" href="#tab-react">My Contacts</a>
            <a className="secondary-et-hero-tab" href="#tab-angular">My Notifications</a>
            <a className="secondary-et-hero-tab" href="#tab-other">My Invitations</a>
            <a className="secondary-et-hero-tab" onClick={() => {router.push('/myEvents')}}> My Events</a>
            <a className="secondary-et-hero-tab" onClick={() => {
                localStorage.setItem('access_Token', null)
                router.push("/login")}}> LogOut</a>

        </div>
    )
}
export default SecondaryHeader