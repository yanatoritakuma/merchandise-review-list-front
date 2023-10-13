import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search = req.query.search as string;
    const minPrice = req.query.minPrice as string;
    const maxPrice = req.query.maxPrice as string;
    const page = req.query.page as string;

    const response = await axios.get(
      `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_API_URL}&keyword=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&hits=20`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
