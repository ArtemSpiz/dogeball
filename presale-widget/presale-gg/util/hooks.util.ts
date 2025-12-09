import { map } from "nanostores";
import { useCallback, useEffect, useState } from "react";

export const useNanostore = <T extends object>(
  store: ReturnType<typeof map<T>>,
  defaultValue: T
) => {
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    setData(() => store.get());
    store.subscribe(() => setData(() => store.get()));
  }, [store]);

  return data;
};

export const useClickAway = (
  el: HTMLElement | null,
  callback: (e: MouseEvent) => void,
  ignoreRefs?: () => (HTMLElement | null)[]
) => {
  useEventListener(
    typeof window !== "undefined" ? window : undefined,
    "click",
    useCallback(
      (e) => {
        if (!el) return;
        if (
          !el.contains(e.target as Node) &&
          !el.isEqualNode(e.target as Node)
        ) {
          if (
            ignoreRefs?.()?.some(
              (ref) =>
                ref?.contains(e.target as Node) ||
                ref?.isEqualNode(e.target as Node)
            )
          )
            return;
          callback(e);
        }
      },
      [el, callback]
    )
  );
};

export type CombineEventsIfArr<
  T extends keyof WindowEventMap | (keyof WindowEventMap)[]
> = T extends (infer U)[]
  ? U extends keyof WindowEventMap
    ? WindowEventMap[U]
    : never
  : T extends keyof WindowEventMap
  ? WindowEventMap[T]
  : never;

const resizeListeners: EventListener[] = [];

export const useEventListener = <
  E extends keyof WindowEventMap | (keyof WindowEventMap)[]
>(
  ref: Element | undefined | Window,
  events: E,
  callback: (e: CombineEventsIfArr<E>) => void,
  options?: boolean | AddEventListenerOptions
) => {
  const addEvent = (
    event: keyof WindowEventMap,
    callback: (e: CombineEventsIfArr<E>) => void
  ) => {
    if (ref !== window || event !== "resize") {
      ref?.addEventListener(event, callback as EventListener, options);
    } else {
      resizeListeners.push(callback as EventListener);
    }
  };

  const removeEvent = (
    event: keyof WindowEventMap,
    callback: (e: CombineEventsIfArr<E>) => void
  ) => {
    if (ref !== window || event !== "resize") {
      ref?.removeEventListener(event, callback as EventListener, options);
    } else {
      const index = resizeListeners.indexOf(callback as EventListener);
      if (index < 0) return;
      resizeListeners.splice(index, 1);
    }
  };

  useEffect(() => {
    if (ref === undefined) return;
    const eventArr = Array.isArray(events) ? events : [events];
    eventArr.forEach((event) => {
      addEvent(event, callback);
      ref?.addEventListener(event, callback as EventListener, options);
    });
    return () => {
      eventArr.forEach((event) => {
        removeEvent(event, callback as EventListener);
      });
    };
  }, [ref, callback, events]);
};
