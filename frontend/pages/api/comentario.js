import('next').NextApiResponse
import('next').NextApiRequest

export default function handler(req, res) {
    res.status(200).json({ name: 'Jasdasdas' })
  }