import Link from 'next/link';
export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Learn the basics of JavaScript programming language",
      level: "Beginner",
      duration: "4 weeks",
      students: 1250,
      rating: 4.8,
      image: "🟨",
      topics: ["Variables", "Functions", "DOM Manipulation", "Events"]
    },
    {
      id: 2,
      title: "Python for Beginners",
      description: "Start your programming journey with Python",
      level: "Beginner",
      duration: "6 weeks",
      students: 980,
      rating: 4.9,
      image: "🐍",
      topics: ["Syntax", "Data Types", "Loops", "Functions"]
    },
    {
      id: 3,
      title: "React Development",
      description: "Build modern web applications with React",
      level: "Intermediate",
      duration: "8 weeks",
      students: 750,
      rating: 4.7,
      image: "⚛️",
      topics: ["Components", "State", "Props", "Hooks"]
    },
    {
      id: 4,
      title: "TypeScript Mastery",
      description: "Master TypeScript for better JavaScript development",
      level: "Intermediate",
      duration: "5 weeks",
      students: 620,
      rating: 4.6,
      image: "🔷",
      topics: ["Types", "Interfaces", "Generics", "Decorators"]
    },
    {
      id: 5,
      title: "Node.js Backend",
      description: "Build scalable backend applications with Node.js",
      level: "Advanced",
      duration: "10 weeks",
      students: 450,
      rating: 4.8,
      image: "🟢",
      topics: ["Express", "APIs", "Database", "Authentication"]
    },
    {
      id: 6,
      title: "Full Stack Development",
      description: "Complete web development from frontend to backend",
      level: "Advanced",
      duration: "12 weeks",
      students: 320,
      rating: 4.9,
      image: "🚀",
      topics: ["Frontend", "Backend", "Database", "Deployment"]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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
                <Link href="/courses" className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  Courses
                </Link>
                <Link href="/practice" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our comprehensive collection of programming courses designed to take you from beginner to expert.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            All Courses
          </button>
          <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            Beginner
          </button>
          <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            Intermediate
          </button>
          <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            Advanced
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{course.image}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>⏱️ {course.duration}</span>
                  <span>👥 {course.students} students</span>
                  <span>⭐ {course.rating}</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Topics covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their careers with our comprehensive programming courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Browse All Courses
            </button>
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




