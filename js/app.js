
// IMPORTS
import { render, html } from 'https://cdn.skypack.dev/spux'
import 'https://cdn.skypack.dev/dior'
import 'https://cdn.skypack.dev/nostrefresh'

// COMPONENTS
function Navbar(props) {
  let title = props.title || 'Spux'
  return html`
          <div id="navbar" style="margin-top: -10px; margin-bottom: -10px;">
            <div class="bg-success pv2 row">
              <div class="col">
                <a href="#buttons" class="white ph2 bold">${title}</a>
              </div>
            </div>
          </div>
          <hr />
        `
}

function Bookmark(props) {
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

// INIT
var bookmarks = di.data.bookmark

// RENDER
render(
  html`
          <${Navbar} title="${di.data.gitmark['nick']}" />

          <img
            src="https://robohash.org/gitmark:d60703354709c88724f058cc2184a28831f6c8635324837650f5ccfff3ce5595:0"
          />

          <pre>

                  Name: ${di.data.gitmark['nick'] + '\n'}
                  Birth: ${di.data.birth} ${'\n'}
                  Energy: ${di.data.energy} Marks ${'\n'}
                  Address: <a style="color: blue" href="https://chainz.cryptoid.info/marks/address.dws?${di
      .data.address}.htm" target="_blank">${di.data.address}</a> ${'\n'}
            Previous: <a style="color: blue" href="${di.data.previous}">${di
      .data.previous}</a> ${'\n'}
            Next: <a style="color: blue" href="${di.data.next}">${di.data
      .next}</a> ${'\n'}
            Nostr: ${di.data.nostrkey}


          </pre>
          <h4>Activity</h4>
          <pre>
      <a style="color: blue"
                  href="https://gitmark.info/${di.data.gitmark['@id'].split(
        ':'
      )[1]}"
                  target="_blank"
                  >Genesis</a
                >
                  </pre>

          <h4>Bookmarks</h4>

          <table>
            <tr>
              ${bookmarks.map(i => {
        return html`
                  <${Bookmark} uri="${i['@id']}" image="${i.image}" />
                `
      })}
            </tr>
          </table>

          <footer>
            |
            <a
              style="color: blue"
              href="https://gitmark.info/${di.data.gitmark['@id'].split(
        ':'
      )[1]}"
              target="_blank"
              >${di.data.gitmark['@id']}</a
            >
            |
          </footer>
        `,
  document.body
)

console.log(di.data)
