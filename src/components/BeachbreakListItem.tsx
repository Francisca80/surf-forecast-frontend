import React, { FunctionComponent, useState, useEffect } from "react";
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
        const [showItem, setShowItem] = useState(true);
        const [displayCam, setDisplayCam] = useState(false);

        const deleteBeach = () => {
            onDelete(beachbreak);
        };
        const styleListItem = showItem ? "" : "none";
        const styleWebCam = displayCam ? "" : "none";

        const showWebCam = () => {
            setDisplayCam(!displayCam);
        }

        const hideWebCam = () => {
            setDisplayCam(false);
            setShowItem(true);
        }

        return (
            <div className="container" style={{ display: styleListItem }}>
                <ListItem>

                    <ListItemText>
                        {beachbreak.name}
                    </ListItemText>

                    <ListItemText>
                        {beachbreak.swellperiodvalue}s
                </ListItemText>

                    <ListItemText>
                        {beachbreak.windspeedvalue}m/s
                </ListItemText>
                    {/*TODO: make an arrow out of the below value
                    write the logic outside of this return statement */}
                    <ListItemText>
                        {beachbreak.winddirectionvalue}°
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
                <button onClick={() => showWebCam()}>Show webcam</button>

                <div style={{ display: styleWebCam, width: "100px", height: "300px", backgroundColor: "red" }}><h1>CAMERA</h1></div>
            </div>
        );
    };
