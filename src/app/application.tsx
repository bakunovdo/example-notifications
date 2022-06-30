import "./application.css";

import { useEvent } from "effector-react";

import { NotificationProvider, notifyModel } from "entities/notifications";

export const Application = () => {
  const show = useEvent(notifyModel.showNotification);

  const showInfo = () => show({ message: "Info notify" });
  const showError = () => show({ message: "Error notify", status: "error" });
  const showSuccess = () => show({ message: "Succcess notify", status: "success" });

  return (
    <>
      <NotificationProvider rootId="modal-root" />
      <div className="h-screen flex items-center flex-center justify-center bg-gray-100">
        <div className="flex max-w-xl">
          <button
            className="px-4 py-2 mx-1 w-64 bg-blue-500 rounded-md font-bold text-white"
            onClick={showInfo}
          >
            Show info notify
          </button>

          <button
            className="px-4 py-2 mx-1 w-64 bg-red-500 rounded-md font-bold text-white"
            onClick={showError}
          >
            Show error notify
          </button>

          <button
            className="px-4 py-2 mx-1 w-64 bg-green-500 rounded-md font-bold text-white"
            onClick={showSuccess}
          >
            Show success notify
          </button>
        </div>
      </div>
    </>
  );
};
