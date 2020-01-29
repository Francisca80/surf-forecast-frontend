import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import sea from "../assets/sea.svg";

export interface Props {
    beachbreak: Beachbreak;
    onDelete: (beachbreak: Beachbreak) => void;
}

export const BeachbreakListItem: 
FunctionComponent<Props> = ({ beachbreak, onDelete }) => {
    const deleteBeach = () => {
        onDelete(beachbreak);
    };

    return (
        <ListItem>
            <ListItemText>
            {beachbreak.name}
            </ListItemText>
            <img src={sea}></img>
             <button onClick={deleteBeach}>X</button>
        </ListItem>
    );
};
