import { Link } from 'react-router-dom';
function BreadCrumbs({ props, route }) {
  return (
    <div>
      {props.map((name, index) => {
        const routeTo = `${route[index]}`;
        const isLast = index === props.length - 1;
        return (
          <span key={index}>
            {index !== 0 && <span>&nbsp;{<span className="text-gray-600">{'>'}</span>}&nbsp;</span>}
            {isLast ? (
              <span className="font-semibold">{name}</span>
            ) : (
              <Link to={routeTo}>
                <span className="text-gray-600 hover:text-dark-flat dark:hover:text-dark-text transition-all">
                  {name}
                </span>
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default BreadCrumbs;
