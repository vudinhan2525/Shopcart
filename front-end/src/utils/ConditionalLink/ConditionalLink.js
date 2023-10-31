import { Link } from 'react-router-dom';

function ConditionalLink({ to, condition, onClick, className, children }) {
  if (condition === false)
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  else {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
}

export default ConditionalLink;
