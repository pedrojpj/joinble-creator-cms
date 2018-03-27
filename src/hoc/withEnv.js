import { withProps } from 'recompose';
import environment from '../environment';

export default withProps({ relay: { environment: environment } });
