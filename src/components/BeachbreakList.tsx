import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";
import { BeachbreakListItem } from "./BeachbreakListItem";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';

interface Props {
    beachbreaks: Beachbreak[];
    onDelete: (beachbreaks: Beachbreak) => void;
}

const StyledList = withStyles({
    root: {
        width: '100%',
        maxWidth: 550,
        backgroundColor: "white",
        margin: "0 auto",
        marginBottom: "30px",
        marginTop: "20px"
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
})(List);

export const BeachbreakList: FunctionComponent<Props> = ({ beachbreaks, onDelete }) => {

    return (

        <StyledList>
            <div style={{display: "flex", flexDirection: "row"}}>
                <ListSubheader>Beach</ListSubheader>
                <ListSubheader>Swell period</ListSubheader>
                <ListSubheader>Wave height</ListSubheader>
            </div>

            {beachbreaks.map(beachbreak => (
                <BeachbreakListItem key={beachbreak.id} beachbreak={beachbreak} onDelete={onDelete} />

            ))}
        </StyledList>
    );
};
