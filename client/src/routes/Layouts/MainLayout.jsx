import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Rocket } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import Footer from "./footer";
import { useSidebar } from "./sidebar/sidebar.service";
export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moduleSearchModal, setModuleSearchModal] = useState(false)
  const { data = [] } = useSidebar();

  const buildSidebarTree = (modules = []) => {
    const lookup = {};

    modules.forEach((module) => {
      lookup[module._id] = {
        ...module,
        children: [],
      };
    });

    const tree = [];

    modules.forEach((module) => {
      if (module.parent && lookup[module.parent]) {
        lookup[module.parent].children.push(lookup[module._id]);
      } else {
        tree.push(lookup[module._id]);
      }
    });

    const sortTree = (items) =>
      items
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          ...item,
          children: sortTree(item.children),
        }));

    const sortedTree = sortTree(tree);
    const result = [];
    sortedTree.forEach((item) => {
      if (item.children.length > 0) {
        result.push(...item.children);
      } else {
        result.push(item);
      }
    });

    return result;
  };

  const sidebarTree = useMemo(() => buildSidebarTree(data), [data]);

  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    if (moduleSearchModal) {
      setModuleSearchModal(false);
    } else {
      setModuleSearchModal(true);
    }
  });
  const navigate = useNavigate();

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    const module = sidebarTree.find((m) => m._id
      === selectedKey);
    if (module) {
      setModuleSearchModal(false);
      navigate(module.route);
    }
  };

  return (
    <>
      <Modal
        isOpen={moduleSearchModal}
        placement="top"
        size="lg"
        hideCloseButton
        backdrop="opaque"
        onOpenChange={setModuleSearchModal}
        isDismissable={false}
      >
        <ModalContent className="max-w-[360px] rounded-2xl">
          {(onClose) => (
            <>
              <ModalBody className="text-center text-default-600 p-5">
                <Select
                  label="Go to module"
                  placeholder="Choose a module"
                  labelPlacement="outside"
                  onSelectionChange={handleSelectionChange}
                >
                  {sidebarTree.map((module) => (
                    <SelectItem key={module._id
                    }>
                      {module.title}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex h-screen flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-16 bg-white">
            <Sidebar
              isOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </aside>

          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
