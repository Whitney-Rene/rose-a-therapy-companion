import CreateRoseBudThorn from './CreateRoseBudThorn'
import ListLatestEntries from './ListLatestEntries'

export default function HomePage( {message} ) {

    //fetch async function to db where entries are

  return (
    <div>
      <p>HomePage Component</p>
      <img
        src="https://i.etsystatic.com/9472596/r/il/749ea1/3821016144/il_1588xN.3821016144_csuf.jpg" 
        alt='bouquet of flowers' 
        style={{ width: '200px', height: 'auto', marginTop: '10px'}}
      />

      {/* I am practicing passing props from parent to child*/}
      <p>{message}</p>

      {/* This comp will allow user to add r/b/th to db, 
      -and update ListLatestEntries component */}
      <CreateRoseBudThorn />

      {/* Can I list the last 5 entries?
      -I want to encourage user */}
      <ListLatestEntries />

    </div>
  )
}
