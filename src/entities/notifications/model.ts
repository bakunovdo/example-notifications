import { createEffect, createEvent, createStore, sample } from "effector";

import { append } from "shared";

import { v4 as uuidv4 } from "uuid";

import { TNotification, TSimpleNotify } from "./types";

const DEFAULT_DELAY = 2500;

const delay = ({ timeout }: TNotification) => new Promise((rs) => setTimeout(rs, timeout));

export const notify = createEvent<TSimpleNotify>();
export const cancel = createEvent<TNotification>();

const timeout = createEffect(delay);

export const $notifications = createStore<TNotification[]>([]);

const notified = sample({
  clock: notify,
  fn: (payload) =>
    ({
      id: uuidv4(),
      status: "info",
      timeout: DEFAULT_DELAY,
      ...payload,
    } as const),
});

sample({
  clock: notified,
  target: timeout,
});

$notifications
  .on(notified, (list, newN) => append(list, newN))
  .on(cancel, (list, notification) => deleteNotification(list, notification))
  .on(timeout.done, (list, { params }) => deleteNotification(list, params));

function deleteNotification(list: TNotification[], notification: TNotification): TNotification[] {
  return list.filter((item) => item.id !== notification.id);
}
