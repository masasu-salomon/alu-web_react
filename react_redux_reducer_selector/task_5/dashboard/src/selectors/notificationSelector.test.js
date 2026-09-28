import { Map, fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from "./notificationSelector";

describe("notificationSelector tests", () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      filter: "DEFAULT",
      notifications: {
        1: { id: 1, type: "default", value: "New course available", isRead: false },
        2: { id: 2, type: "urgent", value: "New resume available", isRead: true },
        3: { id: 3, type: "urgent", value: "New data available", isRead: false },
      },
    });
  });

  test("filterTypeSelected returns the filter type", () => {
    expect(filterTypeSelected(state)).toBe("DEFAULT");
  });

  test("getNotifications returns the list of notifications", () => {
    const result = getNotifications(state);
    expect(Map.isMap(result)).toBe(true);
    expect(result.size).toBe(3);
  });

  test("getUnreadNotifications returns only unread notifications", () => {
    const unread = getUnreadNotifications(state);
    expect(unread.size).toBe(2);
    const unreadIds = Object.keys(unread.toJS());
    expect(unreadIds).toContain("1");
    expect(unreadIds).toContain("3");
  });
});
