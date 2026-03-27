'use client';

import { useState } from 'react';

interface HeaderProps {
  productTeams: string[];
  selectedTeam: string;
  onTeamChange: (team: string) => void;
  onAddClick: () => void;
}

export default function Header({
  productTeams,
  selectedTeam,
  onTeamChange,
  onAddClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left side - Dropdown */}
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Product Teams
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => onTeamChange(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {productTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Right side - Add Test Case Button */}
          <button
            onClick={onAddClick}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            + Add Test Case
          </button>
        </div>
      </div>
    </header>
  );
}
