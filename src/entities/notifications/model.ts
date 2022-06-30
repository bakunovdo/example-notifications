import { createEffect, createEvent, createStore, sample } from "effector";

import { append } from "shared";

import { v4 as uuidv4 } from "uuid";

import { TNotification, TSimpleNotify } from "./types";

const DEFAULT_DELAY_TIMOUT = 2500;

export const showNotification = createEvent<TSimpleNotify>();

export const showFilledNotification = createEvent<TNotification>();

export const hideNotification = createEvent<TNotification>();

const notificationDelayFx = createEffect(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_: TNotification) => new Promise((rs) => setTimeout(rs, DEFAULT_DELAY_TIMOUT)),
);

export const $notifications = createStore<TNotification[]>([]);

sample({
  clock: showNotification,
  fn: (payload) =>
    ({
      id: uuidv4(),
      status: "info",
      timeout: DEFAULT_DELAY_TIMOUT,
      ...payload,
    } as const),
  target: showFilledNotification,
});

sample({
  clock: showFilledNotification,
  target: notificationDelayFx,
});

$notifications
  .on(showFilledNotification, (list, newN) => append(list, newN))
  .on(hideNotification, (list, notification) => deleteNotification(list, notification))
  .on(notificationDelayFx.done, (list, { params }) => deleteNotification(list, params));

function deleteNotification(list: TNotification[], notification: TNotification): TNotification[] {
  return list.filter((item) => item.id !== notification.id);
}
