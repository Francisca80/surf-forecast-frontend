import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";

export interface Props {
    beachbreak: Beachbreak;
    onDelete: (beachbreak: Beachbreak) => void;
}

export const BeachbreakListItem: 
FunctionComponent<Props> = ({ beachbreak, onDelete }) => {
    const onClick = () => {
        onDelete(beachbreak);
    };

    return (
        <li>
            {beachbreak.name} <button onClick={onClick}>X</button>
        </li>
    );
};