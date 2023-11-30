import {useRouter} from "next/router";

const secondaryHeader = () => {
    const router = useRouter()

    return (
        <>
                <div className="secondary-et-hero-tabs-container">
                    <a className="secondary-et-hero-tab" href="#tab-es6">Dashboard</a>
                    <a className="secondary-et-hero-tab" href="#tab-flexbox">My Profile</a>
                    <a className="secondary-et-hero-tab" href="#tab-react">Calendars</a>
                    <a className="secondary-et-hero-tab" href="#tab-angular"> Events</a>
                    <a className="secondary-et-hero-tab" href="#tab-other"> Seating</a>
                    <a className="secondary-et-hero-tab" href="#tab-other"> Tickets</a>
                    <a className="secondary-et-hero-tab" href="#tab-other"> Invitations/Notifications</a>
                    <a className="secondary-et-hero-tab" href="#tab-other"> Stastics</a>
                    <a className="secondary-et-hero-tab" href="#tab-other"> Favorites</a>
                    <a className="secondary-et-hero-tab" href="#tab-other"> Settings </a>
                    <span className="secondary-et-hero-tab-slider"></span>
                </div>
        </>
    )
}
export default secondaryHeader