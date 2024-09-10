export const names = [];
export const users = [{ id: 1, name: "test", password: "test" }];
export const boards = [{ id: 1, title: "test", content: "test", userId: 1 }];
export const updateBoards = (target) => {
  boards.splice(0, boards.length);
  boards.push(...target);
};
