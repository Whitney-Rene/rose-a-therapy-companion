//useHistory is replaced by useNavigate "react-router-dom" v.6
import { useNavigate } from 'react-router-dom';

export default function CreateRoseBudThorn() {


 const navigateTo = useNavigate();
  const handleClick = (entry_type) => {
  navigateTo(`/create/form/${entry_type}`);
 }

  return (
    <>
    <div className="create" >

      <p>CreateRoseBudThorn Component</p>
      <button onClick={() => handleClick('rose')}>Rose</button>
      <button onClick={() => handleClick('bud')}>Bud</button>
      <button onClick={() => handleClick('thorn')}>Thorn</button>

    </div>
    </>

  );
};


