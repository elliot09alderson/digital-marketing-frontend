import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiTrash2, FiCalendar, FiSearch, 
  FiUsers, FiFileText, FiLogOut, FiMenu, FiX, FiRefreshCw
} from 'react-icons/fi';
import { BsFiletypeCsv, BsFiletypePdf } from 'react-icons/bs';
import { API_URL } from '../config/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');

  // Check auth on mount
  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchRegistrations();
    fetchStats();
  }, [token, navigate]);

  // Fetch registrations
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateFilter) params.append('date', dateFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`${API_URL}/registrations?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (err) {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/registrations/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  // Re-fetch when filters change
  useEffect(() => {
    if (token) {
      fetchRegistrations();
    }
  }, [dateFilter, searchTerm]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin');
  };

  // Export to CSV
  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Country', 'City', 'Profession', 'Date'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg => 
        [reg.name, reg.phone, reg.email || 'N/A', reg.country, reg.city, reg.profession, new Date(reg.createdAt).toLocaleDateString()].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Export to PDF
  const exportPDF = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Registrations Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #14b8a6; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background: #14b8a6; color: white; }
            tr:nth-child(even) { background: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Registration Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <p>Total Records: ${registrations.length}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Profession</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${registrations.map(reg => `
                <tr>
                  <td>${reg.name}</td>
                  <td>${reg.phone}</td>
                  <td>${reg.email || 'N/A'}</td>
                  <td>${reg.city}, ${reg.country}</td>
                  <td>${reg.profession}</td>
                  <td>${new Date(reg.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  // Delete handlers
  const handleDeleteClick = (type, id = null) => {
    setDeleteType(type);
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === 'single') {
        await fetch(`${API_URL}/registrations/${deleteId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } else if (deleteType === 'selected') {
        await fetch(`${API_URL}/registrations/delete-multiple`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: selectedIds })
        });
        setSelectedIds([]);
      } else if (deleteType === 'all') {
        await fetch(`${API_URL}/registrations`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setSelectedIds([]);
      }
      
      fetchRegistrations();
      fetchStats();
    } catch (err) {
      setError('Delete failed');
    }
    setShowDeleteConfirm(false);
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === registrations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(registrations.map(r => r._id));
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 font-sans cursor-auto">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-2.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-white font-semibold">Admin Panel</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center text-white"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-dark-950/80" onClick={() => setIsSidebarOpen(false)} />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-dark-700/50 p-4"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img src="/logo-2.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
                <span className="text-white font-semibold">Admin</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-dark-400">
                <FiX size={20} />
              </button>
            </div>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
                <FiUsers /> Registrations
              </a>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
              >
                <FiLogOut /> Logout
              </button>
            </nav>
          </motion.div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-dark-700/50 p-6 pt-10">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo-2.jpeg" alt="Logo" className="w-12 h-12 rounded-full" />
          <div>
            <span className="text-white font-semibold block">Admin Panel</span>
            <span className="text-dark-500 text-xs">Dashboard</span>
          </div>
        </div>
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
            <FiUsers /> Registrations
          </a>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-10 min-h-screen p-4 lg:p-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
            {error}
            <button onClick={() => setError('')} className="ml-2">✕</button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card-water-glass p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                <FiUsers />
              </div>
              <div>
                <p className="text-dark-400 text-xs lg:text-sm">Total</p>
                <p className="text-white text-xl lg:text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="card-water-glass p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                <FiCalendar />
              </div>
              <div>
                <p className="text-dark-400 text-xs lg:text-sm">Today</p>
                <p className="text-white text-xl lg:text-2xl font-bold">{stats.today}</p>
              </div>
            </div>
          </div>
          <div className="card-water-glass p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <FiFileText />
              </div>
              <div>
                <p className="text-dark-400 text-xs lg:text-sm">Filtered</p>
                <p className="text-white text-xl lg:text-2xl font-bold">{registrations.length}</p>
              </div>
            </div>
          </div>
          <div className="card-water-glass p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <FiRefreshCw />
              </div>
              <div>
                <p className="text-dark-400 text-xs lg:text-sm">Selected</p>
                <p className="text-white text-xl lg:text-2xl font-bold">{selectedIds.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="card-water-glass p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="text"
                placeholder="Search by name, phone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50"
              />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full lg:w-48 px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white focus:outline-none focus:border-primary-500/50 [color-scheme:dark]"
              />
            </div>

            {/* Clear Filter */}
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="px-4 py-3 rounded-xl bg-dark-800 border border-dark-600/50 text-dark-400"
              >
                Clear
              </button>
            )}

            {/* Export Buttons */}
            <div className="flex gap-2">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400"
              >
                <BsFiletypeCsv /> <span className="hidden sm:inline">CSV</span>
              </button>
              <button
                onClick={exportPDF}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400"
              >
                <BsFiletypePdf /> <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            {/* Delete Buttons */}
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <button
                  onClick={() => handleDeleteClick('selected')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400"
                >
                  <FiTrash2 /> Delete ({selectedIds.length})
                </button>
              )}
              <button
                onClick={() => handleDeleteClick('all')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400"
              >
                <FiTrash2 /> <span className="hidden sm:inline">Delete All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="card-water-glass overflow-hidden">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px] gap-4 p-4 bg-dark-800/50 border-b border-dark-700/30 text-dark-400 text-sm font-medium">
            <div>
              <input
                type="checkbox"
                checked={selectedIds.length === registrations.length && registrations.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded accent-primary-500"
              />
            </div>
            <div>Name</div>
            <div>Contact</div>
            <div>Location</div>
            <div>Profession</div>
            <div>Date</div>
            <div>Actions</div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="p-8 text-center text-dark-500">
              <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-2" />
              Loading...
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-8 text-center text-dark-500">
              No registrations found
            </div>
          ) : (
            <div className="divide-y divide-dark-700/30">
              {registrations.map((reg) => (
                <div key={reg._id} className="p-4">
                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(reg._id)}
                          onChange={() => toggleSelect(reg._id)}
                          className="w-4 h-4 rounded accent-primary-500"
                        />
                        <div>
                          <p className="text-white font-semibold">{reg.name}</p>
                          <p className="text-primary-400 text-sm">{reg.profession}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteClick('single', reg._id)}
                        className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-dark-500">Phone</p>
                        <p className="text-dark-300">{reg.phone}</p>
                      </div>
                      <div>
                        <p className="text-dark-500">Email</p>
                        <p className="text-dark-300">{reg.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-dark-500">Location</p>
                        <p className="text-dark-300">{reg.city}, {reg.country}</p>
                      </div>
                      <div>
                        <p className="text-dark-500">Date</p>
                        <p className="text-dark-300">{new Date(reg.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Table Row */}
                  <div className="hidden lg:grid grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_100px] gap-4 items-center">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(reg._id)}
                        onChange={() => toggleSelect(reg._id)}
                        className="w-4 h-4 rounded accent-primary-500"
                      />
                    </div>
                    <div className="text-white font-medium">{reg.name}</div>
                    <div>
                      <p className="text-dark-300 text-sm">{reg.phone}</p>
                      <p className="text-dark-500 text-xs">{reg.email || 'No email'}</p>
                    </div>
                    <div className="text-dark-300 text-sm">{reg.city}, {reg.country}</div>
                    <div>
                      <span className="px-2 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-xs">
                        {reg.profession}
                      </span>
                    </div>
                    <div className="text-dark-400 text-sm">{new Date(reg.createdAt).toLocaleDateString()}</div>
                    <div>
                      <button
                        onClick={() => handleDeleteClick('single', reg._id)}
                        className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark-950/90" onClick={() => setShowDeleteConfirm(false)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-dark-900 border border-dark-700/50 rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-2">Confirm Delete</h3>
            <p className="text-dark-400 mb-6">
              {deleteType === 'single' && 'Are you sure you want to delete this registration?'}
              {deleteType === 'selected' && `Are you sure you want to delete ${selectedIds.length} selected registrations?`}
              {deleteType === 'all' && 'Are you sure you want to delete ALL registrations? This cannot be undone.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-dark-800 text-dark-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
