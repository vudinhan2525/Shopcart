import { Link } from 'react-router-dom';
function Button({ to, href, onClick, children, className }) {
  let Comp = 'button';
  if (to) Comp = Link;
  else if (href) Comp = 'a';
  return (
    <Comp onClick={onClick} className={className}>
      {children}
    </Comp>
  );
}

export default Button;
