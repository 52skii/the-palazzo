"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface Review {
  id: string;
  name: string;
  desc: string;
  rating: number;
  imageUrl?: string;
  pinned: boolean;
  createdAt?: Timestamp;
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      orderBy("pinned", "desc"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Review[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Review, "id">),
      }));
      setReviews(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !desc || rating === 0) return;

    setUploading(true);

    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, `review-images/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "reviews"), {
      name,
      desc,
      rating,
      imageUrl,
      pinned: false,
      createdAt: serverTimestamp(),
    });

    setName("");
    setDesc("");
    setRating(0);
    setImage(null);
    setUploading(false);
  };

  const deleteReview = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteDoc(doc(db, "reviews", id));
    }
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await updateDoc(doc(db, "reviews", id), {
      pinned: !pinned,
    });
  };

  return (
    <section className="bg-[#fafafa] py-16 px-4" id="reviews">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Customer Reviews</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-6 mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="border border-gray-300 p-3 rounded-md"
            />
          </div>

          <textarea
            placeholder="Share your experience..."
            className="w-full border border-gray-300 p-4 rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                className={`cursor-pointer text-2xl transition ${
                  i <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(i)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-yellow-600 text-white font-medium px-6 py-3 rounded-md hover:bg-yellow-700 transition w-full sm:w-auto"
          >
            {uploading ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        <div className="space-y-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-lg p-6 relative border border-gray-100"
            >
              {review.pinned && (
                <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  Pinned
                </span>
              )}

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-3">{review.desc}</p>

              {review.imageUrl && (
                <div className="mb-4">
                  <Image
                    src={review.imageUrl}
                    alt="Review"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full max-h-[400px]"
                  />
                </div>
              )}

              {user && (
                <div className="mt-2 flex gap-6 text-sm text-gray-600">
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="hover:text-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => togglePin(review.id, review.pinned)}
                    className="hover:text-blue-600 transition"
                  >
                    {review.pinned ? "Unpin" : "Pin"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
