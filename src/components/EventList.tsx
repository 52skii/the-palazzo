"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
};

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "events"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(fetched);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteDoc(doc(db, "events", id));
    }
  };

  if (!user) return null;

  return (
    <section className="bg-gray-100 py-12 px-4" id="event-list">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Manage Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-600">No upcoming events yet.</p>
        ) : (
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="w-full h-64 relative">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {event.date} — {event.location}
                  </p>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;
