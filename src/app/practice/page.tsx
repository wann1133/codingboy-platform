'use client';
import Link from 'next/link';

import { useState } from 'react';

export default function Practice() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(`// Welcome to CodingBoy Practice!
// Try solving this problem:

function greetUser(name) {
  // Your code here
  return "Hello, " + name + "!";
}

// Test your function
console.log(greetUser("CodingBoy"));`);

  const challenges = [
    {
      id: 1,
      title: "Hello World",
      difficulty: "Easy",
      description: "Write a function that returns 'Hello, World!'",
      language: "javascript",
      solved: true
    },
    {
      id: 2,
      title: "Sum of Two Numbers",
      difficulty: "Easy",
      description: "Create a function that adds two numbers together",
      language: "javascript",
      solved: true
    },
    {
      id: 3,
      title: "Reverse String",
      difficulty: "Medium",
      description: "Write a function that reverses a given string",
      language: "javascript",
      solved: false
    },
    {
      id: 4,
      title: "FizzBuzz",
      difficulty: "Medium",
      description: "Print numbers 1-100, but replace multiples of 3 with 'Fizz' and multiples of 5 with 'Buzz'",
      language: "javascript",
      solved: false
    },
    {
      id: 5,
      title: "Palindrome Checker",
      difficulty: "Hard",
      description: "Determine if a string is a palindrome",
      language: "javascript",
      solved: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const runCode = () => {
    // In a real implementation, this would execute the code safely
    alert('Code execution feature coming soon! This would run your code in a secure environment.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  CodingBoy
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/courses" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  Courses
                </Link>
                <Link href="/practice" className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  Practice
                </Link>
                <Link href="/tentang" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Practice Coding
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Sharpen your programming skills with hands-on challenges and interactive coding exercises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Challenges
              </h2>
              
              {/* Language Filter */}
              <div className="mb-4">
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <div 
                    key={challenge.id} 
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        {challenge.solved && (
                          <span className="text-green-500">✓</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Challenges Completed</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Code Editor
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={runCode}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      ▶ Run Code
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your code here..."
                />
              </div>

              {/* Output Section */}
              <div className="border-t border-gray-200 dark:border-gray-600">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Output</h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px]">
                    <div className="text-gray-500">Output will appear here when you run your code</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">15</div>
            <div className="text-gray-600 dark:text-gray-300">Problems Solved</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">7</div>
            <div className="text-gray-600 dark:text-gray-300">Day Streak</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">3</div>
            <div className="text-gray-600 dark:text-gray-300">Languages</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">1,250</div>
            <div className="text-gray-600 dark:text-gray-300">Points Earned</div>
          </div>
        </div>
      </div>
    </div>
  );
}

