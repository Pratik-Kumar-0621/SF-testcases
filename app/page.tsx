'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TestCasesList from '../components/TestCasesList';
import ExecuteButton from '../components/ExecuteButton';
import AddTestCaseModal from '../components/AddTestCaseModal';
import Toast from '../components/Toast';

interface TestCase {
  'Test Case Name ': string;
  'Product Teams': string;
}

export default function Home() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [productTeams, setProductTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedTestCases, setSelectedTestCases] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Fetch test cases on component mount
  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await fetch('/api/test-cases');
        const data: TestCase[] = await response.json();
        setTestCases(data);

        // Extract unique product teams
        const teams = Array.from(
          new Set(data.map((tc) => tc['Product Teams'].trim()))
        ).sort();
        setProductTeams(teams);
        if (teams.length > 0) {
          setSelectedTeam(teams[0]);
        }
      } catch (error) {
        console.error('Failed to fetch test cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestCases();
  }, []);

  // Handle test case selection
  const handleSelectTestCase = (testCaseName: string, isChecked: boolean) => {
    setSelectedTestCases((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(testCaseName);
      } else {
        newSet.delete(testCaseName);
      }
      return newSet;
    });
  };

  // Handle execute button click
  const handleExecute = async () => {
    if (selectedTestCases.size === 0) {
      alert('Please select at least one test case');
      return;
    }

    setIsExecuting(true);
    try {
      // Simulate execution
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setToastMessage('Test cases submitted for execution');
      setShowToast(true);
      setSelectedTestCases(new Set());
    } catch (error) {
      console.error('Error executing test cases:', error);
      setToastMessage('Error submitting test cases');
      setShowToast(true);
    } finally {
      setIsExecuting(false);
    }
  };

  // Handle add test case
  const handleSaveTestCase = async (
    testCaseName: string,
    productTeam: string
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/test-cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testCaseName,
          productTeam,
        }),
      });

      if (response.ok) {
        // Refetch test cases
        const res = await fetch('/api/test-cases');
        const data: TestCase[] = await res.json();
        setTestCases(data);

        setToastMessage('Test case added successfully!');
        setShowToast(true);
        return true;
      } else {
        setToastMessage('Failed to save test case');
        setShowToast(true);
        return false;
      }
    } catch (error) {
      console.error('Error saving test case:', error);
      setToastMessage('Error saving test case');
      setShowToast(true);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header
        productTeams={productTeams}
        selectedTeam={selectedTeam}
        onTeamChange={setSelectedTeam}
        onAddClick={() => setIsModalOpen(true)}
      />

      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        <TestCasesList
          testCases={testCases}
          selectedTeam={selectedTeam}
          selectedTestCases={selectedTestCases}
          onSelectChange={handleSelectTestCase}
        />
      </main>

      <ExecuteButton
        isVisible={selectedTestCases.size > 0}
        selectedCount={selectedTestCases.size}
        onExecute={handleExecute}
        isLoading={isExecuting}
      />

      <AddTestCaseModal
        isOpen={isModalOpen}
        productTeams={productTeams}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTestCase}
      />

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
