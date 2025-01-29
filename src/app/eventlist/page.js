import EventList from '@/components/EventList'
import React from 'react'

export const metadata = {
    title: "Event List - Avöyes ",
    description: "Event List Page"
};

const page = () => {
    return (
        <div>
            <EventList />
        </div>
    )
}

export default page
