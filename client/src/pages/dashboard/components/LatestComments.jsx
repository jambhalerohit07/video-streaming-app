import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Chip,
  Divider,
} from "@heroui/react";

import { MessageCircle, Heart, CheckCircle2 } from "lucide-react";

const comments = [
  {
    id: 1,
    user: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=11",
    verified: true,
    time: "2 min ago",
    comment:
      "This React 19 tutorial is amazing! Please make an advanced version.",
    likes: 124,
  },
  {
    id: 2,
    user: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    verified: false,
    time: "18 min ago",
    comment: "Loved the HeroUI dashboard design 🔥",
    likes: 82,
  },
  {
    id: 3,
    user: "Alex Brown",
    avatar: "https://i.pravatar.cc/150?img=15",
    verified: true,
    time: "45 min ago",
    comment: "Waiting for the Node.js authentication series ❤️",
    likes: 56,
  },
];

export default function LatestComments() {
  return (
    <Card className="shadow-lg border border-default-200">
      <CardHeader className="justify-between">
        <div>
          <h2 className="text-xl font-semibold">Latest Comments</h2>

          <p className="text-default-500 text-sm">Community engagement</p>
        </div>

        <Chip color="primary" variant="flat">
          324 Today
        </Chip>
      </CardHeader>

      <CardBody className="space-y-5">
        {comments.map((item, index) => (
          <div key={item.id}>
            <div className="flex gap-4">
              <Avatar src={item.avatar} size="lg" />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{item.user}</h4>

                  {item.verified && (
                    <CheckCircle2 size={16} className="text-primary" />
                  )}

                  <span className="text-xs text-default-500">{item.time}</span>
                </div>

                <p className="text-default-600 mt-2">{item.comment}</p>

                <div className="flex gap-3 mt-4">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    startContent={<MessageCircle size={16} />}
                  >
                    Reply
                  </Button>

                  <Button
                    size="sm"
                    variant="light"
                    startContent={<Heart size={16} />}
                  >
                    {item.likes}
                  </Button>
                </div>
              </div>
            </div>

            {index !== comments.length - 1 && <Divider className="mt-5" />}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
