import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TopPagesChartProps {
  data: {
    path: string;
    views: number;
  }[];
}

export function TopPagesChart({ data }: TopPagesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>Most visited pages on your website</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[240px] items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
              <XAxis 
                dataKey="path"
                tickFormatter={(value) => value.substring(0, 10) + (value.length > 10 ? '...' : '')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => `Page: ${value}`}
                formatter={(value) => [`${value} views`, 'Views']}
              />
              <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default TopPagesChart;
