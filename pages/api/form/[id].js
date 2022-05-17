import prisma from '../../../lib/prisma';

export default async function handleGET(req, res) {
  const formId = req.query.id;
  try {
    const form = await prisma.form.findUnique({
      where: { id: formId },
    });
    res.json(JSON.parse(form));
  } catch(e) {
    return res.status(500).send(e.message);
  }
}