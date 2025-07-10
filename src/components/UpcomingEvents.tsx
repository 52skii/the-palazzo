'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Event[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Event, 'id'>),
      }));
      setEvents(fetched);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-4" id="upcoming-events">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming events yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {event.date} • {event.location}
                  </p>
                  <p className="text-gray-700 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
