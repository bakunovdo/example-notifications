export type TNotification = {
  id: string;
  message: string;
  timeout?: number; // in seconds
  status?: "success" | "info" | "error"; // info defaukt
};

export type TSimpleNotify = Omit<TNotification, "id">;
