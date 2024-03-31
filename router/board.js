import express from "express";
import { boards, updateBoards } from "../utils/db.js";

const router = express.Router();

router.get("", (req, res) => {
  const { authorization } = req.headers;

  const data = boards.map(({ id, title, content, userId }) => ({ id, title, content, isMe: userId == authorization }));
  res.send(data);
});
router.get("/:id", (req, res) => {
  const { authorization } = req.headers;

  const data = boards.find(({ id }) => id == req.params.id);
  if (!data) return res.status(404).send("없는 글");
  const { id, title, content, userId } = data;
  res.send({ id, title, content, isMe: userId == authorization });
});
router.post("", (req, res) => {
  const { authorization: userId } = req.headers;
  if (!userId) return res.status(401).send("로그인이 필요합니다.");

  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send("글 작성 잘못됨");
  const id = boards.length === 0 ? boards.length + 1 : boards[boards.length - 1].id + 1;
  boards.push({ title, content, mine: true, id, userId });
  res.status(201).send();
});

router.put("/:id", (req, res) => {
  const { authorization: userId } = req.headers;
  if (!userId) return res.status(401).send("로그인이 필요합니다.");
  const { id } = req.params;
  const target = boards.find((board) => board.id == id && board.userId == userId);
  if (!target) return res.status(404).send("없는 글 OR 권한 없음");
  let { title, content } = req.body;
  title = title || target.title;
  content = content || target.content;
  console.log(title, content);
  const updateBoard = boards.map((board) => (board.id == id ? { ...board, title, content } : board));
  updateBoards(updateBoard);

  res.send();
});
router.delete("/:id", (req, res) => {
  const { authorization: userId } = req.headers;
  if (!userId) return res.status(401).send("로그인이 필요합니다.");
  const { id } = req.params;
  const target = boards.find((board) => board.id == id && board.userId == userId);
  if (!target) return res.status(404).send("없는 글 OR 권한 없음");
  updateBoards(boards.filter((board) => board.id != id));
  res.send();
});
export default router;
