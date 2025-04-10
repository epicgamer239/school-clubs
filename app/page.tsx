"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

const clubs = [
  { id: 1, name: "Robotics Club", details: "Learn about robotics and compete in competitions.", supervisor: "Deborah Harris", email: "Deborah.Harris@lcps.org", remind: "remind/robotics" },
  { id: 2, name: "Art Club", details: "Explore various art techniques and create masterpieces.", supervisor: "Michael Smith", email: "Michael.Smith@lcps.org", remind: "remind/art" },
  { id: 3, name: "Science Club", details: "Conduct experiments and dive deep into science topics.", supervisor: "Sarah Johnson", email: "Sarah.Johnson@lcps.org", remind: "remind/science" },
];

export default function ClubPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  // Redirect if not signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUserEmail(user.displayName || user.email || "User");
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">School Clubs</h1>
          <p className="text-gray-600">Welcome, {userEmail}!</p>
          <p className="text-gray-500">Explore the different clubs and find one that interests you.</p>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 p-2 border rounded-md"
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto space-y-4">
        {filteredClubs.map((club) => (
          <Card
            key={club.id}
            className="cursor-pointer p-4 shadow-lg rounded-2xl bg-white flex justify-between items-center"
            onClick={() => setExpanded(expanded === club.id ? null : club.id)}
          >
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{club.name}</h2>
                <motion.div animate={{ rotate: expanded === club.id ? 180 : 0 }}>
                  {expanded === club.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </motion.div>
              </div>
              {expanded === club.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-gray-600"
                >
                  <p>{club.details}</p>
                  <p className="mt-2 font-semibold">
                    Supervisor: {club.supervisor} |{" "}
                    <a href={`mailto:${club.email}`} className="text-blue-500">{club.email}</a>
                  </p>
                  <p className="mt-1">
                    Remind: <a href={`https://${club.remind}`} className="text-blue-500">{club.remind}</a>
                  </p>
                </motion.div>
              )}
            </div>
          </Card>
        ))}
      </main>

      <footer className="text-center mt-6 text-gray-500">
        <p>&copy; 2025 School Club Management</p>
      </footer>
    </div>
  );
}
