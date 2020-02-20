import React, { FunctionComponent } from "react";

import ListSubheader from '@material-ui/core/ListSubheader';

import { Beachbreak } from "../models/beachbreak";
import { StyledList } from "../shared/StyledComponents";
import { BeachbreakListItem } from "./BeachbreakListItem";

import "./BeachbreakList.css"

interface Props {
    beachbreaks: Beachbreak[];
    onDelete: (beachbreaks: Beachbreak) => void;
    loading: boolean;
}

export const BeachbreakList: FunctionComponent<Props> = ({ beachbreaks, onDelete, loading }) => {

    return (
        <StyledList>
            {!loading && <div className="subheaderContainer">
                <ListSubheader>{"    "}</ListSubheader>
                <ListSubheader>Beach</ListSubheader>
                <ListSubheader>Swell period</ListSubheader>
                <ListSubheader>Wind speed</ListSubheader>
                <ListSubheader>Wind direction</ListSubheader>
                <ListSubheader>Wave height</ListSubheader>
                <ListSubheader></ListSubheader>
                <ListSubheader></ListSubheader>
            </div>}

            {!loading && <React.Fragment>
                {beachbreaks.map(beachbreak => (
                    <BeachbreakListItem key={beachbreak.id} beachbreak={beachbreak} onDelete={onDelete} />
                ))}
            </React.Fragment>}
        </StyledList>
    );
};
