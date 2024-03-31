import express from "express";
import { names, users } from "../utils/db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).send("이름과 비밀번호를 입력해주세요.");

  if (!names.includes(name)) return res.status(400).send("없는 이름입니다.");

  if (users.find((user) => user.name === name)) return res.status(400).send("이미 존재하는 이름입니다.");
  const id = users.length === 0 ? users.length + 1 : users[users.length - 1].id + 1;
  users.push({ name, password, id });
  return res.status(201).send();
});
router.post("/login", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).send("이름과 비밀번호를 입력해주세요.");

  const user = users.find((user) => user.name === name && user.password === password);
  if (!user) return res.status(400).send("없는 유저");

  return res.status(200).send({ id: user.id, name: user.name });
});
export default router;
