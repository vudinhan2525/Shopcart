import { Link } from 'react-router-dom';
import img from '../../assets/img/test/3828537.jpg';
function ErrorPage() {
  return (
    <div className="dark:text-dark-text dark:bg-dark-ground">
      <header className="flex  justify-center pt-5 text-3xl font-bold">Oops! Page not found!</header>
      <div className="mt-5 w-[500px] text-center mx-auto">
        We are very sorry for inconvenience. It looks like you're trying to access a page that was has been deleted or
        never even existed.
      </div>
      <div className="flex justify-center">
        <Link
          to={'/'}
          className="px-5 rounded-full cursor-pointer my-5 hover:bg-orange-700 transition-all py-3 text-white bg-orange-600"
        >
          Back to home
        </Link>
      </div>
      <div
        className="w-[800px] h-[500px] bg-no-repeat bg-center bg-cover rounded-3xl mx-auto"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
  );
}

export default ErrorPage;
