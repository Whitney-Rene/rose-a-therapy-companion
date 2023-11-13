//import components from respective files
import CreateRoseBudThorn from './CreateRoseBudThorn';
import ListLatestEntries from './ListLatestEntries';
import { Container } from '@mui/material';

export default function HomePage() {

  //homepage: display photo and renders CreateRoseBudThron.jsx & ListLatestEntries.jsx

  return (

    <Container>

      <CreateRoseBudThorn />

      <ListLatestEntries />

    </Container>
    
  );
};
