import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  try {
    const { 
      abi,
      address, 
      contractName, 
      inputs,
      method, 
    } = req.body;

    const result = await prisma.form.create({
      data: {
        abi,
        address,
        contractName,
        method,
        fields: {
          create: inputs.map(input => ({
            name: input.name,
            type: input.type,
          })),
        }
      },
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
}
