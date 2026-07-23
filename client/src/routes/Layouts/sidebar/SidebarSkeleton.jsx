import { Skeleton } from "@heroui/react";

const SidebarSkeleton = ({ isOpen }) => (
    <div className="px-2 mt-2 space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
            <div
                key={i}
                className={`flex items-center rounded-xl ${isOpen ? "px-3 py-3" : "justify-center py-3"
                    }`}
            >
                <Skeleton className="w-6 h-6 rounded-lg" />

                {isOpen && (
                    <Skeleton className="ml-3 h-6 flex-1 rounded-lg" />
                )}
            </div>
        ))}
    </div>
);

export default SidebarSkeleton;