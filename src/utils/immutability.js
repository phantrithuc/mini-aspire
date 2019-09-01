import update from 'immutability-helper';
export const updateItemById = (currentItems, newItem) =>
  update(currentItems, {
    $apply: items =>
      items.map(item => (item.id === newItem.id ? newItem : item))
  });

export const addNewItem = (currentItems, newItem) =>
  update(currentItems, {
    $push: newItem
  });
