import { Request, Response, Router } from "express";
import VideoGame from "../models/videogame";
import videoGames from "../db/db";

const router = Router();
let maxId = 4; // this should be the amount of games in memory

// Why is it just a slash? in index we tell it that it should already be /api/games
//get all of them
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(videoGames);
});

router.get("/:id", (req: Request, res: Response) => {
  const videoGame = videoGames.filter((g) => g.id === +req.params.id);
  if (videoGame.length === 1) {
    res.status(200).json(videoGame);
  } else {
    res.status(404).json({ error: "No Game Found" });
  }
});

router.post("/", (req: Request, res: Response) => {
  const videogame: VideoGame = {
    id: ++maxId,
    name: req.body.name,
    esrb: req.body.esrb,
    owned: req.body.owned,
  };
  videoGames.push(videogame);
  res.status(200).json(videoGames);
});

router.patch("/:id", (req: Request, res: Response) => {
  const videoGame = videoGames.findIndex((game) => game.id === +req.params?.id);

  if (videoGame) {
    if (req.body.owned) {
      videoGames[videoGame].owned = req.body.owned;
    }
  }
  res.status(200).json(videoGames);
});

router.delete("/:id", (req: Request, res: Response) => {
  const index = videoGames.findIndex((game) => game.id === +req.params?.id);
  if (index !== -1) {
    videoGames.splice(index, 1);
  }
  res.status(200).json(videoGames);
});

export default router;
