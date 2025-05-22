"use client";

import { useAuth } from "@/hooks/useAuth";
import { fetchCrew } from "@/lib/redux/slices/crewSlice";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { user, loading } = useAuth({
    protectedRoute: true,
    redirectTo: "/sign-in",
  });
  const [filterRank, setFilterRank] = useState(null);

 

  const { crew, crewIsLoading, crewError } = useSelector((state) => state.crew);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCrew());
  }, []);

  console.log(crew);

  const ranks = Array.from(new Set(crew.map((c) => c.rank)));

  const filteredCrew = filterRank
    ? crew.filter((member) => member.rank === filterRank)
    : crew;

  if (!user) return <p>Loading...</p>;

  const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return  (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Crew List</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterRank(null)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            filterRank === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        {ranks.map((rank) => (
          <button
            key={rank}
            onClick={() => setFilterRank(rank)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filterRank === rank
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {rank}
          </button>
        ))}
      </div>

      <div className="w-full max-w-6xl overflow-x-auto bg-white rounded-lg shadow-lg transition-all duration-300">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">DOB</th>
              <th className="px-4 py-2">Nationality</th>
              <th className="px-4 py-2">Passport</th>
              <th className="px-4 py-2">Passport Validity</th>
              <th className="px-4 py-2">Licence</th>
              <th className="px-4 py-2">Working From</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {filteredCrew.map((member) => (
              <tr key={member._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {member.img ? (
                    <img
                      src={member.img}
                      alt={member.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      {getInitials(member.fullname)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{member.fullname}</td>
                <td className="px-4 py-2">{member.rank}</td>
                <td className="px-4 py-2">{member.dob}</td>
                <td className="px-4 py-2">{member.nationality}</td>
                <td className="px-4 py-2">{member.passport}</td>
                <td className="px-4 py-2">{member.passportValidity}</td>
                <td className="px-4 py-2">{member.licenceNbr || "N/A"}</td>
                <td className="px-4 py-2">{member.workingFrom || "N/A"}</td>
                <td className="px-4 py-2">
                  {member.type ? member.type[0] : "N/A"}
                  {/* {member.type?.replace(/[\[\]"]/g, "") || "N/A"} */}
                </td>
              </tr>
            ))}
            {filteredCrew.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center text-gray-500">
                  No crew members found for this rank.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
