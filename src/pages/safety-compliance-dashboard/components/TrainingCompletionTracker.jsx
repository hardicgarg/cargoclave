import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const TrainingCompletionTracker = () => {
  const trainingData = [
    { course: 'Defensive Driving', completed: 298, pending: 44, total: 342 },
    { course: 'Hazmat Handling', completed: 156, pending: 23, total: 179 },
    { course: 'First Aid', completed: 312, pending: 30, total: 342 },
    { course: 'Vehicle Safety', completed: 289, pending: 53, total: 342 },
    { course: 'DOT Regulations', completed: 267, pending: 75, total: 342 }
  ];

  const overallCompletion = Math.round((trainingData?.reduce((acc, course) => acc + course?.completed, 0) / 
                                       trainingData?.reduce((acc, course) => acc + course?.total, 0)) * 100);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Training Completion Tracker</h3>
          <p className="text-sm text-muted-foreground">Required safety training progress</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
          <Icon name="BookOpen" size="0.875rem" className="text-primary" />
          <span className="text-sm font-bold text-primary">{overallCompletion}%</span>
        </div>
      </div>

      <div className="h-[17.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={trainingData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis dataKey="course" type="category" width="7.5rem" stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: "0.5rem"
            }} 
          />
          <Legend />
          <Bar dataKey="completed" fill="#10b981" name="Completed" stackId="a" />
          <Bar dataKey="pending" fill="#f97316" name="Pending" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {trainingData?.map((course, index) => {
          const completionRate = Math.round((course?.completed / course?.total) * 100);
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{course?.course}</span>
                <span className="text-muted-foreground">
                  {course?.completed}/{course?.total} ({completionRate}%)
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingCompletionTracker;