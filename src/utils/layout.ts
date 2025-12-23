/**
 * Changes the HTML attributes
 */
const changeHTMLAttribute = (attribute: string, value: string): void => {
  if (document.body) document.getElementsByTagName('html')[0].setAttribute(attribute, value)
}

export { changeHTMLAttribute }
