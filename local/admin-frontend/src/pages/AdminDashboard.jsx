import React, { useState, useEffect } from "react";
import {
  Trash2,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  Search,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../lib/axios";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await api.get("/reported");
      setReports(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reported content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Delete Handler
  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this post?")
    ) {
      try {
        await api.delete(`/${id}/delete`);
        // Optimistic UI update
        setReports((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Error deleting report:", err);
        alert("Failed to delete the post.");
      }
    }
  };

  // Keep / Dismiss Report Handler
  const handleKeep = async (id) => {
    if (window.confirm("Dismiss this report and keep the post?")) {
      try {
        await api.put(`/${id}/keep`);
        // Optimistic UI update
        setReports((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Error dismissing report:", err);
        alert("Failed to dismiss the report.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-red-500">
        <AlertTriangle className="mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-800">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center select-none cursor-default">
        <div className="px-32 text-xl font-bold tracking-tight font-cursive">
          Anonymously Yours{" "}
          <span className="font-sans text-xs text-red-500 bg-red-50 px-2 py-1 rounded ml-2 uppercase tracking-wide">
            Admin
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none cursor-default">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reported Content
            </h1>
            <p className="text-gray-500 mt-1">
              Review and manage flagged posts from the community.
            </p>
          </div>
        </div>

        {/* Dashboard Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-sm overflow-hidden">
          {reports.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-50 rounded-full">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                All caught up!
              </h3>
              <p>There are no reported posts to review.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      Content Preview
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      Timestamps
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr
                      key={report._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Column 1: Image & Report Reason */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-20 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                            {report.imageURL ? (
                              <img
                                className="h-16 w-20 object-cover"
                                src={report.imageURL}
                                alt=""
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            {report.reportReasons &&
                            report.reportReasons.length > 0 ? (
                              <div className="flex flex-wrap gap-1 mb-1">
                                {report.reportReasons.map((reason, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full"
                                  >
                                    <AlertTriangle size={10} />
                                    {reason}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-400 italic mb-1">
                                No reason provided
                              </div>
                            )}
                            <div className="text-xs text-gray-400">
                              ID: #{report._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Caption & Location */}
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm text-gray-900 font-medium mb-1 line-clamp-2">
                            "{report.caption}"
                          </div>
                          {report.location && (
                            <div className="flex items-center text-xs text-gray-500 gap-1">
                              <MapPin size={12} />
                              {report.location}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Column 3: Dates */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-xs text-gray-600 gap-2">
                            <Clock size={12} className="text-gray-400" />
                            <span className="font-semibold w-12">Created:</span>
                            <span>
                              {new Date(report.createdAt).toLocaleDateString()}{" "}
                              {new Date(report.createdAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 4: Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleKeep(report._id)}
                            className="text-gray-600 hover:text-green-600 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-200 px-3 py-1.5 rounded-sm transition-all flex items-center gap-2"
                            title="Dismiss Report (Keep Post)"
                          >
                            <CheckCircle size={16} />
                            Keep
                          </button>
                          <button
                            onClick={() => handleDelete(report._id)}
                            className="text-red-600 hover:text-red-900 bg-white hover:bg-red-50 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-sm transition-all flex items-center gap-2"
                            title="Delete Post"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Global Style for Custom Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Merriweather:wght@300;400&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
