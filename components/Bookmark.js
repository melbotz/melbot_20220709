
// IMPORTS
import { render, html } from '../js/preacthtm.js'

// COMPONENTS
export default function Bookmark(props) {
  let uri = props.uri || '#'
  let title = props.title || 'bookmark'
  let image = props.image || '#'
  return html`
          <td>
            <img height="200" src="${image}" /> ${'\n'}
            <br />
            <a style="color: blue" href="${uri}" target="_blank">reddit 🔗</a>
          </td>
        `
}

