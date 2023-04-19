import { useParams } from 'react-router-dom';
import AddGift from "../AddGift/AddGift";

const Gift = () => {
  const { id } = useParams(); // pass this down through params
  return (
    <section className="gift">
      <AddGift personId={id}/>
    </section>
  )
}

export default Gift