import { useState } from "react";
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
export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moduleSearchModal,setModuleSearchModal] = useState(false)

  useHotkeys("ctrl+k", (e) => {    
    e.preventDefault(); 
    if(moduleSearchModal){
      setModuleSearchModal(false);
    }else{
      setModuleSearchModal(true);
    }
  });

  const modules = [
  { key: "dashboard", label: "Dashboard", path: "/dashboard" },
  { key: "users", label: "Users", path: "/users" },
  { key: "orders", label: "Orders", path: "/orders" },
  { key: "settings", label: "Settings", path: "/settings" },
];
const navigate = useNavigate();

const handleSelectionChange = (keys) => {
  const selectedKey = Array.from(keys)[0];

  const module = modules.find((m) => m.key === selectedKey);

  if (module) {
    setModuleSearchModal(false);
    navigate(module.path);
  }
};

  if(moduleSearchModal)
    return<>
     <Modal isOpen={moduleSearchModal} placement="top" size="sm" hideCloseButton backdrop="blur">
      <ModalContent className="max-w-[360px] rounded-2xl">
      <ModalContent>
  {(onClose) => (
    <>
      <ModalBody className="text-center text-default-600">
        {/* <p>
          A beautiful, fast, and modern React UI library for building
          accessible and customizable web applications with ease.
        </p> */}
        <Select
         label="Select Module"
         placeholder="Choose a module"
         onSelectionChange={handleSelectionChange}
         labelPlacement="outside"
        >
        {modules.map((module) => (
          <SelectItem key={module.key}>
            {module.label}
          </SelectItem>
        ))}
       </Select>
      </ModalBody>

      {/* <ModalFooter className="pb-6">
        <Button
          color="primary"
          className="w-full"
          onPress={onClose}
          size="sm"
        >
          Continue
        </Button>
        <Button
          color="danger"
          className="w-full"
          onPress={() => {
            debugger
            setModuleSearchModal(!moduleSearchModal);
            onClose();
          }}
          size="sm"
        >
          Close
        </Button>

      </ModalFooter> */}
    </>
  )}
</ModalContent>
      </ModalContent>
    </Modal>
    </>
  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
