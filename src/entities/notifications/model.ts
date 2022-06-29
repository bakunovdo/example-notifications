import { createEffect, createEvent, createStore, sample } from "effector";

import { append } from "shared";

import { v4 as uuidv4 } from "uuid";

import { TNotification } from "./types";

const DELAY_TIMOUT = 2500;

export const showNotification = createEvent<TNotification>();
export const hideNotification = createEvent<TNotification>();

const notificationDelayFx = createEffect(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_: TNotification) => new Promise((rs) => setTimeout(rs, DELAY_TIMOUT)),
);

export const $notifications = createStore<TNotification[]>([]);

sample({
  clock: showNotification,
  target: notificationDelayFx,
});

$notifications
  .on(showNotification, (list, newN) => append(list, newN))
  .on(hideNotification, (list, notification) => deleteNotification(list, notification))
  .on(notificationDelayFx.done, (list, { params }) => deleteNotification(list, params));

function deleteNotification(list: TNotification[], notification: TNotification): TNotification[] {
  return list.filter((item) => item.id !== notification.id);
}

export function createRandomEvent(): TNotification {
  const id = uuidv4();
  return {
    id,
    message: "Hi " + id,
    timestamp: new Date().getTime(),
  };
}
