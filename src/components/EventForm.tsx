import React, { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';

const EventForm = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date || !form.image) return;

    setLoading(true);
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `events/${Date.now()}_${form.image.name}`);
      await uploadBytes(imageRef, form.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save event to Firestore
      await addDoc(collection(db, 'events'), {
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.date,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert('✅ Event posted successfully!');
      setForm({ title: '', description: '', location: '', date: '', image: null });
    } catch (error) {
      console.error('Error posting event:', error);
      alert('❌ Failed to post event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show form only to logged-in admins
  if (!user) return null;

  return (
    <section className="bg-gray-50 py-12 px-4" id="admin-events">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post a New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={4}
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location (optional)"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-3 rounded bg-white text-gray-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white font-semibold py-3 rounded hover:bg-yellow-700 transition"
          >
            {loading ? 'Posting...' : 'Post Event'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EventForm;
