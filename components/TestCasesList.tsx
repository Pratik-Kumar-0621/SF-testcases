'use client';

import { useEffect, useState } from "react";

interface TestCase {
  'Test Case Name ': string;
  'Product Teams': string;
}

interface TestCasesListProps {
  testCases: TestCase[];
  selectedTeam: string;
  selectedTestCases: Set<string>;
  onSelectChange: (testCaseName: string, isChecked: boolean) => void;
}

export default function TestCasesList({
  testCases,
  selectedTeam,
  selectedTestCases,
  onSelectChange,
}: TestCasesListProps) {

  const [data, setData] = useState<TestCase[]>([]);

  useEffect(() => {
    const filteredData = testCases.filter(
      (tc) => tc['Product Teams'].trim() === selectedTeam
    );
    const removedDuplicates = Array.from(new Set(filteredData.map((tc) => tc['Test Case Name ']))).map(
      (name) => filteredData.find((tc) => tc['Test Case Name '] === name)!
    );
    setData(removedDuplicates);
  }, [testCases, selectedTeam]);



  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow mb-20">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Test Cases for {selectedTeam}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {data.length} test cases
        </p>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {data.length > 0 ? (
          data.map((testCase, index) => (
            <div
              key={index}
              className="px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3"
            >
              <input
                type="checkbox"
                id={`testcase-${index}`}
                checked={selectedTestCases.has(testCase['Test Case Name '])}
                onChange={(e) =>
                  onSelectChange(testCase['Test Case Name '], e.target.checked)
                }
                className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor={`testcase-${index}`}
                className="flex-1 text-zinc-900 dark:text-white font-medium cursor-pointer"
              >
                {testCase['Test Case Name ']}
              </label>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-zinc-600 dark:text-zinc-400">
            No test cases available for this product team.
          </div>
        )}
      </div>
    </div>
  );
}
