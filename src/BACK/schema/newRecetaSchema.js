const z = require('zod')

const recetaSchema = z.object({
  name: z.string({
    invalid_type_error: 'Debes escribir una palabra',
    require_error: 'El nombre es obligatorio'
  }).max(50),
  ingredients: z.string(),
  persons: z.number({
    required_error: 'La cantidad de personas es requerida',
    invalid_type_error: 'Tienes que escribir un numero'
  }).int(),
  description: z.string({
    required_error: 'La descripcion es requerida',
    invalid_type_error: 'Tienes que escribir un una palabra'
  })
})

async function validateSchema (object) {
  return recetaSchema.safeParseAsync(object)
}

module.exports = {
  validateSchema
}
