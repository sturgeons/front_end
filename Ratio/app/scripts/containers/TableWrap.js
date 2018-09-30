import {connect} from 'react-redux';
import Table from '../components/Table';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

const mapStateToProps = (state, ownProps) => ({
    datas: state.DataReducer.datas
});


const mapDispatchToProps = (dispatch) => ({
    onRefresh: (value) => { dispatch(changeValue("fresh")) },
    onEdit: (value) => { dispatch(changeValue("edit", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

const tableWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);

export default tableWrap;
