export default class MyArray {
  constructor() {
    this.items = [];
    this.listeners = {
      add: [],
      remove: [],
      update: [],
      change: [],
    };
  }

  addItem(item) {
    this.items.push(item);
    this.triggerEvent("add", item);
    this.triggerEvent("change", item);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.triggerEvent("remove", item);
      this.triggerEvent("change", item);
    }
  }

  updateItem(item, newItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index] = newItem;
      this.triggerEvent("update", { oldItem: item, newItem });
      this.triggerEvent("change", newItem);
    }
  }


  addListener(eventType, callback) {
    if (this.listeners.hasOwnProperty(eventType)) {
      this.listeners[eventType].push(callback);
    } else {
      throw new Error(`Invalid event type: ${eventType}`);
    }
  }

  triggerEvent(eventType, data) {
    if (this.listeners.hasOwnProperty(eventType)) {
      this.listeners[eventType].forEach((callback) => callback(data));
    }
  }

  // Getter for accessing items directly (optional)
  get getItems() {
    return [...this.items]; // Return a copy to prevent accidental modification
  }

  clear() {
    this.items = [];
  }
  removeEventListener(eventType, callback) {
    if (this.listeners.hasOwnProperty(eventType)) {
      this.listeners[eventType] = this.listeners[eventType].filter(
        (listener) => listener !== callback
      );
    }
  }
}
