import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Progress,
  Chip,
  Button,
} from "@heroui/react";
import { PlayCircle, Eye, ThumbsUp } from "lucide-react";

const videos = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/100/60?random=1",
    title: "React 19 Complete Course",
    views: "892K",
    likes: "24K",
    engagement: 94,
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/100/60?random=2",
    title: "Node.js Authentication",
    views: "615K",
    likes: "18K",
    engagement: 88,
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/100/60?random=3",
    title: "HeroUI Dashboard Design",
    views: "482K",
    likes: "15K",
    engagement: 82,
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/100/60?random=4",
    title: "JWT Authentication Guide",
    views: "355K",
    likes: "11K",
    engagement: 76,
  },
];

export default function TopVideos() {
  return (
    <Card className="shadow-lg border border-default-200">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Top Performing Videos</h2>

          <p className="text-default-500 text-sm">Ranked by engagement</p>
        </div>

        <Button size="sm" color="primary" variant="flat">
          View All
        </Button>
      </CardHeader>

      <CardBody className="space-y-5">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="flex gap-4 items-center rounded-xl p-3 hover:bg-default-100 transition"
          >
            <Chip color="warning" variant="flat" size="sm">
              #{index + 1}
            </Chip>

            <Avatar src={video.thumbnail} radius="md" className="w-20 h-12" />

            <div className="flex-1">
              <h4 className="font-semibold">{video.title}</h4>

              <div className="flex gap-4 mt-2 text-default-500 text-sm">
                <div className="flex items-center gap-1">
                  <Eye size={15} />
                  {video.views}
                </div>

                <div className="flex items-center gap-1">
                  <ThumbsUp size={15} />
                  {video.likes}
                </div>
              </div>

              <Progress
                value={video.engagement}
                color="success"
                className="mt-3"
              />
            </div>

            <div className="text-right">
              <p className="font-bold text-success">{video.engagement}%</p>

              <p className="text-xs text-default-500">Engagement</p>
            </div>
          </div>
        ))}

        <Button
          startContent={<PlayCircle size={18} />}
          color="danger"
          variant="flat"
          fullWidth
        >
          Upload New Video
        </Button>
      </CardBody>
    </Card>
  );
}
