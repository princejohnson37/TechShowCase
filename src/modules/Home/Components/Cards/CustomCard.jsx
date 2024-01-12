import 'primeicons/primeicons.css';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

import './CustomCard.css';

const CustomCard = ({ project, onOpenClick }) => {
  console.log('project', project);
  return (
    <div className='custom-card-container'>
      <div className='custom-card-header' >
        <h3>{project?.name}</h3>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <div>
          <Button label="open" onClick={onOpenClick} />
        </div>
        <div>
        <span className="pi pi-users"></span>
        </div>
      </div>
    </div>
  );
};

CustomCard.propTypes = {
    project: PropTypes.string.isRequired,
    onOpenClick: PropTypes.func.isRequired
};

export default CustomCard;
