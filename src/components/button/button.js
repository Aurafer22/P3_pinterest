import './button.css'

export const createButton = (id, texto, clase, nodeParent) => {
  const button = document.createElement('button')
  button.id = id
  button.textContent = texto
  button.classList.add('button', clase)
  nodeParent.append(button)
  return button
}
