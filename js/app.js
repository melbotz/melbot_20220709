
// IMPORTS
import { render, html } from '../js/preacthtm.js'
import '../js/dior.js'
import '../js/nostrefresh.js'

// COMPONENTS
import Navbar from '../components/Navbar.js'
import Bookmark from '../components/Bookmark.js'

// INIT
var doc = di.data
var bookmarks = doc.bookmark

// RENDER
render(
  html`
          <${Navbar} title="${di.data.gitmark['nick']}" />

          <img
            src="https://robohash.org/gitmark:d60703354709c88724f058cc2184a28831f6c8635324837650f5ccfff3ce5595:0"
          />

          <pre>

                  Name: ${doc.gitmark['nick'] + '\n'}
                  Birth: ${doc.birth} ${'\n'}
                  Energy: ${doc.energy} Marks ${'\n'}
                  Address: <a style="color: blue" href="https://chainz.cryptoid.info/marks/address.dws?${di
      .data.address}.htm" target="_blank">${doc.address}</a> ${'\n'}
            Previous: <a style="color: blue" href="${doc.previous}">${di
      .data.previous}</a> ${'\n'}
            Next: <a style="color: blue" href="${doc.next}">${doc
      .next}</a> ${'\n'}
            Nostr: ${doc.nostrkey}


          </pre>
          <h4>Activity</h4>
          <pre>
      <a style="color: blue"
                  href="https://gitmark.info/${doc.gitmark['@id'].split(
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
              href="https://gitmark.info/${doc.gitmark['@id'].split(
        ':'
      )[1]}"
              target="_blank"
              >${doc.gitmark['@id']}</a
            >
            |
          </footer>
        `,
  document.body
)

console.log(doc)
