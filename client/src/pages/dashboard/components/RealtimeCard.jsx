import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Progress,
  Button,
} from "@heroui/react";
import { Radio, Eye, Users, ThumbsUp, MessageCircle } from "lucide-react";

export default function RealtimeCard() {
  return (
    <Card className="h-full shadow-lg border border-default-200">
      <CardHeader className="justify-between">
        <div>
          <h2 className="text-xl font-semibold">Realtime</h2>

          <p className="text-default-500 text-sm">Updated every minute</p>
        </div>

        <Chip color="danger" variant="flat" startContent={<Radio size={12} />}>
          LIVE
        </Chip>
      </CardHeader>

      <Divider />

      <CardBody className="space-y-6">
        {/* Current Viewers */}

        <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 p-4">
          <div className="flex items-center gap-3">
            <Eye className="text-primary" />

            <div>
              <p className="text-default-500 text-sm">Watching Now</p>

              <h2 className="text-4xl font-bold">1,284</h2>
            </div>
          </div>
        </div>

        {/* Subscribers */}

        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users size={18} />

              <span>Today's Subscribers</span>
            </div>

            <strong>243</strong>
          </div>

          <Progress value={72} color="success" size="sm" />
        </div>

        {/* Likes */}

        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp size={18} />

              <span>Likes Today</span>
            </div>

            <strong>4.8K</strong>
          </div>

          <Progress value={81} color="primary" size="sm" />
        </div>

        {/* Comments */}

        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />

              <span>Comments</span>
            </div>

            <strong>318</strong>
          </div>

          <Progress value={56} color="warning" size="sm" />
        </div>

        <Divider />

        {/* Summary */}

        <div className="grid grid-cols-2 gap-4">
          <Card shadow="none" className="bg-default-100">
            <CardBody>
              <p className="text-default-500 text-xs">CTR</p>

              <h3 className="text-xl font-bold">9.4%</h3>
            </CardBody>
          </Card>

          <Card shadow="none" className="bg-default-100">
            <CardBody>
              <p className="text-default-500 text-xs">Avg. View Duration</p>

              <h3 className="text-xl font-bold">8m 42s</h3>
            </CardBody>
          </Card>
        </div>

        <Button color="primary" fullWidth>
          View Live Analytics
        </Button>
      </CardBody>
    </Card>
  );
}
