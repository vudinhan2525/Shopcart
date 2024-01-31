import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SearchPage() {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);
  return <div>SearchPage</div>;
}

export default SearchPage;
