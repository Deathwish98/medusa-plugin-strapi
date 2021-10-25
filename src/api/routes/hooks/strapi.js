export default async (req, res) => {
  try {
    console.log(req.body);
    const body = req.body;
    const strapiService = req.scope.resolve("strapiService")

    // find Strapi entry type from body of webhook
    const strapiType = body.type
    // get the ID
    let entryId;

    let updated = {}
    switch (strapiType) {
      case "product":
        entryId = body.data.product_id;
        updated = await strapiService.sendStrapiProductToAdmin(body.data, entryId)
        break;
      case "productVariant":
        entryId = body.data.product_variant_id;
        updated = await strapiService.sendStrapiProductVariantToAdmin(entryId)
        break;
      default:
        break
    }

    res.status(200).send(updated)
  } catch (error) {
    res.status(400).send(`Webhook error: ${error.message}`)
  }
}
