import {connect} from 'react-redux';
import StatusBar from '../components/StatusBar';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

const mapStateToProps = (state, ownProps) => ({
    lineparts: state.LinePartReducer.lineparts,
    loaders: state.LoaderReducer.loaders
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (value) => { dispatch(changeValue("fresh")) },
    onEdit: (value) => { dispatch(changeValue("edit", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect( mapStateToProps, mapDispatchToProps )(StatusBar);
