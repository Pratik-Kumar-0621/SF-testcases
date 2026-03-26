'use client';

import { useState } from 'react';

interface AddTestCaseModalProps {
  isOpen: boolean;
  productTeams: string[];
  onClose: () => void;
  onSave: (testCaseName: string, productTeam: string) => Promise<boolean>;
}

export default function AddTestCaseModal({
  isOpen,
  productTeams,
  onClose,
  onSave,
}: AddTestCaseModalProps) {
  const [formData, setFormData] = useState({ testCaseName: '', productTeam: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.testCaseName.trim() || !formData.productTeam) {
      alert('Please fill in all fields');
      return;
    }

    setIsSaving(true);
    try {
      const success = await onSave(
        formData.testCaseName,
        formData.productTeam
      );
      if (success) {
        setFormData({ testCaseName: '', productTeam: '' });
        onClose();
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-md w-full">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Add New Test Case
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Test Case Name
            </label>
            <input
              type="text"
              value={formData.testCaseName}
              onChange={(e) =>
                setFormData({ ...formData, testCaseName: e.target.value })
              }
              placeholder="Enter test case name"
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Product Team
            </label>
            <select
              value={formData.productTeam}
              onChange={(e) =>
                setFormData({ ...formData, productTeam: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a product team</option>
              {productTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
