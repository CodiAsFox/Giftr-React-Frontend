import { useParams } from 'react-router-dom';
import { useGiftr } from '../../context/GiftrContext';
import ListItem from "../ListItem/ListItem";

const Gifts = () => {

  const { id } = useParams();
  console.log('person id: ' + id)

  return (
    <section className="gifts">
      <ul className="giftList">
        <ListItem/>
      </ul>
    </section>
  )
}

export default Gifts