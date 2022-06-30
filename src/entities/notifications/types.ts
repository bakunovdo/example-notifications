export type TDraftNotification = {
  id: string;
  message: string;
  timeout?: number;
  status?: "success" | "info" | "error";
};

export type TSimpleNotify = Omit<TDraftNotification, "id">;
export type TNotification = Required<TDraftNotification>;
