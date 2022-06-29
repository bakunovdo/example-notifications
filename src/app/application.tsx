import "./application.css";

import { useEvent } from "effector-react";

import { NotificationProvider, notifyModel } from "entities/notifications";

import { createRandomEvent } from "../entities/notifications/model";

export const Application = () => {
  const show = useEvent(notifyModel.showNotification);

  const handleClick = () => {
    show(createRandomEvent());
  };

  return (
    <>
      <NotificationProvider rootId="modal-root" />
      <div className="h-screen flex flex-col items-center flex-center justify-center bg-gray-100">
        <button
          className="px-4 py-6 w-fit bg-green-500 rounded-md font-bold text-white"
          onClick={handleClick}
        >
          Notify random event
        </button>
      </div>
    </>
  );
};
