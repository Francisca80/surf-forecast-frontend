import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";
import { BeachbreakListItem } from "./BeachbreakListItem";


interface Props {
    beachbreaks: Beachbreak[];
    onDelete: (beachbreaks: Beachbreak) => void;
}

export const BeachbreakList: FunctionComponent<Props> = ({ beachbreaks, onDelete }) => {
    return (
        <ul>
            {beachbreaks.map(beachbreak => (
                <BeachbreakListItem key={beachbreak.id} beachbreak={beachbreak} onDelete={onDelete} />
            ))}
        </ul>
    );
};