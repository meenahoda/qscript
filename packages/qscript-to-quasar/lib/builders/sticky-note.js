const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function stickyNoteConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  // desc
  // heading
  // style

  // TODO: Should align this, really?
  // QScript   Quasar styles
  // ----------   --------------
  //              success
  // normal       info
  // informative  info
  //              warning
  // danger       error
  const qscriptStyle = getAttribute('style')
  const color = qscriptStyle === 'danger' ? 'negative' : 'primary'

  const builder = new ComponentBuilder(widgetDefinition)
  const alert = builder.addTag('q-alert')
  alert.addAttribute('class', 'q-ma-xl')
  alert.addAttribute('color', color)

  alert.addAttribute('message', getAttribute('heading'))
  alert.addAttribute('detail', getAttribute('desc'))
  return builder.compile()
}
