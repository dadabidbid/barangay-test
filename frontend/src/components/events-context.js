"use client"

import { createContext, useState, useEffect } from "react"

export const EventsContext = createContext()

export const EventsProvider = ({ children }) => {
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [publishedEvents, setPublishedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://barangay-test.onrender.com/events/published")
        if (!response.ok) throw new Error("Failed to fetch events")
        const data = await response.json()
        setPublishedEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (expandedEvent) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [expandedEvent])

  return (
    <EventsContext.Provider
      value={{
        expandedEvent,
        setExpandedEvent,
        publishedEvents,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

