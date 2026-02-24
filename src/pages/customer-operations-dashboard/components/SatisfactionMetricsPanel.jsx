import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const SatisfactionMetricsPanel = () => {
  const satisfactionData = [
    { category: 'Punctuality', score: 96.5, color: 'hsl(var(--success))' },
    { category: 'Communication', score: 94.2, color: 'hsl(var(--primary))' },
    { category: 'Quality', score: 92.8, color: 'hsl(var(--accent))' },
    { category: 'Support', score: 91.3, color: 'hsl(var(--warning))' }
  ];

  const sentimentData = [
    { label: 'Positive', value: 78, color: 'bg-success', icon: 'ThumbsUp' },
    { label: 'Neutral', value: 15, color: 'bg-warning', icon: 'Minus' },
    { label: 'Negative', value: 7, color: 'bg-destructive', icon: 'ThumbsDown' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-semibold text-foreground mb-1">{payload?.[0]?.payload?.category}</p>
          <p className="text-xs text-muted-foreground">Score: {payload?.[0]?.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Customer Satisfaction Tracking</h2>
          <p className="text-sm text-muted-foreground">Delivery performance and service quality metrics</p>
        </div>
        <div className="flex items-center gap-2 bg-success/10 px-3 py-2 rounded-lg">
          <Icon name="TrendingUp" size="1.125rem" className="text-success" />
          <span className="text-sm font-semibold text-success">+3.2% vs last month</span>
        </div>
      </div>

      {/* Overall Satisfaction Score */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Overall Satisfaction Score</p>
            <div className="flex items-center gap-3">
              <h3 className="text-4xl font-bold text-foreground">4.7</h3>
              <span className="text-2xl text-muted-foreground">/5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size="1.25rem"
                  className={star <= 4.7 ? 'text-warning' : 'text-muted-foreground/30'}
                  fill={star <= 4.7 ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Based on</p>
            <p className="text-2xl font-bold text-foreground">8,947</p>
            <p className="text-xs text-muted-foreground">customer reviews</p>
          </div>
        </div>
      </div>

      {/* Category Scores Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Performance by Category</h3>
        <div className="h-[12.5rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={satisfactionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="category" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.75rem" }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {satisfactionData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

      {/* Feedback Sentiment Analysis */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Feedback Sentiment Analysis</h3>
        <div className="space-y-3">
          {sentimentData?.map((sentiment, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name={sentiment?.icon} size="1rem" className={`text-${sentiment?.color?.replace('bg-', '')}`} />
                  <span className="text-sm font-medium text-foreground">{sentiment?.label}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{sentiment?.value}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`${sentiment?.color} h-2 rounded-full transition-all`}
                  style={{ width: `${sentiment?.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Key Insights</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs">
            <Icon name="CheckCircle2" size="0.875rem" className="text-success mt-0.5" />
            <p className="text-muted-foreground">Punctuality rates improved by 2.3% this month</p>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Icon name="AlertCircle" size="0.875rem" className="text-warning mt-0.5" />
            <p className="text-muted-foreground">Communication scores need attention in 3 accounts</p>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <Icon name="TrendingUp" size="0.875rem" className="text-primary mt-0.5" />
            <p className="text-muted-foreground">Overall satisfaction trending upward for 6 consecutive months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionMetricsPanel;