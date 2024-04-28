// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
const ReactDOMServer = require('react-dom/server');
const HtmlToReactParser = require('html-to-react').Parser;
function IntroducePost({ product }) {
  const [renderedHtml, setRenderedHtml] = useState('');
  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      if (product.text.startsWith('"')) {
        const htmlToReactParser = new HtmlToReactParser();
        const reactElement = htmlToReactParser.parse(JSON.parse(product.text));
        const reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);
        setRenderedHtml(reactHtml);
        // how to render it to my component
      }
    }
  }, [product]);
  return (
    <div className="mt-5 mb-5 max-h-[500px] overflow-auto">
      <header className="text-xl font-bold">{product.header}</header>
      <div className="text-[15px] leading-[23px] ">
        {renderedHtml ? (
          <p className="mt-3" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        ) : (
          <p>{product.text}</p>
        )}
      </div>
    </div>
  );
}

export default IntroducePost;
