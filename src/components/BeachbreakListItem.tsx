import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import sea from "../assets/sea.svg";
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from "@material-ui/core";
import "./BeachbreakListItem.css"
import Divider from '@material-ui/core/Divider';

export interface Props {
    beachbreak: Beachbreak;
    onDelete: (beachbreak: Beachbreak) => void;
}
const StyledFab = withStyles({
    root: {
        backgroundColor: 'white',
        marginLeft: '10px'
    },
    // colorInherit: {backgroundColor: 'white'}
})(Fab);

const StyledIcon = withStyles({
    root: {
        color: 'rgb(45, 155, 136)'
    }
})(ClearIcon);


export const BeachbreakListItem:
    FunctionComponent<Props> = ({ beachbreak, onDelete }) => {
        const deleteBeach = () => {
            onDelete(beachbreak);
        };

        return (
            <div className="container">
            <ListItem>

                <ListItemText>
                    {beachbreak.name}
                </ListItemText>

                <div style={{ width: '60px', height: "55px" }}>
                    <img alt="wave" src={sea}></img>
                    <p>{beachbreak.waveheightvalue}</p>
                </div>

                <StyledFab onClick={deleteBeach} size="small" color="secondary" aria-label="delete">
                    <StyledIcon></StyledIcon>
                </StyledFab>

            </ListItem>
            <Divider />
            </div>
        );
    };
