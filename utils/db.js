export const names = ["김부자", "김세현", "김재민", "김재윤", "김정렬", "박미람", "박분도", "박현서", "소성민", "안홍범", "이수진", "이승규", "이진석", "임서연", "정희서", "정희석", "조진호"];
export const users = [{ id: 1, name: "test", password: "test" }];
export const boards = [];
export const updateBoards = (target) => {
  boards.splice(0, boards.length);
  boards.push(...target);
};
