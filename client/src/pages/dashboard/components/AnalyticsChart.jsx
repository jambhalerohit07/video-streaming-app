import { useState } from "react";
import { Card, CardHeader, CardBody, Tabs, Tab, Chip } from "@heroui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartData } from "./data";

const datasets = {
  Views: chartData,
  Subscribers: [
    { month: "Jan", views: 120 },
    { month: "Feb", views: 180 },
    { month: "Mar", views: 160 },
    { month: "Apr", views: 250 },
    { month: "May", views: 310 },
    { month: "Jun", views: 390 },
    { month: "Jul", views: 470 },
  ],
  Revenue: [
    { month: "Jan", views: 1800 },
    { month: "Feb", views: 2400 },
    { month: "Mar", views: 3200 },
    { month: "Apr", views: 4300 },
    { month: "May", views: 5100 },
    { month: "Jun", views: 6800 },
    { month: "Jul", views: 8100 },
  ],
};

export default function AnalyticsChart() {
  const [selected, setSelected] = useState("Views");

  return (
    <Card className="shadow-lg border border-default-200">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Channel Analytics</h2>

          <p className="text-default-500 text-sm">
            Performance over the last 7 months
          </p>
        </div>

        <Chip color="success" variant="flat">
          +18.2%
        </Chip>
      </CardHeader>

      <CardBody className="space-y-6">
        <Tabs
          selectedKey={selected}
          onSelectionChange={setSelected}
          color="primary"
          variant="underlined"
        >
          <Tab key="Views" title="Views" />
          <Tab key="Subscribers" title="Subscribers" />
          <Tab key="Revenue" title="Revenue" />
        </Tabs>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datasets[selected]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />

              <XAxis dataKey="month" tick={{ fill: "#888" }} />

              <YAxis tick={{ fill: "#888" }} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#3b82f6",
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
