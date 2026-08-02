import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@heroui/react";

import { MoreVertical, Eye, ThumbsUp, MessageCircle } from "lucide-react";

const videos = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/80/50?1",
    title: "React 19 Complete Course",
    category: "Education",
    views: "892K",
    likes: "24K",
    comments: 421,
    published: "Today",
    status: "Published",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/80/50?2",
    title: "HeroUI Dashboard UI",
    category: "Design",
    views: "412K",
    likes: "18K",
    comments: 213,
    published: "Yesterday",
    status: "Draft",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/80/50?3",
    title: "JWT Authentication",
    category: "Backend",
    views: "290K",
    likes: "12K",
    comments: 164,
    published: "3 days ago",
    status: "Published",
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/80/50?4",
    title: "Node.js Crash Course",
    category: "Programming",
    views: "180K",
    likes: "9.8K",
    comments: 93,
    published: "1 week ago",
    status: "Private",
  },
];

const statusColor = {
  Published: "success",
  Draft: "warning",
  Private: "danger",
};

export default function RecentUploads() {
  return (
    <Card className="shadow-lg border border-default-200">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Recent Uploads</h2>

          <p className="text-default-500 text-sm">Manage your latest content</p>
        </div>

        <Button color="danger">Upload Video</Button>
      </CardHeader>

      <CardBody>
        <Table removeWrapper aria-label="Recent uploads">
          <TableHeader>
            <TableColumn>VIDEO</TableColumn>
            <TableColumn>VIEWS</TableColumn>
            <TableColumn>LIKES</TableColumn>
            <TableColumn>COMMENTS</TableColumn>
            <TableColumn>PUBLISHED</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn width={60}></TableColumn>
          </TableHeader>

          <TableBody items={videos}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={item.thumbnail}
                      radius="md"
                      className="w-20 h-12"
                    />

                    <div>
                      <h4 className="font-semibold">{item.title}</h4>

                      <p className="text-sm text-default-500">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    {item.views}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={16} />
                    {item.likes}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    {item.comments}
                  </div>
                </TableCell>

                <TableCell>{item.published}</TableCell>

                <TableCell>
                  <Chip
                    color={statusColor[item.status]}
                    variant="flat"
                    size="sm"
                  >
                    {item.status}
                  </Chip>
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" size="sm">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu>
                      <DropdownItem key="edit">Edit</DropdownItem>

                      <DropdownItem key="analytics">Analytics</DropdownItem>

                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
