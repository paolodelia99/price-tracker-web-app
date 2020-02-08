import React, {Fragment, useState} from 'react';
//Material UI imports
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import {deleteItemModalStyle} from '../styles/deleteItemModalStyle';
import Divider from "@material-ui/core/Divider";
//Redux
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    deleteStock,
    deleteCrypto,
    deleteForex
} from "../../actions/profile";

const DeleteItemModal = (
    {
        profile:
            {
                stocksCollection,
                cryptoCollection,
                forexCollection,
            },
        deleteStock,
        deleteForex,
        deleteCrypto
    }) => {
    const classes = deleteItemModalStyle();
    const [openEditLab, setEditLab] = useState(false);

    const setOpenEditModal = () => {
        setEditLab(true)
    };

    const setCloseEditModal = () => {
        setEditLab(false)
    };

    const deleteSelectedStock = (id) => {
        deleteStock(id);
        setCloseEditModal();
    };

    const deleteSelectedForex = (id) => {
        deleteForex(id);
        setCloseEditModal();
    };

    const deleteSelectedCrypto = (id) => {
        deleteCrypto(id);
        setCloseEditModal();
    };

    const stockCollectionList = () => {
        return stocksCollection.map(stock => (
            <ListItem key={stock._id} button onClick={ e => deleteSelectedStock(stock._id)}>
                <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                <ListItemText primary={stock.stockName}/>
            </ListItem>
        ))
    };

    const forexCollectionList = () => {
        return forexCollection.map(forex => (
            <ListItem key={forex._id} button onClick={ e => deleteSelectedForex(forex._id)}>
                <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                <ListItemText primary={forex.forexName}/>
            </ListItem>
        ))
    };

    const cryptoCollectionList = () => {
        return cryptoCollection.map(crypto => (
            <ListItem key={crypto._id} button onClick={ e => deleteSelectedCrypto(crypto._id)}>
                <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                <ListItemText primary={crypto.cryptoName}/>
            </ListItem>
        ))
    }

    const deleteItemModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEditLab}
                onClose={setCloseEditModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEditLab}>
                    <div className={classes.paper}>
                        <List>
                            {stocksCollection ? stockCollectionList() : null}
                            <Divider/>
                            {forexCollection ? forexCollectionList() : null}
                            <Divider/>
                            {cryptoCollection ? cryptoCollectionList() : null}
                        </List>
                    </div>
                </Fade>
            </Modal>
        )
    };

    return (
        <Fragment>
            <ListItem button onClick={setOpenEditModal} className={classes.sideBarItem}>
                <ListItemIcon >
                    <Icon>create</Icon>
                </ListItemIcon>
                <ListItemText primary="Delete Item"/>
            </ListItem>
            {deleteItemModal()}
        </Fragment>
    );
};

DeleteItemModal.propTypes = {
    profile: PropTypes.object.isRequired,
    deleteStock: PropTypes.func.isRequired,
    deleteForex: PropTypes.func.isRequired,
    deleteCrypto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    {
        deleteStock,
        deleteForex,
        deleteCrypto
    }
)(DeleteItemModal);
