import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <main className="wt-350">
        <h1>404</h1>
        <p>
          I'm afraid you've found a page that doesn't exist on The Cyberintel. That can happen when you follow a link to
          something that has since been deleted. Or the link was incorrect to begin&nbsp;with.
        </p>
        <p>Sorry about that. We've logged the error for review, in case it's our fault.</p>
        <ul>
          <li>
            <a href="#/">Go to the homepage</a>
          </li>
          <li>
            <a href="#/contact">Contact Support</a>
          </li>
        </ul>
      </main>
    </div>
  );
}
