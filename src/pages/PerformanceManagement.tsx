import React, { useState } from 'react';
import { BarChart3Icon, PlusIcon, CheckCircle, RefreshCw } from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PerformanceGoal from '../components/modules/performance/PerformanceGoal';
import { currentUser, performanceData } from '../data/mockData';

const PerformanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('goals');
  
  // Get current user's performance data
  const userPerformance = performanceData.find(p => p.employeeId === 'EMP001');
  
  return (
    <AppShell currentUser={currentUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Performance Management</h1>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              variant="primary"
              icon={<PlusIcon className="h-4 w-4" />}
            >
              Add New Goal
            </Button>
          </div>
        </div>
        
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('goals')}
              className={`${
                activeTab === 'goals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Goals
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Performance Reviews
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`${
                activeTab === 'feedback'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              360° Feedback
            </button>
          </nav>
        </div>
        
        {activeTab === 'goals' && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {userPerformance?.goals.map((goal) => (
              <PerformanceGoal key={goal.id} goal={goal} />
            ))}
            
            <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
              <div className="text-center p-6">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <PlusIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Add New Goal</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Create a new performance goal for tracking
                </p>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="mt-6">
            <Card title="Performance Review History">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cycle
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Review Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Q1 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        March 25, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[1, 2, 3, 4].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                            <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                          <span className="ml-2 text-gray-700">4.0</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Q2 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Scheduled for June 30, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          In Progress
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="primary"
                          size="sm"
                        >
                          Self Assessment
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'feedback' && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card title="Received Feedback">
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex items-start">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                      <p className="text-xs text-gray-500">May 10, 2023</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    John has been an excellent team member. His technical skills are outstanding,
                    and he consistently delivers high-quality work. He could improve on
                    documentation and knowledge sharing with the team.
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Technical Skills
                    </span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Quality
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex items-start">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Michael Brown</p>
                      <p className="text-xs text-gray-500">April 28, 2023</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    John has been very helpful with my onboarding process. He's patient
                    and takes time to explain complex concepts. His mentorship is highly valuable.
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Mentorship
                    </span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Communication
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card title="Give Feedback">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Colleague
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Choose a colleague</option>
                    <option value="2">Jane Smith</option>
                    <option value="3">Robert Johnson</option>
                    <option value="4">Emily Davis</option>
                    <option value="5">Michael Brown</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Share your feedback about your colleague's performance, strengths, and areas for improvement..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                        Technical Skills
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                        Communication
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                        Leadership
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                        Teamwork
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                        Problem Solving
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default PerformanceManagement;