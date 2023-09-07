import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search = req.query.search as string;
    const page = req.query.page as string;

    const response = await axios.get(
      `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${process.env.NEXT_PUBLIC_YAHOO_API_URL}&query=${search}&start=${page}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
