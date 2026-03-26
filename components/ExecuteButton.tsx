'use client';

interface ExecuteButtonProps {
  isVisible: boolean;
  selectedCount: number;
  onExecute: () => void;
  isLoading?: boolean;
}

export default function ExecuteButton({
  isVisible,
  selectedCount,
  onExecute,
  isLoading = false,
}: ExecuteButtonProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-39 flex flex-col items-end gap-2">
      <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-4 py-2 rounded-lg shadow">
        {selectedCount} test case{selectedCount !== 1 ? 's' : ''} selected
      </p>
      <button
        onClick={onExecute}
        disabled={isLoading}
        className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Executing...' : 'Execute'}
      </button>
    </div>
  );
}
