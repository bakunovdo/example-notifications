import React, { useState } from "react";

import { useEvent, useStore } from "effector-react";

import classNames from "classnames";
import { notifyModel } from "entities/notifications";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";

export const NotificationProvider: React.FC<{ rootId: string }> = ({ rootId }) => {
  const [root] = useState(() => document.getElementById(rootId));

  const notifications = useStore(notifyModel.$notifications);
  const hideNotification = useEvent(notifyModel.cancel);

  if (!root) throw Error("Modal container not find!");

  return ReactDOM.createPortal(
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 list-none">
      <AnimatePresence>
        {notifications.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 10, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            style={{ minWidth: "15rem", maxWidth: "15rem" }}
            className={classNames("flex flex-col py-3 px-3 relative rounded-lg my-2 text-white", {
              "bg-green-600": item.status === "success",
              "bg-blue-600": item.status === "info",
              "bg-red-600": item.status === "error",
            })}
          >
            <h1 className="font-bold">Message title</h1>
            <h2>{item.message}</h2>
            <button
              className="absolute top-0 right-2 text-lg"
              onClick={() => hideNotification(item)}
            >
              x
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </div>,
    root,
  );
};
