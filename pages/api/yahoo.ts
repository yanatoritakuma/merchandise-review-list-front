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
    const sort = encodeURIComponent(String(req.query.sort)) as string;
    const page = req.query.page as string;

    const response = await axios.get(
      `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${
        process.env.NEXT_PUBLIC_YAHOO_API_URL
      }&query=${search}&price_from=${minPrice}&price_to=${maxPrice}&sort=${sort}&start=${page}&image_size=${600}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
