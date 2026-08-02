import { Card, CardHeader, CardBody, Chip } from "@heroui/react";

import {
  Upload,
  Users,
  DollarSign,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

const activities = [
  {
    icon: Upload,
    color: "danger",
    title: "Video Published",
    description: "React 19 Complete Course",
    time: "5 minutes ago",
  },
  {
    icon: Users,
    color: "success",
    title: "New Subscribers",
    description: "+120 subscribers",
    time: "18 minutes ago",
  },
  {
    icon: DollarSign,
    color: "warning",
    title: "Revenue Updated",
    description: "$2,340 earned today",
    time: "1 hour ago",
  },
  {
    icon: MessageCircle,
    color: "primary",
    title: "New Comments",
    description: "32 new comments",
    time: "2 hours ago",
  },
];

export default function ActivityFeed() {
  return (
    <Card className="shadow-lg border border-default-200 h-full">
      <CardHeader className="justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Activity</h2>

          <p className="text-default-500 text-sm">Latest channel updates</p>
        </div>

        <Chip color="success" variant="flat">
          Live
        </Chip>
      </CardHeader>

      <CardBody>
        <div className="relative ml-3">
          <div className="absolute left-5 top-0 h-full border-l border-default-300" />

          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div key={index} className="relative flex gap-4 pb-8">
                <div
                  className={`
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-${activity.color}-100
                  `}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{activity.title}</h4>

                    <CheckCircle2 size={15} className="text-success" />
                  </div>

                  <p className="text-default-600">{activity.description}</p>

                  <span className="text-xs text-default-500">
                    {activity.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
