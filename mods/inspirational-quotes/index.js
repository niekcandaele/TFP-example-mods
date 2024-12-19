/* eslint-disable */
const modId = 'Inspirational Web Quotes'

const InspirationalQuotes = {
  about: `This mods displays a menu with inspirational quotes.`,
  routes: {
    'Quote': function MenuItem({ React, styled }) {
      const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      `

      const [quotes, setQuotes] = React.useState([]);

      React.useEffect(() => {
        async function fetchQuote() {
          const response = await fetch('https://type.fit/api/quotes')
          const data = await response.json()
          setQuotes(data)
        }

        fetchQuote();
      }, [])

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      if (randomQuote) {
        return (
          <Container>
            <blockquote>
              {randomQuote.text}
              <footer>
                - {randomQuote.author}
              </footer>
            </blockquote>
          </Container>
        )
      } else {
        return (
          <p>Loading quote</p>
        )
      }
    }
  },
  mapComponents: [],
}

window[modId] = InspirationalQuotes;
window.dispatchEvent(new Event(`mod:${modId}:ready`));